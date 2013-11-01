window.onload = function(e){
  element = document.getElementById('el');
  hammertime = Hammer(el)
  transform = hammertime.on('transform', function(event){
    alert('Hello!');
  }); 
  drag = hammertime.on('drag', function(event){
    console.log(event);
    alert('Hellish!');
  }); 
};

