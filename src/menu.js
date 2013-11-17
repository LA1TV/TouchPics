Menu = function(width, height, bottom, manager){
    this.width = width;
    this.height = height;
    this.bottom = bottom;
    this.manager = manager;
    this.buttons = {};
    
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
    this.div.appendChild(this.buttons_div);
    
    document.body.appendChild(this.container);
};

Menu.prototype.createButton = function(src){
    var button = new ImageMenuButton(src, {width:100, height:50}, this, this.manager)
    this.buttons[src] = button;
};

Menu.prototype.addButtonDiv = function(div){
    this.buttons_div.appendChild(div);
};
