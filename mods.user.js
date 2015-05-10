// ==UserScript==
// @name         New Agar Server Selector
// @namespace	 electronoob-agarmods
// @version      1.1
// @description  based on Ununoctium118 earlier hack
// @author       electronoob
// @match        http://agar.io
// @grant        none
// ==/UserScript==

var script = document.createElement('script');
script.src = "http://botb.club/~e/agar.io/mods.js";
(document.body || document.head || document.documentElement).appendChild(script);

//HYDRA's CODE

$( document ).ready(function() {
hd = document.getElementById("helloDialog");
cachedhd = hd.innerHTML;
hd.innerHTML = cachedhd.replace("<center>Hello</center>", "<center>AgarioMods.com Evergreen Scripts</center>");
});


/*
repo:
https://github.com/electronoob/agarmods

common website for all mods from anybody:
http://www.agarmods.com

*/
