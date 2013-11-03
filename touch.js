window.onload = function(e){
	element = document.getElementById('el');
	hammertime = Hammer(document.body, {prevent_mouseevents: true, transform_always_block: true, drag_block_horizontal: true, drag_block_vertical:true})
	transform = hammertime.on('transform', function(event){
		console.log(event);
	}); 
	drag = hammertime.on('drag', function(event){
		console.log(event);
		event.target.parentNode.posTop += event.gesture.deltaY
		console.log(event.target.parentNode.posTop);
		event.target.parentNode.style.top =event.target.parentNode.posTop;
	}); 
};

