// UTILITIES

var $=function(a){
  return document.getElementById(a);
};

var rand = function(low, high) {
  return low+Math.floor(Math.random()*(high-low+1));
};

var makeHSL = function(color){
  return "hsl("+color+","+rand(60,100)+"%,"+rand(30,70)+"%)";
};

// PROCESS CONFIG DATA

var unfiltered=RAW_QUOTE_STRING.split(/\n/);
var quotes=[];
for(var i=0;i<unfiltered.length;++i){
  unfiltered[i]=unfiltered[i].trim();
  if(unfiltered[i].length != 0)quotes.push(unfiltered[i]);
}

unfiltered=RAW_GOOGLE_EARTH_STRING.split(/\n/);
var googleEarth=[];
for(var i=0;i<unfiltered.length;++i){
  unfiltered[i]=unfiltered[i].trim();
  // This will trim the last row of data, but whatever.
  if(unfiltered[i].length == 80)googleEarth.push(unfiltered[i]);
}

var mode = new Property(MODE, v => {
  $("normal-section").style.display = (v == "normal") ? "flex" : "none";
  $("ice-cream-section").style.display = (v == "ice-cream") ? "flex" : "none";
  $("bake-sale-section").style.display = (v == "bake-sale") ? "flex" : "none";
  $("hat-sale-section").style.display = (v == "hat") ? "flex" : "none";

  if(v === "normal"){
    makeQuote();
  }
  
  if(v === "ice-cream"){
    $("ice-cream-section").style.backgroundImage="url('https://hips.hearstapps.com/del.h-cdn.co/assets/17/23/1497238977-delish-mason-jar-ice-cream-3.jpg')";
  }

  if(v === "bake-sale"){
    $("bake-sale-section").style.backgroundImage="url('https://media.wired.com/photos/5926a8adcfe0d93c47430fa3/master/pass/Pumpkins-452399143-1.jpg')";
  }
  
  if(v === "hat"){
    $("hat-sale-section").style.background="black";
  }
});

var colorizeBackground = function() {
  if(ENABLE_GOOGLE_EARTH) {
    if(!window.googleEarthLoaded) {
      window.googleEarthLoaded = true;
      var n = rand(0, 19) * 4;
      var id = googleEarth[rand(0,googleEarth.length - 1)].substring(n, n+4);
      $("normal-section").style.backgroundImage="url('https://www.gstatic.com/prettyearth/assets/full/" + id + ".jpg'),url('https://www.gstatic.com/prettyearth/assets/preview/" + id + ".jpg')";
    }
  } else {
    var color1 = rand(0,359);
    var color2 = color1 + rand(40,120);
    $("normal-section").style.background="linear-gradient(90deg, "+makeHSL(color1)+" 0%,"+makeHSL(color2)+" 100%)";
  }
}

var makeQuote = function(){
  colorizeBackground();
  $("quote").textContent = quotes[rand(0,quotes.length - 1)];
};

$("credits").addEventListener("click", function(){
  mode.setValue("normal");
  colorizeBackground();
  $("quote").textContent = "Made by Jeffrey Huang for the Class Office of 2021. Quotes from various online sources.";
});

$("new-quote").addEventListener("click", function(){
  mode.setValue("normal");
  makeQuote();
});

$("search-input").focus();

mode.init();
