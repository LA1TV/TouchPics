Menu = function(width, height, bottom, manager){
    this.width = width;
    this.height = height;
    this.bottom = bottom;
    this.manager = manager;
    this.buttons = {};
    
    this.div = document.createElement('div');
    this.div.className = 'imagemenu';
    this.div.style.width = width;
    this.div.style.height = height;
    
    this.container = document.createElement('div');
    this.container.className = 'imagemenucontainer';
    this.container.style.width = '100%';
    this.container.style.bottom = this.bottom;
    this.container.appendChild(this.div);
    
    document.body.appendChild(this.container);
};

Menu.prototype.createButton = function(src){
    var button = new ImageMenuButton(src, {width:100, height:50}, this, this.manager)
    this.buttons[src] = button;
};

Menu.prototype.addButtonDiv = function(div){
    this.div.appendChild(div);
};
