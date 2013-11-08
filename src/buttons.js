TouchButton = function(src, right, top, func){
    this.src = src;
    this.right = right;
    this.top = top;
    this.func = func;
    
    this.div = document.createElement('div');
    this.div.className = "button";
    this.div.style.top = this.top;
    this.div.style.right = this.right;
    
    this.img = document.createElement('img');
    this.img.className = "button";
    this.img.src = this.src;
    
    this.div.appendChild(this.img);
    
    this.hammer = Hammer(this.div, hammer_config);
    this.hammer.on('tap', this.callFunc());
};

TouchButton.prototype.callFunc = function(){
    var that = this;
    return function(event){
        that.func(event);
    };
};

AnimTouchButton = function(src1, src2, anim, right, top, func){
    /*
    anim is an array with:
    0: Style property to be animated
    e.g 'top' would be this.div.style.top or top for img2
    1: Initial value
    2: Animated value
    3: The CSS for -webkit-transition
    e.g Following the example top 2s
    */
    
    this.src1 = src1;
    this.src2 = src2;
    this.anim = anim;
    this.right = right;
    this.top = top;
    this.func = func;
    
    this.div = document.createElement('div');
    this.div.className = "button";
    this.div.style.top = this.top;
    this.div.style.right = this.right;
    
    this.img1 = document.createElement('img');
    this.img1.className = "button";
    this.img1.src = this.src1;
    
    this.img2 = document.createElement('img');
    this.img2.className = "button over";
    this.img2.src = this.src2;
    
    this.div.appendChild(this.img1);
    this.div.appendChild(this.img2);
    
    this.hammer = Hammer(this.div, hammer_config);
    this.hammer.on('tap', this.callFunc());
    
    this.img2.style[this.anim[0]] = this.anim[1];
    this.img2.style.webkitTransition = this.anim[3];
    //TODO more than simple toggling
    this.state = false;
}

AnimTouchButton.prototype.callFunc = function(){
    var that = this;
    return function(event){
        that.func(event);
        that.state = !that.state;
        that.img2.style[that.anim[0]] = that.anim[1+that.state];
    };
};