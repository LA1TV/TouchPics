window.onload = function(e){
	Hammer.plugins.fakeMultitouch();
	Hammer.plugins.showTouches();

	touchable = document.getElementById('test_touchable').firstElementChild;
	touchable.scale = 1;
	button = document.getElementById('test_button');
	hammer_config = {prevent_mouseevents: false, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true};

	touchable.hammertime = Hammer(touchable, hammer_config);
	button.hammertime = Hammer(button, hammer_config);
	
	transform_start = touchable.hammertime.on('transformstart', function(event){
		event.target.startScale = event.target.scale;
		console.log(event);
	});
	transform = touchable.hammertime.on('transform', function(event){
		event.target.scale = event.target.startScale * event.gesture.scale;
		event.target.width = event.target.naturalWidth * event.target.scale;
		event.target.height = event.target.naturalHeight * event.target.scale;
		console.log(event);
	}); 
	drag_start = touchable.hammertime.on('dragstart', function(event){
		console.log(event);
		event.target.parentNode.offsetX = event.target.x - event.gesture.center.pageX;
		event.target.parentNode.offsetY = event.target.y - event.gesture.center.pageY;
	});
	drag = touchable.hammertime.on('drag', function(event){
		console.log(event);
		event.target.parentNode.style.left = event.gesture.startEvent.center.pageX + event.gesture.deltaX + event.target.parentNode.offsetX;
		event.target.parentNode.style.top = event.gesture.startEvent.center.pageY + event.gesture.deltaY + event.target.parentNode.offsetY;
	}); 
	close = button.hammertime.on('tap', function(event){
		alert("This doesn't do much yet");
	});
};

