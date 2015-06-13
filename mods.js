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
        data += inject.toString()
            .replace(/function \(\) {([^]+)}/, "$1");
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
    //bypass obfuscation
    var ownedCells = /\w+?=-1!=(\w+?)\.indexOf\(this\);/.exec(gamejs)[1];
    var isVirus = /this\.(\w+?)\?"miter":"round"/.exec(gamejs)[1];

    var haxx = function() {
        var mass = ~~(this.size * this.size / 100);
        var mysize = $ownedCells.reduce(function(previous, current) {
            return previous > current.size ? previous : current.size;
        }, 0);
        mysize = ~~(mysize * mysize / 100);

        if (this.$isVirus) {
            this.color = "#666666"; // Viruses are always gray, and everything is gray when dead
        } else if (~$ownedCells.indexOf(this)) {
            this.color = "#0000FF"; // Cells we own are blue
        } else if (mass > mysize * 2.5) {
            this.color = "#FF0000"; // Cells that can split on us are red
        } else if (mass > mysize * 1.25) {
            this.color = "#FF6600"; // Cells that can eat us are orange
        } else if (mass > mysize * 0.75) {
            this.color = "#FFFF00"; // Cells that we can't, and they can't eat us are yellow
        } else if (mass > mysize * 0.4) {
            this.color = "#007700"; // Cells that we can eat are dark green
        } else {
            this.color = "#00FF00"; // Cells that we can split on are ligth green
        }
    };

    haxx = haxx.toString()
        .replace(/function \(\) {([^]+)}/, "$1") // get the function body
        .replace(/\$ownedCells/g, ownedCells) // fix pseudo-variables
        .replace(/\$isVirus/g, isVirus);

    gamejs = gamejs.replace(/(if\(this\.\w+?\(\)\)\{)/, "$1" + haxx + "");
    //console.log(gamejs);
    return gamejs;
}

main();
