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

AnimTouchButton = function(src1, src2, right, top, func){
    //TODO Allow animation to be defined
    this.src1 = src1;
    this.src2 = src2;
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
}

AnimTouchButton.prototype = new TouchButton();
AnimTouchButton.prototype.constructor = AnimTouchButton;