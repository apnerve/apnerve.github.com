  $(document).ready(function() {
    var albumURL = 'https://www.facebook.com/media/set/?set=a.121125554748254.1073741828.120709694789840&type=3';
    var temp = albumURL.split('.');
    var albumGraphURL = "http://graph.facebook.com/" + temp[3] + "/photos?fields=images,name,id,link&callback=?";

    $('#fb-album').append('<ul id="photolist"></ul>');
    var photoList = $("#photolist");
    
    var showImages = function(Obj) {
      $.getJSON(Obj, function(json){
        $.each(json.data, function(i, d) {
          photoList.append('<li><a href="'+ json.data[i].link +'" target="_blank"><img width="612" src="'+ json.data[i].images[1].source +'" id="' + json.data[i].id + '" /></a></li>');
        });

        showImages(json.paging.next);
      }); 
    }

    showImages(albumGraphURL); // init
  });
