/* this is kinda still a work in progress */
/* head nod to Ununoctium118 who wrote the original GM script for finding servers */
var modBlocking = true;
var nodeDiv = document.createElement("div");

<!-- HYDRO's CODE -->
 
$( document ).ready(function() {
hd = document.getElementById("helloDialog");
cachedhd = hd.innerHTML;
hd.innerHTML = cachedhd.replace("<center>Hello</center>", "<center>AgarioMods.com Evergreen Scripts</center>");
});
 
var showBorders = true;
var skin = skinsEnabled ? getSkin(this.name) : null;
      ctx.stroke();
      ctx.fill();
      if (skin != null && skin.width > 0) {
        ctx.save();
        ctx.clip();
        if (imageTransparency) {
          ctx.globalAlpha = 0.7;
        }
        ctx.drawImage(skin, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        ctx.restore();
      }
function drawMapBorders() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(11180, 0);
    ctx.lineTo(11180, 11180);
    ctx.lineTo(0, 11180);
    ctx.lineTo(0, 0);
    ctx.stroke();
       
}
 
draw: function () {
      if (sizeColors) {
        var mySize = Math.min.apply(null, myCells.map(function (x) { return x.getMass(); })); // Size of the smallest piece of us
        if (this.isVirus) {//} || myCells.length === 0) {
          this.color = "#666666"; // Viruses are always gray, and everything is gray when dead
        } else if (~myCells.indexOf(this)) {
          this.color = "#0000FF"; // Cells we own are blue
        } else if (this.getMass() > mySize * 2.5) {
          this.color = "#FF0000"; // Cells that can split on us are red
        } else if (this.getMass() > mySize * 1.25) {
          this.color = "#FF6600"; // Cells that can eat us are orange
        } else if (this.getMass() > mySize * 0.75) {
          this.color = "#FFFF00"; // Cells that we can't, and they can't eat us are yellow
        } else if (this.getMass() > mySize * 0.4) {
          this.color = "#007700"; // Cells that we can eat are dark green
        } else {
          this.color = "#00FF00"; // Cells that we can split on are ligth green
        }
      }

<!-- INTEL's CODE -->

document.getElementById("nick").placeholder = "Name";
$( document ).ready(function() {
nh = document.getElementById("overlays");
cachednh = nh.innerHTML;
nh.innerHTML = cachednh.replace("<p>Type your nick or leave it empty:</p>", "Type A Username");
});

<!----------------------------------------------------------------------------------------------------------------------->

nodeDiv.id = "includedContent";
nodeDiv.style.width = "300px"
nodeDiv.style.backgroundColor = "#000000";
nodeDiv.style.zIndex = 9999999999;
nodeDiv.style.position = "center";
nodeDiv.style.padding = "5px";
nodeDiv.style.left = "-200px";
nodeDiv.style.borderRadius = "5px";
nodeDiv.style.color = "#dddddd";
nodeDiv.innerHTML = "<p><b>Version 1.4.1</b></p> <p>Our Website <a target=\"_blank\" href=\"http://www.agarmods.com/\">Agariomods.com</a>.</p>";
nodeDiv.innerHTML += "<p><small>There is a new <a target=\"_blank\" href=\"https://www.reddit.com/r/Agario/comments/3590rk/want_to_team_up_join_the_unofficial_mumble_server/\">Mumble chat here.</a></small>";
nodeDiv.innerHTML += "<b>connections steps</b>";
nodeDiv.innerHTML += "\
<ul>\
  <li>1: Get ip address from friend.</li>\
  <li>2: Put it in text box below.</li>\
  <li>3: Press the swirly icon next to it.</li>\
  <p><b>Note:</b> Check with your friend to see whos #1 on the leaderboard</p>\
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
        if (modBlocking == true) {
            newWebSocket = new window.WebSocket_original(data);
            return newWebSocket;
        } else {
            console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
            newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
            return newWebSocket;
        }
    };
})(window);

