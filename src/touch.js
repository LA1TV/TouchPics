window.onload = function(e){
	Hammer.plugins.fakeMultitouch();
	Hammer.plugins.showTouches();

	//TODO Create the divs in JS
	//TODO Ability to close divs
	//TODO Image menu
	touchable = document.getElementById('test_touchable').firstElementChild;
	touchable.scale = 1;
	touchable.parentNode.pos = {};
	button = document.getElementById('test_button');
	hammer_config = {prevent_mouseevents: false, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true};

	touchable.hammertime = Hammer(touchable, hammer_config);
	button.hammertime = Hammer(button, hammer_config);
	
	transform_start = touchable.hammertime.on('transformstart', function(event){
		//TODO Tidy up the spaghetti
		event.target.startScale = event.target.scale;
		event.target.parentNode.pos.startLeft = event.target.parentNode.pos.left;
		event.target.parentNode.pos.startTop = event.target.parentNode.pos.top;
		//console.log(event);
	});
	transform = touchable.hammertime.on('transform', function(event){
		//TODO Add a minimum size for when scaling
		//TODO Scaling about gesture center
		//TODO Rotation
		event.target.scale = event.target.startScale * event.gesture.scale;
		event.target.width = event.target.naturalWidth * event.target.scale;
		event.target.height = event.target.naturalHeight * event.target.scale;
		event.target.parentNode.pos.left = event.target.parentNode.pos.startLeft - event.target.scale * event.target.naturalWidth/2 + event.target.startScale  * event.target.naturalWidth/2;
		event.target.parentNode.style.left = event.target.parentNode.pos.left;
		event.target.parentNode.pos.top = event.target.parentNode.pos.startTop - event.target.scale * event.target.naturalHeight/2 + event.target.startScale  * event.target.naturalHeight/2;
		event.target.parentNode.style.top = event.target.parentNode.pos.top;
		//console.log(event);
	}); 
	drag_start = touchable.hammertime.on('dragstart', function(event){
		//console.log(event);
		event.target.parentNode.pos.offsetX = event.target.x - event.gesture.center.pageX;
		event.target.parentNode.pos.offsetY = event.target.y - event.gesture.center.pageY;
	});
	drag = touchable.hammertime.on('drag', function(event){
		//console.log(event);
		event.target.parentNode.pos.left = event.gesture.startEvent.center.pageX + event.gesture.deltaX + event.target.parentNode.pos.offsetX;
		event.target.parentNode.pos.top = event.gesture.startEvent.center.pageY + event.gesture.deltaY + event.target.parentNode.pos.offsetY;
		event.target.parentNode.style.left = event.target.parentNode.pos.left;
		event.target.parentNode.style.top = event.target.parentNode.pos.top;
	}); 
	close = button.hammertime.on('tap', function(event){
		//TODO Close divs
		alert("This doesn't do much yet");
	});
};

