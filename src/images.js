images = function(e){
    hammer_config = {prevent_mouseevents: false, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true};
    
    Hammer.plugins.showTouches();
    Hammer.plugins.fakeMultitouch();
    
    touchable = document.getElementById('test_item');
    img = new TouchImage(touchable, touchable.firstElementChild,        document.getElementById("test_button"), "", 0, 0, 1);
};

TouchImage = function(el, img, button, src, x, y, scale){
    this.el = el;
    this.img = img;
    this.button = button;
    this.src = src;
    this.transform = {a:1, b:0, c:0, d:1, e:0, f:0};
    this.transform_matrix = "matrix("+this.transform.a+","+this.transform.b+","+this.transform.c+","+this.transform.d+","+this.transform.e+","+this.transform.f+")";
    this.pos = {
        x: x,
        startX: x,
        y: y,
        startY: y,
        scale: scale,
        startScale: scale,
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
    this.transform.a = this.pos.scale;
    this.transform.d = this.pos.scale;
    this.transform.e = this.pos.x;
    this.transform.f = this.pos.y;
    this.transform_matrix = "matrix("+this.transform.a+","+this.transform.b+","+this.transform.c+","+this.transform.d+","+this.transform.e+","+this.transform.f+")";
    this.el.style.webkitTransform = this.transform_matrix;
    console.log(this.matrix_transform);
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
    };
};

TouchImage.prototype.transformCallback = function(){
    var that = this;
    return function(event){
        console.log(event);
        that.pos.x = that.pos.startX + event.gesture.deltaX;
        that.pos.y = that.pos.startY + event.gesture.deltaY;
        that.pos.scale = that.pos.startScale * event.gesture.scale;
        that.updateTransform();        
    };
};

window.onload = images;