init = function(e){
    hammer_config = {
        prevent_mouseevents: false, 
        transform_always_block: true, 
        drag_block_horizontal: true, 
        drag_block_vertical:true
    };
    
    Hammer.plugins.showTouches();
    Hammer.plugins.fakeMultitouch();

    manager = new TouchImageManager(document.getElementById('outer'));
    menu = new Menu(1600,150,50,manager);
    drawing = new DrawingMenu(75,300,manager);
        menu.createButton('http://la1tv.lusu.co.uk/files/2012/01/logo_dark_web_banner.jpg');
    menu.createButton('http://extrams-web.lancs.ac.uk/images/map.jpg');
    menu.createButton('http://i1.ytimg.com/u/rjiHmjA6u9nepgwKwCytAg/channels4_banner.jpg?v=51484d76');
    menu.createButton('http://www.bailriggfm.co.uk/templates/0910//images/logo.png');
};

window.onload = init;
