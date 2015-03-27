(function($) {

  $.get('cars.json',function(data) {
    populate(data.cars);
  });

  var populate = function(cars) {
    console.log(cars);
    var details = $('#details');

    var carVM = new Vue({
      el: '#cars',
      data: {
        cars: cars,
        detail: {}
      },
      methods: {
        showDetails: function(car) {
          carVM.$data.detail = car;
          var image  = $(car.$el).find('.img-splash');
          console.log(image.offset());
          $('body').addClass('overlay');
          details.css({
            'width' : image.width(),
            'height' : image.height(),
            'left' : image.offset().left + 'px',
            'top' : image.offset().top + 'px',
            'overflow' :'hidden'
          }).animate({
            'width' : '900px',
            'height' :'2000px',
            'left' : ($(window).width() - 900)/2 + 'px',
            'top' : 0,
            'overflow' : 'scroll'
          }, 400);
        }
      }
    });

    var $container = $('#cars .list');
    $container.imagesLoaded( function() {
      $container.masonry({
        gutter: 24
      });
    });
  }

})(jQuery);