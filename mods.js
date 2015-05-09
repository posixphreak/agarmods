/* this is kinda still a work in progress */
/* head nod to Ununoctium118 who wrote the original GM script for finding servers */

var modBlocking = true;
var nodeDiv = document.createElement("div");

nodeDiv.id = "includedContent";
nodeDiv.style.backgroundColor = "#000000";
nodeDiv.style.zIndex = 9999999999;
nodeDiv.style.color = "#dddddd";
nodeDiv.innerHTML = "<small>electronoob's evergreen server script for team play. <a target=\"_blank\" href=\"http://www.agarmods.com/\">Website</a>.</p>";
nodeDiv.innerHTML+= "<p>There is a new <a target=\"_blank\" href=\"https://www.reddit.com/r/Agario/comments/3590rk/want_to_team_up_join_the_unofficial_mumble_server/\">Mumble chat here.</a>";
nodeDiv.innerHTML+= "<u>connections steps</u>";
nodeDiv.innerHTML+= "\
<ul>\
  <li>1: get ip address from friend.</li>\
  <li>2: put it in text box below.</li>\
  <li>3: select ANY region.</li>\
  <li>Everytime you select a region, it will rotate through all servers on the ip address you entered.</li>\
  <li>There are several worlds per ip address, so check to make sure the leaderboard has same names as your friends one.</li>\
</ul>\
\
";

jQuery('#region').parent().get(0).appendChild( document.createElement("br"));
jQuery('#region').parent().get(0).appendChild(nodeDiv);

var selector = jQuery('#region');
var playBtn = jQuery('#playBtn');
var nodeInput = document.createElement("input");
var nodeBr = document.createElement("br");

nodeInput.className = "form-control";
nodeInput.id = "iphack";
nodeInput.placeholder = "Alternative server ip:port here.";

jQuery( playBtn ).parent().get( 0 ).appendChild(nodeBr);
jQuery( playBtn ).parent().get( 0 ).appendChild(nodeInput);

jQuery('#iphack').change(function () {
if (jQuery('#iphack').val() == "") {modBlocking = true;}
modBlocking = false;
});

jQuery('#playBtn').off();
$('.btn-needs-server').prop('disabled', false);
jQuery('#playBtn').click(function() {
	if (modBlocking == false ) {
//		jQuery('#region').val("SG-Singapore");
//		jQuery('#region').change();
	}
    setNick(document.getElementById('nick').value);
    return false;
});
jQuery('#region').off();
jQuery('#region').change(function () {
	jQuery.ajax("http://m.agar.io/", {
            error: function() {
            },
            success: function(a) {
                a = a.split("\n");
		if (modBlocking == true ) {
	                jQuery('#includedContent').html("Here is the IP address of the server you are connected to currently, pass it to your friends for team playing. <h3>" + a[0] + "</h3>");
          	} else {
			jQuery('#includedContent').html("<h3>Connecting to " +  jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the same server.<br><br>If you cannot see the same people in the leaderboard as your friend, randomly select a different region and it will try another world on the same server.");
		}
	    },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: jQuery('#region').val()
        });
});
(function(window){
    var WebSocket_original = window.WebSocket;
    window.WebSocket_original = WebSocket_original;
    window.WebSocket = function(data) {
	if (modBlocking == true ) {
		newWebSocket = new window.WebSocket_original(data);
        	return newWebSocket;
	}else {
		console.log("HAXXED: connecting to "+jQuery('#iphack').val()   + "(ignoring: "+data+")");
        	newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
        	return newWebSocket;
	}
    };
})(window);
