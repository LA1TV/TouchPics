DrawingMenu = function(width, height, manager){
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
};