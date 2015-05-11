var tester = document.getElementsByTagName("script");

var i = 0, main_out_url = "http://agar.io/main_out.js", discovered_mainouturl = 0;
for (i=0; i<tester.length; i++ ){
	src = tester[i].src;
	if (src.substring(0, main_out_url.length ) == main_out_url) {
		discovered_mainouturl = src.replace("http://agar.io/","");
	}
}
var gamejs = "";
if(discovered_mainouturl != !1) {
	$.ajax({
  	url: discovered_mainouturl,
 	 	success:function(data){
			gamejs = "window.agariomods = " + data.replace("socket open","intercepted game js socket open");
			agariomodsRuntimeInjection();
  		}
	});
}
function agariomodsRuntimeInjection() {
	var tester = document.getElementsByTagName("html");
	var oldhtml = tester[0].innerHTML;
	var script = document.createElement("script");
	agariomodsRuntimePatches();
	script.innerHTML = gamejs;
	document.head.appendChild(script);
}
function agariomodsRuntimePatches() {
	gamejs = gamejs.replace(';reddit;',';reddit;electronoob;');
	gamejs = gamejs.replace('W[b]=new Image,W[b].src="skins/"+b+".png"','W[b]=new Image,W[b].crossOrigin = "Anonymous",W[b].src="skins/"+b+".png"');
	gamejs = gamejs.replace('b=this.name.toLowerCase();', 'b=this.name.toLowerCase();var agariomods="";if(b == "electronoob") {agariomods="http://agariomods.com/skins/electronoob";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase();}');
	gamejs = gamejs.replace('W[b].src="skins/"+b+".png"','W[b].src=agariomods+".png"');
}
