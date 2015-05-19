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
	// add another cache to Cell class
	gamejs = gamejs.replace('sizeCache:null,', 'sizeCache:null,ratioCache:null,');

	var haxx = function() {
		if (this.size < 20) { // don't render for "skittles"
			$gameCanvas.restore();
			return;
		}

		// slightly modified code of zeach
		var offset = ~~this.y;
		function renderCellText(cell, value) {
			cache = new $cellText(cell.getNameSize(), "#FFFFFF", true, "#000000");
			cache.setValue(value);
			cache.setSize(cell.getNameSize());
			scale = Math.ceil(10 * $scaleMultiplier) / 10;
			cache.setScale(scale);
			var canvas = cache.render(),
				width = ~~(canvas.width / scale),
				height = ~~(canvas.height / scale);
			$gameCanvas.drawImage(canvas, ~~cell.x - ~~(width / 2), offset - ~~(height / 2), width, height);
			offset += canvas.height / 1.3 / scale + 4;

			return cache;
		}

		// render name
		if (this.name && this.nameCache)
			this.nameCache = renderCellText(this, this.name);
		// render ratio
		if (-1 == $ownedCells.indexOf(this)) {
			var biggestCellSize = $ownedCells.reduce(function(previous, current) {
				return previous > current.size ? previous : current.size;
			}, 0);
			var text = ~~((this.size * this.size) / (biggestCellSize * biggestCellSize) * 100) + '%';

			this.ratioCache = renderCellText(this, text);
		}
		// render mass
		this.sizeCache = renderCellText(this, ~~this.size);
	};

	//bypass obfuscation
	var match = /(\w+)=-1!=(\w+)\.indexOf\(this\);/.exec(gamejs);
	var isOwnedCell = match[1],
		ownedCells = match[2];
	var cellText = /this\.nameCache=new (\w+)\(this\.getNameSize/.exec(gamejs)[1];
	var scaleMultiplier = /Math\.ceil\(10\*(\w+)\)\/10/.exec(gamejs)[1];
	var gameCanvas = /(\w+)=\w+\.getContext\("2d"\)/.exec(gamejs)[1];

	// convert haxx closure to string
	haxx = haxx.toString()
		.replace(/function \(\) {([^]+)}/, "$1") // get the function body
		.replace(/\$ownedCells/g, ownedCells) // fix pseudo-variables
		.replace(/\$cellText/g, cellText)
		.replace(/\$scaleMultiplier/g, scaleMultiplier)
		.replace(/\$gameCanvas/g, gameCanvas);

	// inject haxx, here we are overriding cell text rendering logic in draw function
	gamejs = gamejs
		.replace(/\w+=-1!=\w+\.indexOf\(this\)[^]+?restore\(\)/,
				 '{0} {1}.restore()'.format(haxx, gameCanvas));

	return gamejs;
}

function createUI() {
	$('#helloDialog').css({
		top: '-100px'
	});
	$('#helloDialog').css({
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
	$('#region').parent().get(0).appendChild(document.createElement("br"));
	$('#region').parent().get(0).appendChild(nodeDiv);
	var selector = $('#region');
	var playBtn = $('#playBtn');
	var nodeInput = document.createElement("input");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	nodeSpan.className = "glyphicon glyphicon-refresh";
	nodeSpan.style.fontSize = "1.5em";
	nodeSpan.style.cssFloat = "left";
	nodeSpan.style.paddingTop = "5px";
	nodeSpan.style.paddingLeft = "15px";
	nodeSpan.addEventListener("click", function(e) {
		if (!modBlocking) {
			//$('#region').style.height = "0px";
			$('#region').hide();
			//$('#gamemode').style.height = "0px";
			$('#gamemode').hide();
			console.log("clicked refresh");
			var oldregionval = $('#region').val;
			$('#region').val("EU-London");
			$('#region').change();
			$('#region').val("SG-Singapore");
			$('#region').change();
			$('#region').val(oldregionval);
			$('#region').change();
			$('#gamemode').change();
			//$(this).fadeOut(100).fadeIn(100);
		}
	});
	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.border = "2px solid green";
	nodeInput.placeholder = "Alternative server ip:port here.";
	$(playBtn).parent().get(0).appendChild(nodeBr);
	$(playBtn).parent().get(0).appendChild(nodeInput);
	$(playBtn).parent().get(0).appendChild(nodeSpan);
	$('#iphack').change(function() {
		modBlocking = $.trim($('#iphack').val()) == "";
	});
	$('#playBtn').off();
	$('.btn-needs-server').prop('disabled', false);
	$('#playBtn').click(function() {
		setNick(document.getElementById('nick').value);
		return false;
	});

}

main();

// this is godsent
String.prototype.format = function() {
	var formatted = this;
	for (var i = 0; i < arguments.length; i++) {
		var regexp = new RegExp('\\{' + i + '\\}', 'gi');
		formatted = formatted.replace(regexp, arguments[i]);
	}
	return formatted;
};

(function(window) {
	var WebSocket_original = window.WebSocket;
	window.WebSocket_original = WebSocket_original;
	var newWebSocket = 0;
	window.WebSocket = function(data) {
		if (modBlocking) {
			newWebSocket = new window.WebSocket_original(data);
			$('#includedContent').html("Here is the IP address of the server you are connected to currently, pass it to your friends for team playing. <h3>" + data.replace('ws://', '') + "</h3>&nbsp;");
		} else {
			var iphack = $('#iphack').val();
			console.log("HAXXED: connecting to " + iphack + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + iphack);
			$('#includedContent').html("<h3>Connected to " + iphack + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");
		}
		return newWebSocket;
	};
})(window);
