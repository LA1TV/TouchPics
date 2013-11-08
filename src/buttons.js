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