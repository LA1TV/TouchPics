Math.hypot = function(x, y){
    return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));  
};

TouchImage = function(el, img, x, y, scale, ang, manager){
    this.manager = manager;
    
    this.el = el;
    
    this.img = img;
    this.img.className = 'touchable';
    this.el.appendChild(this.img);
    
    this.close_button = new TouchButton("assets/close.svg", 60, -20, this.tapButton());
    this.el.appendChild(this.close_button.div);
    
    this.lock_button = new AnimTouchButton("assets/lock_base.svg", "assets/lock_hook.svg",
                                          ['top', 0, 7, 'top 0.5s cubic-bezier(0.175, 0.885, 0.7, 1.775)'], 120, -20, this.toggleLock())
    //cubic-bezier(0.175, 0.885, 0.32, 1.275)
    this.el.appendChild(this.lock_button.div);
    
    //TODO Local draw coords
    this.draw_points = [];
    this.canvas = document.createElement('canvas');
    //TODO Use div instead of el maybe?
    this.el.appendChild(this.canvas);
    this.lastDrawnTo = 0;
    
    //Set up the transform based on initial values
    this.transform = {a:1, 
                      b:0, 
                      c:0, 
                      d:1, 
                      e:0, 
                      f:0
                     };
    
    this.transform_matrix = "matrix("+
        this.transform.a+","+
        this.transform.b+","+
        this.transform.c+","+
        this.transform.d+","+
        this.transform.e+","+
        this.transform.f+")";
    
    //We need img.nautralWidth and img.naturalHeight to set the scaleLimit correctly
    //these values are 0 until the image is loaded so wait until its loaded
    this.img.onload = this.setScaleLimit();
    this.pos = {
        x: x,
        startX: x,
        y: y,
        startY: y,
        scale: scale,
        startScale: scale,
        ang: ang,
        startAng: ang,
        lock: false
    };  
    
    //Set up all the Hammer stuff and register against hammer events
    this.hammertime = Hammer(this.el, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.dragStart());
    this.hammer.drag = this.hammertime.on('drag', this.drag());
    this.hammer.dragend = this.hammertime.on('dragend', this.dragEnd());
    this.hammer.transformstart = this.hammertime.on('transformstart', this.transformStart());
    this.hammer.transform = this.hammertime.on('transform', this.transformCallback());
    this.hammer.tap = this.hammertime.on('tap', this.tap());
};

TouchImage.prototype.setScaleLimit = function(){
    var that = this;
    return function(e){
        /*Set a scale limit such that the width of the touch image cannot go below 200px
        //and the height cannot go below 100px, then choose the upper limit so both
        //inequalities hold
        */
        that.pos.scaleLimit = Math.max(200 / that.img.naturalWidth, 100 / that.img.naturalHeight);
        that.updateTransform();
        that.canvas.width = that.img.width;
        that.canvas.height = that.img.height;
        that.canvas.style.marginTop = -that.img.height;
    };
};

TouchImage.prototype.setZBase = function(z){
    this.z = z;  
    this.el.style.zIndex = z;
    this.img.style.zIndex = z + 1;
    this.canvas.style.zIndex = z+2;
    this.close_button.setZ(z+3);
    this.lock_button.setZ(z+3);
};

TouchImage.prototype.twiddleZ = function(){
    var that = this;
    return function(e){
        console.log(e);
        that.setZBase(that.z+1);
        setTimeout(function(){that.setZBase(that.z-1)}, 20);
    }
}

TouchImage.prototype.updateTransform = function(){
    //This scales the image by setting its width, making sure its not scaled lower 
    //than the scale limit
    this.img.width = this.pos.scale * this.img.naturalWidth;

    //We then populate the string with the matrix values and set it
    this.transform.a = Math.cos(this.pos.ang);
    this.transform.b = Math.sin(this.pos.ang);
    this.transform.c = -1 * Math.sin(this.pos.ang);
    this.transform.d = Math.cos(this.pos.ang);
    this.transform.e = this.pos.x;
    this.transform.f = this.pos.y;
    this.transform_matrix = "matrix("+
        this.transform.a+","+
        this.transform.b+","+
        this.transform.c+","+
        this.transform.d+","+
        this.transform.e+","+
        this.transform.f+")";
    this.el.style.webkitTransform = this.transform_matrix;
};

TouchImage.prototype.dragStart = function(){
    var that = this;
    return function(event){
        console.log("DragSTart", event.gesture);
        if(that.pos.lock){
            return false;
        }
        if(that.manager.drawing){
            var locals = that.globalToLocal(event.gesture.center.pageX, event.gesture.center.pageY);
            that.draw_points.push([locals[0], locals[1], 'start']);
            return false;
        }
        that.manager.bringToTop(that);
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
        that.pos.dx = event.gesture.center.pageX - that.pos.x;
        that.pos.dy = event.gesture.center.pageY - that.pos.y;
    };
};

