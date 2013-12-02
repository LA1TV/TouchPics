Math.hypot = function(x, y){
    return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));  
};

TouchImage = function(el, img, x, y, scale, manager){
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
        ang: 0,
        startAng: 0,
        lock: false
    };  
    
    //Set up all the Hammer stuff and register against hammer events
    this.hammertime = Hammer(this.el, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.dragStart());
    this.hammer.drag = this.hammertime.on('drag', this.drag());
    this.hammer.transformstart = this.hammertime.on('transformstart', this.transformStart());
    this.hammer.transform = this.hammertime.on('transform', this.transformCallback());
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
    };
};

TouchImage.prototype.updateTransform = function(){
    //This math.max may be redundant due to scale being set with respect to the 
    //limit in the transformCallback
    //This scales the image by settins its width, making sure its not scaled lower 
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
        console.log("DragSTart", event.gesture.center);
        if(that.pos.lock){
            return false;
        }
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
    };
};

TouchImage.prototype.drag = function(){
    var that = this;
    return function(event){
        console.log("Drag", event);
        if(that.pos.lock){
            return false;
        }
        that.pos.x = that.pos.startX + event.gesture.deltaX;
        that.pos.y = that.pos.startY + event.gesture.deltaY;
        that.updateTransform();
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
        if(that.pos.lock){
            return false;
        }
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
        that.pos.startScale = that.pos.scale;
        that.pos.startAng = that.pos.ang;
        var dx = that.pos.x - event.gesture.center.pageX;
        var dy = event.gesture.center.pageY - that.pos.y;
        that.pos.startRadius = Math.hypot(dy, dx);
        that.pos.startRadiusAng = Math.atan2(dy, dx) + that.pos.ang;
        that.updateTransform();
    };
};

TouchImage.prototype.transformCallback = function(){
    var that = this;
    return function(event){
        console.log("Transform", event.gesture.center);
        if(that.pos.lock){
            return false;
        }
        that.pos.scale = Math.max(that.pos.startScale * event.gesture.scale, that.pos.scaleLimit);
        that.pos.x = event.gesture.center.pageX + that.pos.scale * that.pos.startRadius * Math.cos(that.pos.startRadiusAng - that.pos.ang);
        that.pos.y = event.gesture.center.pageY - that.pos.scale * that.pos.startRadius * Math.sin(that.pos.startRadiusAng - that.pos.ang);
        that.pos.ang = that.pos.startAng + Math.PI * event.gesture.rotation/180;
        that.updateTransform();        
    };
};

TouchImage.prototype.toggleLock = function(){
    var that = this;
    return function(event){
        that.pos.lock = !that.pos.lock;
    }
};