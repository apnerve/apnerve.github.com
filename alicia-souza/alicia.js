  $(document).ready(function() {
    var albumURL = 'http://www.facebook.com/media/set/?set=a.224742877583940.55750.222801407778087&type=3';
    var temp = albumURL.split('.');
    var albumGraphURL = "http://graph.facebook.com/" + temp[3] + "/photos?fields=images,name,id,link&callback=?";

    $('#fb-album').append('<ul id="photolist"></ul>');
    var photoList = $("#photolist");
    
    var showImages = function(Obj) {
      $.getJSON(Obj, function(json){
        $.each(json.data, function(i, d) {
          photoList.append('<li><a href="'+ json.data[i].link +'" target="_blank"><img width="580" src="'+ json.data[i].images[1].source +'" id="' + json.data[i].id + '" /></a></li>');
        });

        showImages(json.paging.next);
      }); 
    }

    showImages(albumGraphURL); // init
  });