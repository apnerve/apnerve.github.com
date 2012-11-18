/* The code can be made better */
$(document).ready(function() {
	BF.init();
});

var BF = {
	init: function() {
		$.getJSON('http://localhost/members.json', function(data) {
			var a = data.data;
			a.reverse();
			for (var i = 0; i < a.length; i++) {
			    BF.show(a[i]);
			}
		});
	},
	show: function(member) {
		$('#members').append('<li><a target="_blank" href="http://facebook.com/' + member.id +'" data-title="' + member.name +'"><img src="http://graph.facebook.com/' + member.id + '/picture" /></a></li>');
	}
}