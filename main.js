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
  var color1 = rand(0,359);
  var color2 = color1 + rand(40,120);
  var randQuote = quotes[rand(0,quotes.length - 1)];
  document.getElementById("app").style.background="linear-gradient(90deg, "+makeHSL(color1)+" 0%,"+makeHSL(color2)+" 100%)";
  document.getElementById("quote").textContent = randQuote;
  document.getElementById("search").href="https://www.google.com/search?q="+encodeURI(randQuote);
}
makeQuote();
document.getElementById("new-quote").addEventListener("click", function(){
  makeQuote();
});
document.getElementById("credits").addEventListener("click", function(){
  document.getElementById("quote").textContent = "Made by Jeffrey Huang for the Class Office of 2021. Quotes from various online sources.";
});
