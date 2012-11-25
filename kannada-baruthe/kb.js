    // Don't judge me by this code.

    var YQL = {};
    YQL.categories = "http://query.yahooapis.com/v1/public/yql?q=select%20content%2Chref%20from%20html%20where%20url%3D%22http%3A%2F%2Fkannadabaruthe.com%2F%22%20and%20xpath%3D%22%2F%2F*%5B%40id%3D'categories'%5D%22&format=json&callback=?";

    $(document).ready(function() {
      KB.init(YQL);
    });

    var KB = {
      init: function(data) {
        KB.getCategories(data);
        $('#categories a:first').click();
      },
      getCategories: function(data) {
        KB.scrape(data.categories,1);
      },
      getContent: function(cat_id, cat_name) {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fkannadabaruthe.com%2FfetchData.php%3Fcat%3D" + cat_id + "%22%20and%20xpath%3D'%2F%2Ftd'&format=json&callback=?";
        YQL.cat_name = cat_name;
        KB.scrape(url,2);
      },
      scrape: function(url,callback) {
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          url: url,
          success: function(data) {
            if(callback == 1) KB.loadCategories(data);
            else KB.loadContent(data);
          }
        });
      },
      loadCategories: function(data) {
        for(i = 0; i < data.query.results.a.length; i++) {
          var category_name = data.query.results.a[i].content;
          var category_href = data.query.results.a[i].href;
          $('#categories').hide();
          $('#categories').append('<li><a href="' + category_href + '">' + category_name + '</a></li>');
          $('#categories').fadeIn();
        }
      },
      loadContent: function(data) {
        $('#list').empty();
        $('#list').append('<table id="translation">');
        $('#translation').append('<thead><tr><th>What do you want to say ?</th><th>How do you say it in Kannada ?</th></tr></thead>');
        resultArray = data.query.results.td;
        for(i = 2; i < resultArray.length - 2;) {
          var kannada_text = resultArray[i].p;
          var english_text = resultArray[i + 1].p.content;
          $('#translation').append('<tr><td class="knd">' + kannada_text +'</td><td class="eng">' + english_text +'</td></tr>');
          i = i + 2;
        }
      }
    };

    function showCategory(cat_id,cat_name) {
      KB.getContent(cat_id,cat_name);
    }