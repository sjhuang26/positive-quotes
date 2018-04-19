// Change this to change the number of quotes
var QUOTE_NUM=3;
var QUOTE_URLS=["quote-1.png","quote-2.jpg","quote-3.png"];

var idx=Math.floor(Math.random()*QUOTE_NUM);

document.getElementById("main-image-wrap").style.backgroundImage="url('"+QUOTE_URLS[idx]+"')";