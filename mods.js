function main() {
	// inject into agariomods
	httpGet("http://agariomods.com/mods.js", function(data) {
		var inject = function() {
			var orig_agariomodsRuntimePatches = agariomodsRuntimePatches;
			agariomodsRuntimePatches = function() {
				// let agariomods do the initial patching
				orig_agariomodsRuntimePatches();
				// add our own patches
				gamejs = patchScript(gamejs);
			};
		};
		// get the function body
		data += inject.toString().replace(/function \(\) {([^]+)}/, "$1");
		eval(data);
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
			var text = ~~(Math.pow(this.size / biggestCellSize, 2) * 100) + '%';

			this.ratioCache = renderCellText(this, text);
		}
		// render mass
		this.sizeCache = renderCellText(this, ~~(this.size * this.size / 100));

		$gameCanvas.restore();
	};

	//bypass obfuscation
	var ownedCells = /\w+?=-1!=(\w+?)\.indexOf\(this\);/.exec(gamejs)[1];
	var cellText = /this\.nameCache=new (.+?)\(this\.getNameSize/.exec(gamejs)[1];
	var scaleMultiplier = /Math\.ceil\(10\*(\w+?)\)\/10/.exec(gamejs)[1];
	var gameCanvas = /(\w+?)=\w+?\.getContext\("2d"\)/.exec(gamejs)[1];

	// convert haxx closure to string
	haxx = haxx.toString()
		.replace(/function \(\) {([^]+)}/, "$1") // get the function body
		.replace(/\$ownedCells/g, ownedCells) // fix pseudo-variables
		.replace(/\$cellText/g, cellText)
		.replace(/\$scaleMultiplier/g, scaleMultiplier)
		.replace(/\$gameCanvas/g, gameCanvas);

	// inject haxx, here we are overriding cell text rendering logic in draw function
	gamejs = gamejs.replace(/\w+?=-1!=\w+?\.indexOf\(this\)[^]+?restore\(\)/, haxx);

	return gamejs;
}

main();
