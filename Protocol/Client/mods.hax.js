/* this script is some of my attempts at getting access the client protocol - not much to report yet. console.log is my friend <3 */



var modBlocking = true;
var nodeDiv = document.createElement("div");
var serverNicks = new Array();

//jQuery(".blocker").src = "http://i.imgur.com/decGtkT.png";

nodeDiv.id = "includedContent";
nodeDiv.style.width = "800px"
nodeDiv.style.backgroundColor = "#000000";
nodeDiv.style.zIndex = 9999999999;
nodeDiv.style.position = "relative";
nodeDiv.style.padding = "10px";
nodeDiv.style.left = "-225px";
nodeDiv.style.borderRadius = "10px";
nodeDiv.style.boxShadow = "10px 10px 50px #ffffff";
nodeDiv.style.color = "#dddddd";
nodeDiv.innerHTML = "<small>electronoob's evergreen server script for team play, version 1.0. <a target=\"_blank\" href=\"http://www.agarmods.com/\">agariomods.com</a>.</p>";
nodeDiv.innerHTML += "<p>There is a new <a target=\"_blank\" href=\"https://www.reddit.com/r/Agario/comments/3590rk/want_to_team_up_join_the_unofficial_mumble_server/\">Mumble chat here.</a>";
nodeDiv.innerHTML += "<u>connections steps</u>";
nodeDiv.innerHTML += "\
<ul>\
  <li>1: get ip address from friend.</li>\
  <li>2: put it in text box below.</li>\
  <li>3: press the swirly icon next to it.</li>\
  <p>Note: There are many worlds on any given IP address so you must compare the leaderboard with your friends.</p>\
</ul>\
\
";

jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
jQuery('#region').parent().get(0).appendChild(nodeDiv);

var selector = jQuery('#region');
var playBtn = jQuery('#playBtn');
var nodeInput = document.createElement("input");
var nodeSpan = document.createElement("span");
var nodeBr = document.createElement("br");
nodeSpan.className = "glyphicon glyphicon-refresh";
nodeSpan.style.fontSize = "1.5em";
nodeSpan.style.cssFloat = "left";
nodeSpan.style.paddingTop = "5px";
nodeSpan.style.paddingLeft = "15px";
nodeSpan.addEventListener("click", function (e) {
    if (modBlocking == false) {
                      console.log ("clicked refresh");
                      jQuery('#region').val("EU-London");
                      jQuery('#region').change();
                      jQuery('#region').val("SG-Singapore");
                      jQuery('#region').change();
		      jQuery('#region').hide(200);
		      jQuery(this).fadeOut(100).fadeIn(100);
    }
});
nodeInput.className = "form-control";
nodeInput.id = "iphack"
nodeInput.style.width = "85%";
nodeInput.style.cssFloat = "left";
nodeInput.style.cssClear = "right";

nodeInput.placeholder = "Alternative server ip:port here.";

jQuery(playBtn).parent().get(0).appendChild(nodeBr);
jQuery(playBtn).parent().get(0).appendChild(nodeInput);
jQuery(playBtn).parent().get(0).appendChild(nodeSpan);

jQuery('#iphack').change(function() {
    if (jQuery('#iphack').val() == "") {
        modBlocking = true;
    }
    modBlocking = false;
});

