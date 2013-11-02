window.onload = function(e){
  element = document.getElementById('el');
  hammertime = Hammer(el, {prevent_mouseevents: true, transform_always_block: true})
  transform = hammertime.on('transform', function(event){
    console.log(event);
  }); 
  drag = hammertime.on('drag', function(event){
    console.log(event);
  }); 
};

