ImageMenuButton = function(src, dim, menu, manager){
    this.src = src;
    this.dim = dim;
    this.menu = menu;
    this.manager = manager;
    
    this.div = document.createElement('div');
    this.div.className = 'menu_button';
    this.img = document.createElement('img');
    this.img.src = this.src;
    this.img.className = 'menu_button';
    this.div.appendChild(this.img);
    
    this.helper = document.createElement('div');
    this.helper.className = 'helper';
    this.div.appendChild(this.helper);
    
    this.img.onload = this.menu.addButtonDiv(this.div);
    this.hammertime = Hammer(this.div, hammer_config);
    this.hammertime.on('tap', this.onTap());
};

//TODO Sexy buttons

ImageMenuButton.prototype.onTap = function(){
    var that = this;
    return function(event){
        //TODO x, y, scale not hard coded
        //TODO Don't let newly created images be bigger than the screen res
        that.manager.newImage(that.img.cloneNode(), 50, 50, 1.0);
    };
};

ImageMenuButton.prototype.loaded = function(){
    var that = this;
    return function(e){
        that.div.appendChild(that.img);  
    };
};