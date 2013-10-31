var element = document.getElementById('el');
var hammertime = Hammer(el).on('transform', function(event){
  alert('Hello!');
});
