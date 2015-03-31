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
          window.image  = $(car.$el).find('.img-splash');
          var adjustOffset = $(window).scrollTop();
          console.log(image.offset());
          $('body').addClass('overlay');
          details.css({
            'width' : image.width(),
            'height' : image.height(),
            'left' : image.offset().left + 'px',
            'top' : image.offset().top - adjustOffset + 'px',
            'overflow' :'hidden'
          }).animate({
            'width' : '900px',
            'height' :'2000px',
            'left' : ($(window).width() - 900)/2 + 'px',
            'top' : 0,
            'overflow' : 'scroll',
            'opacity' : 1
          }, 400, function() {
            details.find('.details-container').show();
          });
        },

        hideDetails: function(car) {
          $('body').removeClass('overlay');
          var adjustOffset = $(window).scrollTop();
          
          details.css({
            'width' : '900px',
            'height' :'2000px',
            'left' : ($(window).width() - 900)/2 + 'px',
            'top' : 0,
            'overflow' : 'scroll'
          }).animate({
            'width' : image.width(),
            'height' : image.height(),
            'left' : image.offset().left + 'px',
            'top' : image.offset().top - adjustOffset + 'px',
            'overflow' :'hidden',
            'opacity': 0
          }, 400);

          details.find('.details-container').hide();
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