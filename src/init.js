init = function(e){
    hammer_config = {
        prevent_mouseevents: false, 
        transform_always_block: true, 
        drag_block_horizontal: true, 
        drag_block_vertical:true
    };
    
    Hammer.plugins.showTouches();
    Hammer.plugins.fakeMultitouch();

    manager = new TouchImageManager(document.body);
    menu = new Menu(1600,150,50,manager);
    menu.createButton('http://la1tv.lusu.co.uk/files/2012/01/logo_dark_web_banner.jpg');
};

window.onload = init;