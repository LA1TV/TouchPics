document.onload = function(e){
  var element = document.getElementById('el');
  var hammertime = Hammer(el)
  var transform = hammertime.on('transform', function(event){
    alert('Hello!');
  }); 
  var drag = hammertime.on('drag', function(event){
    console.log(event);
    alert('Hellish!');
  }); 
};