jQuery('#playBtn').off();
$('.btn-needs-server').prop('disabled', false);
jQuery('#playBtn').click(function() {
    setNick(document.getElementById('nick').value);
    return false;
});
jQuery('#region').off();
jQuery('#region').change(function() {
    jQuery.ajax("http://m.agar.io/", {
        error: function() {},
        success: function(a) {
            a = a.split("\n");
            if (modBlocking == true) {
                jQuery('#includedContent').html("Here is the IP address of the server you are connected to currently, pass it to your friends for team playing. <h3>" + a[0] + "</h3>");
            } else {
                jQuery('#includedContent').html("<h3>Connecting to " + jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the same server.<br><br>If you cannot see the same people in the leaderboard as your friend, randomly select a different region and it will try another world on the same server.");
            }
        },
        dataType: "text",
        method: "POST",
        cache: !1,
        crossDomain: !0,
        data: jQuery('#region').val()
    });
});
(function(window) {
    var WebSocket_original = window.WebSocket;
    window.WebSocket_original = WebSocket_original;
    window.WebSocket = function(data) {
	var newWebSocket = null;
        if (modBlocking == true) {
            newWebSocket = new window.WebSocket_original(data);
        } else {
            console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
            newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
        }
	// to try and reverse engineer the protocol enough so that we can search for friends on a server
	setTimeout(function(){
		if(newWebSocket.onmessage) {
			var oldWebSocketMessageEvent = newWebSocket.onmessage;
		        newWebSocket.onmessage = function (e) {
				var data = e.data;
				dataview = new DataView(data);
				var buffer = "";
				var bufferHex = "";
				i = 0;
				x = dataview.byteLength;
				while(i<x) {
					ch = dataview.getUint8(i);
					buffer += String.fromCharCode(ch);
					//bufferHex += "0x" + ch.toString(16).toUpperCase();
					i++;
				}
//				console.log("next"); // + bufferHex);
//				console.log("char " + buffer);
                                /* try to parse */
                                electronoobParse(e, buffer);

				oldWebSocketMessageEvent(e);
			}
			clearTimeout(this);
		}
	}, 1);

	return newWebSocket;
	}
})(window);

    function electronoobParse(a, buffer) {
	var m = [];
	var C = [];
	var u = [];
        function b() {
           for (var a = "";;) {
                var b = e.getUint16(c, !0);
                c += 2;
                if (0 == b) break;
                a += String.fromCharCode(b)
            }
            return a
        }
        var c = 1,
        e = new DataView(a.data);
        switch (e.getUint8(0)) {
            case 16:
                //za(e);
		console.log("16 za (e)");
                break;
            case 17:
                x = e.getFloat64(1, !0);
                y = e.getFloat64(9, !0);
                H = e.getFloat64(17, !0);
		console.log("17 get floats x y H");
                break;
            case 20:
                m = [];
                C = [];
		console.log("20 m = [] and C = []");
                break;
            case 32:
                //C.push(e.getUint32(1, !0));
		console.log("32 C.push --");
                break;
            case 48:
                for (u = []; c < e.byteLength;) u.push({
                    id: 0,
                    name: b()
                });
                //oa();
		//console.log("48 for u = [] c< bytelength upush id name. oa()");
		console.log("case 48: "+ JSON.stringify(u));
                break;
            case 49:
                a = e.getUint32(c, !0);
                c += 4;
                u = [];
                for (var d = 0; d < a; ++d) {
                    var f = e.getUint32(c, !0),
                        c = c + 4;
                    u.push({
                        id: f,
                        name: b()
                    })
                }
                //oa(); // this is calling the leaderboard disaply stuff
		//console.log("49 for var d = 0 d< a; u.push id name. oa()");
		//console.log("case 49: "+ JSON.stringify(u));
                break;
            case 64:
                //I = e.getFloat64(1, !0), J = e.getFloat64(9, !0), K = e.getFloat64(17, !0), L = e.getFloat64(25, !0), x = (K + I) / 2, y = (L + J) / 2, H = 1, 0 == m.length && (s = x, t = y, g = H);
		console.log("case 64");
		break;
	default:
		console.log (" we hit default ");
        }

    }

function getWindowObj (search) {
	var list = window;
	do Object.getOwnPropertyNames(list).forEach(function(name) {
		console.log (name);
		//if (name == search) return this;
	})
	while(list = Object.getPrototypeOf(list));
}
$( document ).ready(function() {
hd = document.getElementById("helloDialog");
cachedhd = hd.innerHTML;
hd.innerHTML = cachedhd.replace("<center>Hello</center>","<center id="helloText">Hello</center>");
// "<center>AgariMods.com Evergreen Scripts</center>");
jQuery("helloText").hide(200);
});
