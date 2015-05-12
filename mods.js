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
nodeDiv.innerHTML += "<p><small>*** For approximately the next hour evergreen script will be disabled because of a new agar.io update. This script will update automatically once I have completed the update.</small></p>";

jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
jQuery('#region').parent().get(0).appendChild(nodeDiv);

