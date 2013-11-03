window.onload = function(e){
	element = document.getElementById('el');
	hammertime = Hammer(document.body, {prevent_mouseevents: true, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true})
	transform = hammertime.on('transform', function(event){
		console.log(event);
	}); 
	tstart = document.body.addEventListener('touchstart', function(event){
		console.log(event);
		event.target.parentNode.offsetX = event.target.x - event.targetTouches[0].pageX;
		event.target.parentNode.offsetY = event.target.y - event.targetTouches[0].pageY;
	});
	drag = hammertime.on('drag', function(event){
		console.log(event);
		event.target.parentNode.style.left = event.gesture.startEvent.center.pageX + event.gesture.deltaX + event.target.parentNode.offsetX;
		event.target.parentNode.style.top = event.gesture.startEvent.center.pageY + event.gesture.deltaY + event.target.parentNode.offsetY;
	}); 
	transform = hammertime.on('transform', function(event){
		console.log(event);
	});
};

