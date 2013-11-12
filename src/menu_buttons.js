ImageMenuButton = function(src, dim, menu, manager){
    this.src = src;
    this.dim = dim;
    this.manager = manager;
    
    this.div = document.createElement
};

ImageMenuButton.prototype.onTap = function(){
    var that = this;
    return function(event){
        //TODO x, y, scale not hard coded
        that.manager.newImage(that.src, 50, 50, 1.0);
    };
};