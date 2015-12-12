var Vue = require('vue'),
    $ = require('jquery'),
    config = {},
    App = {};

config.album_id = document.location.hash.replace('#', '');
config.access_token = '121118184595168|8e8082b0c8bb8f2759d6728b837143fb';
config.callback = 'showAlbum';

App.init = function() {
    console.info('Application started');
    $.ajaxSetup({
        cache: true
    });
    if(config.album_id) {
      $.getScript('https://graph.facebook.com/' + config.album_id + '?' + 'access_token=' + config.access_token + '&fields=from,name,description,photos' + '&callback=' + config.callback);
    } else {
      $('#btn').on('click', function() {
        var url = $('#album_url').val();
        $('#shop-link').append('<a class="btn" target="_blank" href="' + window.location.origin + '/#' + url.split('=')[1].split('.')[1] + '">Go to your ThriftShop</a>');
      });
    }
};

App.showAlbum = function(response) {
  App.showLoader(false);
  var vm = new Vue({
      el: '#store',
      data: {
          name: response.from.name,
          photos: response.photos.data.map(function(photo) {
              var priceIndex = !!photo.name && photo.name.search('INR'),
                  nameArray = !!photo.name && photo.name.split('\n'),
                  name = '';
              name = (!!nameArray[0] && nameArray[0].search('SOLD') === 0) ? nameArray[1] : nameArray[0];

              return {
                  name: !!name && name.replace('Detail - ',''),
                  picture: 'http://graph.facebook.com/' + photo.id + '/picture/type=normal',
                  price: !!photo.name && photo.name.slice(priceIndex, priceIndex + 12).replace(/[^\d.]/g, ''),
                  id: photo.id
              }
          }),
          album_name: response.name
      },
      methods: {
        details: function(e) {
          details.photo = this.photos[$(e.currentTarget).data('id')];
          details.show();
        }
      }
  });

  var details = new Vue({
    el: '#details',
    data: {
      photo: []
    },
    methods: {
      show: function() {
        $(this.$el).fadeIn();
      },
      hide: function() {
        $(this.$el).fadeOut();
      }
    }
  });
};

App.showLoader = function(state) {
  $('#store').removeClass('hidden');
  $('.loader').hide();
}

window.showAlbum = function(response) {
    App.showAlbum(response);
};

App.init();