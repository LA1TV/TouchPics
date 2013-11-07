images = function(){
    hammer_config = {prevent_mouseevents: true, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true};
    
    touchable = document.getElementById('test_item');
    touchable.hammer = Hammer('drag', hammer_config);
};

TouchImage = function(el, src, x, y, scale){
    this.el = el;
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
};

TouchImage.prototype.updateTransform = function(){
    var that = this;
    return function(){
        that.transform.e = that.pos.x;
        that.transform.f = that.pos.y;
        this.transform_matrix = "matrix("+a+","+b+","+c+","+d+","+e+","+f+")";
        that.el.style.webkitTransform = that.transform_matrix;
    }
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
        that.pos.x = that.pos.startX + event.gesture.deltaX;
        that.pos.y = that.pos.startY + event.gesture.deltaY;
        that.updateTransform();
    };
};

window.onload = images;