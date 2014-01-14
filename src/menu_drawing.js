DrawingMenu = function(width, height, manager){
    this.width = width;
    this.height = height;
    
    this.div = document.createElement('div');
    this.div.className = "drawing_menu";
    this.div.style['height'] = height;
    this.div.style['width'] = width;
    
    this.drawing_menu_swipe_area = document.createElement('div');
    this.drawing_menu_swipe_area.className = "drawing_menu_swipe_area";
    this.drawing_menu_swipe_area.style['height'] = height + 50;
    this.drawing_menu_swipe_area.style['width'] = width + 25;
    this.drawing_menu_swipe_area.appendChild(this.div);
    
    document.body.appendChild(this.drawing_menu_swipe_area);
    
    this.hammertime = Hammer(this.div, hammer_config);
    this.swipe_hammertime = Hammer(this.drawing_menu_swipe_area, hammer_config);
    this.hammer = {};
    this.hammer.close = this.swipe_hammertime.on('swipeleft', this.hideMenu());
    this.hammer.open = this.swipe_hammertime.on('swiperight', this.showMenu());
};

DrawingMenu.prototype.hideMenu = function(){
    var that = this;
    return function(){
        that.div.style['left'] = -that.width; 
    };
};

DrawingMenu.prototype.showMenu = function(){
    var that = this;
    return function(){
        that.div.style['left'] = 0;  
    };
};