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
    this.div.appendChild(this.buttons_div);
    
    this.hammertime = Hammer(this.buttons_div, hammer_config);
    this.hammer = {};
    this.hammer.dragstart = this.hammertime.on('dragstart', this.containerDragStart());
    this.hammer.drag = this.hammertime.on('drag', this.containerDrag());
    
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
        var width = 0;
        for(var button in that.buttons){
            width += that.buttons[button].div.clientWidth + 2 * 10;
        };
        
        that.buttons_div.style.width = width;
        return width;
    };
};

Menu.prototype.containerDragStart = function(){
    var that = this;
    return function(event){
        console.log(event);
        that.startPos = that.pos;
        that.startX = event.gesture.center.pageX;
    };
};

Menu.prototype.containerDrag = function(){
    var that = this;   
    return function(event){
        that.pos = that.startPos + event.gesture.center.pageX - that.startX;
        that.buttons_div.style.left = that.pos;
    };
};