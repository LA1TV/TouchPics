TouchImageManager = function(root){
    this.images = [];
    this.imageRoot = root;
};

TouchImageManager.prototype.newImage = function(src, x, y, scale){
    var div = document.createElement('div');
    div.className = 'touchable';
    var img = document.createElement('img');
    img.src = src;
    img.className = 'touchable';
    div.appendChild(img);
    this.imageRoot.appendChild(div);
    this.images.push(new TouchImage(div, img, x, y, scale));
};

TouchImageManager.prototype.removeImage = function(touchimg){
    this.imageRoot.removeChild(touchimg.el);
    this.images = this.images.filter(function(e){return e == touchimg});
};