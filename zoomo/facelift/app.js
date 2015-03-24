(function($) {

  $.get('cars.json',function(data) {
    populate(data.cars);
  });

})(jQuery);

var populate = function(cars) {
  console.log(cars);
  
  new Vue({
    el: '#cars',
    data: {
      cars: cars
    }
  });

  var $container = $('#cars');
  $container.imagesLoaded( function() {
    $container.masonry({
      gutter: 24
    });
  });
}