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
    menu.createButton('http://extrams-web.lancs.ac.uk/images/map.jpg');
};

window.onload = init;

//FIXME overflow: hidden on body only blocks scrollwheel scrolling, its still possible to scroll in other ways, e.g. middle mouse click and move