TouchImage.prototype.drag = function(){
    var that = this;
    return function(event){
        //console.log("Drag", event);
        if(that.pos.lock){
            return false;
        }
        if(that.manager.drawing){
            var locals = that.globalToLocal(event.gesture.center.pageX, event.gesture.center.pageY);
            that.draw_points.push([locals[0], locals[1], '']);
            window.requestAnimationFrame(that.drawCanvasCallback());
            return false;
        }
        that.pos.x = event.gesture.center.pageX - that.pos.dx;
        that.pos.y = event.gesture.center.pageY - that.pos.dy;
        that.updateTransform();
    };
};

TouchImage.prototype.dragEnd = function(){
    var that = this;
    return function(event){
        if(that.manager.drawing){
            var locals = that.globalToLocal(event.gesture.center.pageX, event.gesture.center.pageY);
            that.draw_points.push([locals[0], locals[1], 'end']);
            window.requestAnimationFrame(that.drawCanvasCallback());
            return false;
        }
    };
};

TouchImage.prototype.tapButton = function(){
    var that = this;
    return function(event){
        that.manager.removeImage(that);
    };
};

TouchImage.prototype.transformStart = function(){
    var that = this;
    return function(event){
        console.log("TransformStart", event);
        if(that.pos.lock || that.manager.drawing){
            return false;
        }
        that.manager.bringToTop(that);
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
        that.pos.startScale = that.pos.scale;
        that.pos.startAng = that.pos.ang;
        var dx = that.pos.x - event.gesture.center.pageX;
        var dy = event.gesture.center.pageY - that.pos.y;
        that.pos.startRadius = Math.hypot(dy, dx) / that.pos.startScale;
        that.pos.startRadiusAng = Math.atan2(dy, dx) + that.pos.ang;
        that.updateTransform();
        console.log(that.pos);
    };
};

TouchImage.prototype.transformCallback = function(){
    var that = this;
    return function(event){
        //console.log("Transform", event.gesture);
        if(that.pos.lock || that.manager.drawing){
            return false;
        }
        that.pos.scale = Math.max(that.pos.startScale * event.gesture.scale, that.pos.scaleLimit);
        that.pos.x = event.gesture.center.pageX + that.pos.scale * that.pos.startRadius * Math.cos(that.pos.startRadiusAng - that.pos.ang);
        that.pos.y = event.gesture.center.pageY - that.pos.scale * that.pos.startRadius * Math.sin(that.pos.startRadiusAng - that.pos.ang);
        that.pos.ang = that.pos.startAng + Math.PI * event.gesture.rotation/180;
        that.updateTransform();        
    };
};

TouchImage.prototype.tap = function(){
    var that = this;
    return function(e){
        if(e.srcElement == that.img){
            that.manager.bringToTop(that);
        }
    };
};

TouchImage.prototype.toggleLock = function(){
    var that = this;
    return function(event){
        that.pos.lock = !that.pos.lock;
    }
};

TouchImage.prototype.globalToLocal = function(gx, gy){
    var x = gx - this.pos.x;
    //Make it be negative if a point is below our 'origin'
    var y = this.pos.y - gy;
    var a = Math.atan2(y, x) + this.pos.ang;
    var r = Math.hypot(x, y);
    return [r*Math.cos(a), r*Math.sin(a)];
}

TouchImage.prototype.drawCanvas = function(){
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'rgb(50,50,200)';
    var coord = this.draw_points[0];
    this.ctx.moveTo(coord[0], -coord[1])
    for(var i = 1; i < this.draw_points.length; i++){
        var coord = this.draw_points[i];
        if(coord[2] == 'start'){
            this.ctx.moveTo(coord[0], -coord[1]) 
        } else {
            this.ctx.lineTo(coord[0], -coord[1])
        }
    }
    this.ctx.stroke();
}

TouchImage.prototype.drawCanvasFrom = function(from){
    if(from >= this.draw_points.length){
        return;   
    }
    this.ctx = this.canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'rgb(50,50,200)';
    var coord = this.draw_points[from];
    this.ctx.moveTo(coord[0], -coord[1])
    for(var i = from + 1; i < this.draw_points.length; i++){
        var coord = this.draw_points[i];
        if(coord[2] == 'start'){
            this.ctx.moveTo(coord[0], -coord[1]) 
        } else {
            this.ctx.lineTo(coord[0], -coord[1])
        }
    }
    this.ctx.stroke();
    this.lastDrawnTo = i - 1;
    return i - 1;
}

TouchImage.prototype.drawCanvasCallback = function(){
    var that = this;
    return function(){
        console.log("Canvas Callback", that.lastDrawnTo, that.draw_points.length);
        that.drawCanvasFrom(that.lastDrawnTo);   
    }
};