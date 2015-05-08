/* this is kinda still a work in progress */
/* head nod to Ununoctium118 who wrote the original GM script for finding servers */

var modBlocking = true;
var nodeDiv = document.createElement("div");
nodeDiv.id = "includedContent";
nodeDiv.style.backgroundColor = "#000000";
nodeDiv.style.zIndex = 9999999999;
nodeDiv.style.color = "#dddddd";
nodeDiv.innerHTML = "<small>electronoob</small>";
nodeDiv.innerHTML+= "<p>hacked interface for team play</p>";
jQuery('#region').parent().get(0).appendChild( document.createElement("br"));
jQuery('#region').parent().get(0).appendChild(nodeDiv);

var selector = jQuery('#region');
var playBtn = jQuery('#playBtn');
var nodeInput = document.createElement("input");
var nodeBr = document.createElement("br");
nodeInput.className = "form-control";
nodeInput.id = "iphack";
jQuery( playBtn ).parent().get( 0 ).appendChild(nodeBr);
jQuery( playBtn ).parent().get( 0 ).appendChild(nodeInput);

jQuery('#iphack').change(function () {
modBlocking = false;
});

jQuery('#playBtn').off();
$('.btn-needs-server').prop('disabled', false);
jQuery('#playBtn').click(function() {
	if (modBlocking == false ) {
		jQuery('#region').val("SG-Singapore");
		jQuery('#region').change();
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
                jQuery('#includedContent').html(a[0]);
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
