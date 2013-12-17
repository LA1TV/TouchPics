//TODO z-indexing
var zLayerDepth = 10;

TouchImageManager = function(root){
    this.images = [];
    this.imageRoot = root;
    window.addEventListener('resize', this.windowResize());
    this.windowHeight = window.innerHeight;
};

TouchImageManager.prototype.setMenuInfo = function(height){
    this.menuHeight = height;
};

TouchImageManager.prototype.windowResize = function(){
    var that = this;
    return function(e){
        console.log(window.innerHeight);
        that.windowHeight = window.innerHeight;
    }
};

TouchImageManager.prototype.newImage = function(img, x, y, scale){
    var vertSpace = this.windowHeight - this.menuHeight;
    var imgScale = Math.min(1, 0.8 * vertSpace / img.naturalHeight)
    imgScale = Math.min(imgScale, 0.8 * window.innerWidth / img.naturalWidth)
    
    var roughX = (window.innerWidth - imgScale * img.naturalWidth) / 2 + (Math.random() * 0.2 - 0.1) * window.innerWidth;
    var roughY = (vertSpace - imgScale * img.naturalHeight) / 2 + (Math.random() * 0.2 - 0.1) * vertSpace;
    var roughA = Math.random() - 0.5
    
    var div = document.createElement('div');
    div.className = 'touchable';
    this.imageRoot.appendChild(div);
    //FIXME Images don't always appear until clicked, some don't redraw correctly over other elements
    //TODO Try making an img from scratch
    //TODO Try adding z-indexes
    var touchImg = new TouchImage(div, img.cloneNode(true), roughX, roughY, imgScale, roughA, this)
    touchImg.setZBase(this.images.length * zLayerDepth);
    this.images.push(touchImg);
    this.images[0].twiddleZ();
};

TouchImageManager.prototype.removeImage = function(touchimg){
    this.imageRoot.removeChild(touchimg.el);
    this.images = this.images.filter(function(e){return e != touchimg});
};

TouchImageManager.prototype.bringToTop = function(touchimg){
    this.images = this.images.filter(function(e){return e != touchimg});
    this.images.push(touchimg);
    for(var i=0; i<this.images.length; i++){
        this.images[i].setZBase(i * zLayerDepth);  
    };
}