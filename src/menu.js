Menu = function(width, height, bottom){
    this.width = width;
    this.height = height;
    this.bottom = bottom;
    this.buttons = {};
    
    this.div = document.createElement('div');
    this.div.className = 'imagemenu';
    this.div.style.width = width;
    this.div.style.height = height;
    this.div.style.bottom = bottom;
    document.body.appendChild(this.div);
};

Menu.prototype.createButton = function(src){
    
};
