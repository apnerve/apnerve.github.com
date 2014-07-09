/*jshint strict:false, browser:true */
(function bookmarklet() {
  var tracks = [];$('.album_songlist .playcol').map(function(index, track) {tracks[index] = $(track).data('value');});var getURL = function(track_id) {$.post('http://gaana.com//streamprovider/get_stream_data_v1.php', {track_id:track_id}, function(data){console.log($.parseJSON(data).stream_path);});};tracks.map(getURL);
}());
