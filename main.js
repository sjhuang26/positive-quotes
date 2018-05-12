/* FOR ALL MODES */
var $=function(a){
  return document.getElementById(a);
}
function togglePoster(show){
  $("poster-section").style.display=show?"flex":"none";
  $("normal-section").style.display=show?"none":"flex";
}
function rand(low, high) {
  return low+Math.floor(Math.random()*(high-low+1));
}
function makeHSL(color){
  return "hsl("+color+","+rand(60,100)+"%,"+rand(30,70)+"%)";
}
var unfiltered=RAW_QUOTE_STRING.split(/\n/);
var quotes=[];
for(var i=0;i<unfiltered.length;++i){
  unfiltered[i]=unfiltered[i].trim();
  if(unfiltered[i].length != 0)quotes.push(unfiltered[i]);
}
function makeQuote(){
  togglePoster(false);
  var color1 = rand(0,359);
  var color2 = color1 + rand(40,120);
  var randQuote = quotes[rand(0,quotes.length - 1)];
  $("normal-section").style.background="linear-gradient(90deg, "+makeHSL(color1)+" 0%,"+makeHSL(color2)+" 100%)";
  $("quote").textContent = randQuote;
}
$("credits").addEventListener("click", function(){
  makeQuote();
  $("quote").textContent = "Made by Jeffrey Huang for the Class Office of 2021. Quotes from various online sources.";
});
$("new-quote").addEventListener("click", function(){
  makeQuote();
});

/* FOR NORMAL MODE */
if(MODE==="normal"){
  makeQuote();
}

/* FOR POSTER MODE */
if(MODE==="poster"){
  togglePoster(true);
  $("poster-section").style.backgroundImage="url('https://hips.hearstapps.com/del.h-cdn.co/assets/17/23/1497238977-delish-mason-jar-ice-cream-3.jpg')";
}
document.getElementById("credits").addEventListener("click", function(){
  document.getElementById("quote").textContent = "Made by Jeffrey Huang for the Class Office of 2021. Quotes from various online sources.";
});
