Math.hypot = function(x, y){
    return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));  
};

images = function(e){
    hammer_config = {prevent_mouseevents: false, 
                     transform_always_block: true, 
                     drag_block_horizontal: true, 
                     drag_block_vertical:true
                    };
    
    Hammer.plugins.showTouches();
    Hammer.plugins.fakeMultitouch();
    
    touchable = document.getElementById('test_item');
    img = new TouchImage(touchable, 
                         touchable.firstElementChild, 
                         document.getElementById("test_button"), 
                         "", 
                         0, 
                         0, 
                         1
                        );
};

TouchImage = function(el, img, button, src, x, y, scale){
    this.el = el;
    this.img = img;
    this.button = button;
    this.src = src;
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
    this.pos = {
        x: x,
        startX: x,
        y: y,
        startY: y,
        scale: scale,
        startScale: scale,
        scaleLimit: Math.max(200 / this.img.naturalWidth, 100 / this.img.naturalHeight),
        ang: 0,
        startAng: 0
    };  
    this.hammertime = Hammer(this.img, hammer_config);
    this.button_hammertime = Hammer(this.button, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.dragStart());
    this.hammer.drag = this.hammertime.on('drag', this.drag());
    this.hammer.buttonTap = this.button_hammertime.on('tap', this.tapButton());
    this.hammer.transformstart = this.hammertime.on('transformstart', this.transformStart());
    this.hammer.transform = this.hammertime.on('transform', this.transformCallback());
};

TouchImage.prototype.updateTransform = function(){
    this.img.width = Math.max(this.pos.scaleLimit, this.pos.scale) * this.img.naturalWidth;
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
    console.log(this.transform_matrix);
};

TouchImage.prototype.dragStart = function(){
    var that = this;
    return function(event){
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
    };
};

TouchImage.prototype.drag = function(){
    var that = this;
    return function(event){
        console.log(event);
        that.pos.x = that.pos.startX + event.gesture.deltaX;
        that.pos.y = that.pos.startY + event.gesture.deltaY;
        that.updateTransform();
    };
};

TouchImage.prototype.tapButton = function(){
    return function(event){
        alert('This is about as redundant as a chocolate teapot'); 
    };
};

TouchImage.prototype.transformStart = function(){
    var that = this;
    return function(event){
        console.log(event);
        that.pos.startX = that.pos.x;
        that.pos.startY = that.pos.y;
        that.pos.startScale = that.pos.scale;
        that.pos.startAng = that.pos.ang;
        var dx = that.pos.x - event.gesture.center.pageX;
        var dy = event.gesture.center.pageY - that.pos.y;
        console.log(dx, dy);
        console.log(event.gesture.center);
        that.pos.startRadius = Math.hypot(dy, dx);
        that.pos.startRadiusAng = Math.atan2(dy, dx);
        console.log(that.pos);
    };
};

TouchImage.prototype.transformCallback = function(){
    var that = this;
    return function(event){
        console.log(event);
        that.pos.x = event.gesture.center.pageX + Math.max(that.pos.scaleLimit, event.gesture.scale) * that.pos.startRadius * Math.cos(that.pos.startRadiusAng);
        that.pos.y = event.gesture.center.pageY - Math.max(that.pos.scaleLimit, event.gesture.scale) * that.pos.startRadius * Math.sin(that.pos.startRadiusAng);
        that.pos.scale = that.pos.startScale * Math.max(that.pos.scaleLimit, event.gesture.scale);
        that.pos.ang = that.pos.startAng + Math.PI * event.gesture.rotation/180;
        that.updateTransform();        
    };
};

window.onload = images;