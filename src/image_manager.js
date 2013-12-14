//TODO z-indexing

TouchImageManager = function(root){
    this.images = [];
    this.imageRoot = root;
};

TouchImageManager.prototype.newImage = function(img, x, y, scale){
    var div = document.createElement('div');
    div.className = 'touchable';
    this.imageRoot.appendChild(div);
    this.images.push(new TouchImage(div, img, x, y, scale, 0, this));
    this.imageRoot.hidden = true;
    this.imageRoot.hidden = false;
};

TouchImageManager.prototype.removeImage = function(touchimg){
    this.imageRoot.removeChild(touchimg.el);
    this.images = this.images.filter(function(e){return e != touchimg});
};