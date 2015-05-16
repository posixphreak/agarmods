var modBlocking = true;

function main() {
	httpGet("//agar.io/main_out.js", function(data) {
		var gamejs = "window.agariomods = " + data;
		injectScript(gamejs);
	});
}

// XMLHttp, because apparently raven is doing funky stuff with jQuery
function httpGet(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	};
}

function injectScript(gamejs) {
	gamejs = patchScript(gamejs);

	var script = document.createElement("script");
	script.innerHTML = gamejs;
	document.head.appendChild(script);

	createUI();
}

function patchScript(gamejs) {
	//branding
	gamejs = gamejs.replace("socket open", "socket open (agariomods.com mod in place)");
	// fix raven
	gamejs = gamejs.replace('g.Raven&&g.Raven.config("https://2a85d1d3fb114384a2758cde7de2bef7@app.getsentry.com/43938",{release:"2",whitelistUrls:["agar.io/"]}).install();', "");

	//haxx
	var shouldShowMass = /setShowMass=function\(\w+\){(\w+)=\w+};/.exec(gamejs)[1];
	var match = /(\w+)=-1!=(\w+)\.indexOf\(this\);/.exec(gamejs);
	var isOwnedCell = match[1],
		ownedCells = match[2];
	var sizeCache = /(\w+)=this\.sizeCache/.exec(gamejs)[1];

	var haxx = "if (!" + isOwnedCell + ") { \
		var biggest = 0; \
		" + ownedCells + ".forEach(function(x) { \
			if (x.size > biggest) { \
				biggest = x.size; \
			} \
		}); \
		var size = ~~((this.size * this.size) / (biggest * biggest) * 100) + '%'; \
	} else { \
		var size = ~~(this.size * this.size / 100); \
	}";
	gamejs = gamejs.replace(shouldShowMass + '&&' + isOwnedCell + '&&', haxx + shouldShowMass + '&&');
	gamejs = gamejs.replace(sizeCache + '.setValue(~~(this.size*this.size/100))', sizeCache + '.setValue(size)');
	gamejs = gamejs.replace(sizeCache + '.setSize(this.getNameSize()/2)', sizeCache + '.setSize(this.getNameSize() * 1.5)');
	return gamejs;
}

function createUI() {
	jQuery('#helloDialog').css({
		top: '-100px'
	});
	jQuery('#helloDialog').css({
		margin: '5px auto'
	});
	//<!-- HYDRO's CODE -->
	$(document).ready(function() {
		hd = document.getElementById("helloDialog");
		hd.innerHTML = hd.innerHTML.replace("<center>Hello</center>", "<center><small>AgarioMods.com Evergreen Scripts</small></center>");
	});
	//<!-- INTEL's CODE -->
	document.getElementById("nick").placeholder = "Name";
	$(document).ready(function() {
		nh = document.getElementById("overlays");
		nh.innerHTML = nh.innerHTML.replace("<p>Type your nick or leave it empty:</p>", "");
	});
	var nodeDiv = document.createElement("div");
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "640px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 9999999999;
	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "5px";
	nodeDiv.style.left = "-170px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
	nodeDiv.innerHTML = "<p><b>Version 1.6.2</b>&nbsp;&nbsp;<small>stupid ravenjs edition.</small></p>";
	//<p>Our <a target=\"_blank\" href=\"http://www.agariomods.com/\">website</a>, <a target=\"_blank\" href=\"http://forum.agariomods.com/\">forum</a>, and <a target=\"_blank\" href=\"http://www.agariomods.com/mumble.html\">mumble</a>.</p>";
	nodeDiv.innerHTML += "<h3><a target=\"_blank\" href=\"http://forum.agariomods.com/\"><img width=\"40px\" src=\"http://i.imgur.com/oWFWwDo.png\">&nbsp;Join us at our new forum here.</a></h3>";
	nodeDiv.innerHTML += "<b>connections steps</b>";
	nodeDiv.innerHTML += "\
	<ul>\
	  <li>1: Get ip address from friend.</li>\
	  <li>2: Put it in text box below.</li>\
	  <li>3: Press the swirly icon next to it.</li>\
	  <p><b>Note:</b> Check with your friend to see whos #1 on the leaderboard</p>\
	</ul>\
	<div style=\"background-color: #ffffff; color: #000000;\">\
	<b>Disable adblocking software!</b>&nbsp;<small>We finally tracked down an issue to adblocking software, Turns out that it breaks the game and our modifications in random and unexpected ways. Beside Zeach provides this game free and we all need to support him!</small>\
	</div>\
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
	nodeSpan.addEventListener("click", function(e) {
		if (modBlocking == false) {
			//jQuery('#region').style.height = "0px";
			jQuery('#region').hide();
			//jQuery('#gamemode').style.height = "0px";
			jQuery('#gamemode').hide();
			console.log("clicked refresh");
			var oldregionval = jQuery('#region').val;
			jQuery('#region').val("EU-London");
			jQuery('#region').change();
			jQuery('#region').val("SG-Singapore");
			jQuery('#region').change();
			jQuery('#region').val(oldregionval);
			jQuery('#region').change();
			jQuery('#gamemode').change();
			//jQuery(this).fadeOut(100).fadeIn(100);
		}
	});
	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.border = "2px solid green";
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

}

main();

(function(window) {
	var WebSocket_original = window.WebSocket;
	window.WebSocket_original = WebSocket_original;
	var newWebSocket = 0;
	window.WebSocket = function(data) {
		if (modBlocking == true) {
			newWebSocket = new window.WebSocket_original(data);
			jQuery('#includedContent').html("Here is the IP address of the server you are connected to currently, pass it to your friends for team playing. <h3>" + data.replace('ws://', '') + "</h3>&nbsp;");
		} else {
			console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
			jQuery('#includedContent').html("<h3>Connected to " + jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");

		}
		return newWebSocket;

	};
})(window);
