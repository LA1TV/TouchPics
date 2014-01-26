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
    this.container.style.marginBottom = this.bottom;
    this.container.style.marginTop = 0;
    this.container.appendChild(this.div);
    
    this.buttons_div = document.createElement('div');
    this.buttons_div.className = 'menu_button_container';
    this.buttons_div.style.left = 0;
    this.pos = 0;
    this.velocity = 0;
    this.updateInterval = 20;
    this.div.appendChild(this.buttons_div);
    
    this.menu_swipe_area = document.createElement('div');
    this.menu_swipe_area.className = 'menu_swipe_area';
    this.menu_swipe_area.appendChild(this.container);
    
    this.hammertime = Hammer(this.buttons_div, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.containerDragStart());
    this.hammer.drag = this.hammertime.on('drag', this.containerDrag());
    this.hammer.dragEnd = this.hammertime.on('dragend', this.containerDragEnd());
    this.hammer.swipe = this.hammertime.on('swipe', this.containerSwipe());
    
    this.swipe_hammertime = Hammer(this.menu_swipe_area, hammer_config);
    this.hammer.close = this.swipe_hammertime.on('swipedown', this.hideMenu());
    this.hammer.open = this.swipe_hammertime.on('swipeup', this.showMenu());
    
    manager.imageRoot.appendChild(this.menu_swipe_area);
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
        //TODO Check if repositioning is needed (Not sure what I meant here, I was possibly thinking of the situation if images are removed from the menu)
    };
};

Menu.prototype.containerDragStart = function(){
    var that = this;
    return function(event){
        that.buttons_div.style.webkitTransition = "";
        that.startPos = that.pos;
        that.startX = event.gesture.center.pageX;
    };
};

Menu.prototype.containerDrag = function(){
    var that = this;   
    return function(event){
        if(that.manager.drawing){
            return false;   
        }
        that.pos = that.startPos + event.gesture.center.pageX - that.startX;
//        var maxPos = 0 //FIXME Fix this for containerWidth < width
//        var minPos = that.width - that.containerWidth;
//        that.pos = Math.min(that.pos, maxPos);
//        that.pos = Math.max(that.pos, minPos);
//        if(that.pos == maxPos || that.pos == minPos){
//            that.containerDragStart()(event);   
//        }
        that.buttons_div.style.left = that.pos;
    };
};

Menu.prototype.containerDragEnd = function(){
    var that = this;
    return function(event){
        if(that.velocity == 0){
            that.setContainerScrollVelocity(0);
        };
    };
};

Menu.prototype.containerSwipe = function(){
    var that = this;
    return function(event){
        if(that.manager.drawing){
            return false;   
        }
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

Menu.prototype.upperBound = function(){
    return 0; //FIXME Fix this for containerWidth < width
};  

Menu.prototype.lowerBound = function(){
    return this.width - this.containerWidth;    
};

Menu.prototype.checkBounds = function(){
    var maxPos = this.upperBound();
    var minPos = this.lowerBound();
    //TRUE means inside the bounds
    return this.pos < maxPos && this.pos > minPos;
};

Menu.prototype.setContainerScrollVelocity = function(v){
    this.velocity = v;   
    this.buttons_div.style.webkitTransition = "";
    setTimeout(this.update(), this.updateInterval);
};

Menu.prototype.update = function(){
    var that = this;
    return function(e){
        //FIXME Limit this
        //TODO Better sprining and physics on the sliding
        if(that.velocity != 0){
            that.pos += that.velocity * 1000 * that.updateInterval/1000;
            that.buttons_div.style.left = that.pos;
            if(that.checkBounds()){
                that.velocity *= Math.pow(0.998, that.updateInterval);
            }else{
                that.velocity *= Math.pow(0.99, that.updateInterval); 
            }
            if(Math.abs(that.velocity) < 0.05){
                that.velocity = 0;   
            }
        }
        if(that.velocity != 0){
            setTimeout(that.update(), that.updateInterval)   
        }
        if(that.velocity == 0 && !that.checkBounds()){
            that.buttons_div.style.webkitTransition = "left 1s";
            if(that.pos < that.lowerBound()){
                that.buttons_div.style.left = that.lowerBound();
                that.pos = that.lowerBound();
            }else{
                that.buttons_div.style.left = that.upperBound();   
                that.pos = that.upperBound();
            }
        }
    };
};

Menu.prototype.hideMenu = function(){
    var that = this;
    return function(event){
        that.bottom = -200
        that.container.style.marginBottom = that.bottom;
        that.container.style.marginTop = 50 + 200;
    };
};

Menu.prototype.showMenu = function(){
    var that = this;
    return function(event){
        that.bottom = 50;
        that.container.style.marginBottom = that.bottom;
        that.container.style.marginTop = 0;
    };
};