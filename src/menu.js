Menu = function(width, height, bottom, manager){
    this.width = width;
    this.height = height;
    this.bottom = bottom;
    this.manager = manager;
    this.buttons = {};
    
    this.manager.setMenuInfo(this.height + this.bottom)
    
    this.div = document.createElement('div');
    this.div.className = 'menu';
    this.div.style.width = width;
    this.div.style.height = height;
    
    this.container = document.createElement('div');
    this.container.className = 'menu_container';
    this.container.style.width = '100%';
    this.container.style.bottom = this.bottom;
    this.container.appendChild(this.div);
    
    this.buttons_div = document.createElement('div');
    this.buttons_div.className = 'menu_button_container';
    this.buttons_div.style.left = 0;
    this.pos = 0;
    this.velocity = 0;
    this.updateInterval = 20;
    this.div.appendChild(this.buttons_div);
    
    this.hammertime = Hammer(this.buttons_div, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.containerDragStart());
    this.hammer.drag = this.hammertime.on('drag', this.containerDrag());
    this.hammer.swipe = this.hammertime.on('swipe', this.containerSwipe());
    
    manager.imageRoot.appendChild(this.container);
};

//TODO Sexy menu

Menu.prototype.createButton = function(src){
    var button = new ImageMenuButton(src, {width:100, height:50}, this, this.manager)
    this.buttons[src] = button;
};

Menu.prototype.addButtonDiv = function(div){
    this.buttons_div.appendChild(div);
};

Menu.prototype.updateContainerWidth = function(){
    var that = this;
    return function(e){
        that.containerWidth = 0;
        for(var button in that.buttons){
            that.containerWidth += that.buttons[button].div.clientWidth + 2 * 10;
        };
        
        that.buttons_div.style.width = that.containerWidth;;
        //TODO Check if repositioning is needed
    };
};

Menu.prototype.containerDragStart = function(){
    var that = this;
    return function(event){
        that.startPos = that.pos;
        that.startX = event.gesture.center.pageX;
    };
};

Menu.prototype.containerDrag = function(){
    var that = this;   
    return function(event){
        that.pos = that.startPos + event.gesture.center.pageX - that.startX;
        var maxPos = 0 //TODO Fix this for containerWidth < width
        var minPos = that.width - that.containerWidth;
        that.pos = Math.min(that.pos, maxPos);
        that.pos = Math.max(that.pos, minPos);
        if(that.pos == maxPos || that.pos == minPos){
            that.containerDragStart()(event);   
        }
        that.buttons_div.style.left = that.pos;
    };
};

Menu.prototype.containerSwipe = function(){
    var that = this;
    return function(event){
        var modifier = 0
        //lolswitch
        if(event.gesture.direction == "right"){
            modifier = 1;
        } else if(event.gesture.direction == "left"){
            modifier = -1
        };
        if(modifier == 0){
            return;
        }
        that.setContainerScrollVelocity(modifier * event.gesture.velocityX);
    };
};

Menu.prototype.setContainerScrollVelocity = function(v){
    this.velocity = v;   
    setTimeout(this.update(), this.updateInterval);
};

Menu.prototype.update = function(){
    var that = this;
    return function(e){
        //TODO Limit this
        //TODO Sproinging at limits
        that.pos += that.velocity * 1000 * that.updateInterval/1000;
        that.buttons_div.style.left = that.pos;
        that.velocity *= Math.pow(0.998, that.updateInterval);
        if(Math.abs(that.velocity) < 0.05){
            that.velocity = 0;   
        }
        if(Math.abs(that.velocity) > 0){
            setTimeout(that.update(), that.updateInterval)   
        }
    };
};