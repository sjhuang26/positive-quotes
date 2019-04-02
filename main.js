// UTILITIES

(($) => {
	var rand = function(low, high) {
		return low+Math.floor(Math.random()*(high-low+1));
	};

	var makeHSL = function(color){
		return 'hsl('+color+','+rand(60,100)+'%,'+rand(95,100)+'%)';
	};

	var $str = function(str) {
		var x = document.createElement('div');
		x.innerHTML = str;
		return x.firstChild;
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

	var fuse = (() => {
		var options = {
			shouldSort: true,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			keys: [
				'department',
				'text'
			]
		};
		return new Fuse(TEACHER_WEBPAGE_LIST, options);
	})();
	var mode = new Property(MODE, v => {
		configureSearchComponent($('google-search'));
		configureSearchComponent($('teacher-search'), (rawTerm) => {
			var term = rawTerm.trim();
			var $r = $('teacher-search-results');
			while ($r.firstChild) {
				$r.removeChild($r.firstChild);
			}
			if (term !== '') { // blanks don't count
				$('teacher-search-results-wrap').style.display = 'block';
				var results = fuse.search(term).splice(0, 5);
        
				for (var result of results) {
					$r.appendChild($str(`<div class="search-results-item"><span>${result.text}</span><span class="search-results-item-secondary"> ${result.department ? result.department : 'No department'}</span></div>`));
				}
				if (results.length === 0) {
					$r.appendChild($str('<div class="search-results-item">No results</div>'));
				}
			} else {
				$('teacher-search-results-wrap').style.display = 'none';
			}
		});
		$('normal-section').style.display = (v == 'normal') ? 'flex' : 'none';
		$('ice-cream-section').style.display = (v == 'ice-cream') ? 'flex' : 'none';
		$('bake-sale-section').style.display = (v == 'bake-sale') ? 'flex' : 'none';
		$('hat-sale-section').style.display = (v == 'hat') ? 'flex' : 'none';

		if(v === 'normal'){
			makeQuote();
			var flickity = new Flickity('.carousel', {
				imagesLoaded: true,
				contain: true,
				pageDots: false,
				lazyLoad: 1,
				draggable: false
			});
		}
    
		if(v === 'ice-cream'){
			$('ice-cream-section').style.backgroundImage='url(\'https://hips.hearstapps.com/del.h-cdn.co/assets/17/23/1497238977-delish-mason-jar-ice-cream-3.jpg\')';
		}

		if(v === 'bake-sale'){
			$('bake-sale-section').style.backgroundImage='url(\'https://media.wired.com/photos/5926a8adcfe0d93c47430fa3/master/pass/Pumpkins-452399143-1.jpg\')';
		}
    
		if(v === 'hat'){
			$('hat-sale-section').style.background='black';
		}
	});

	var colorizeBackground = function() {
		if(ENABLE_GOOGLE_EARTH) {
			if(!window.googleEarthLoaded) {
				window.googleEarthLoaded = true;
				var n = rand(0, 19) * 4;
				var id = googleEarth[rand(0,googleEarth.length - 1)].substring(n, n+4);
				$('normal-section').style.backgroundImage='url(\'https://www.gstatic.com/prettyearth/assets/full/' + id + '.jpg\'),url(\'https://www.gstatic.com/prettyearth/assets/preview/' + id + '.jpg\')';
			}
		} else {
			var color1 = rand(0,359);
			var color2 = color1 + rand(40,120);
			$('normal-section').style.background='linear-gradient(90deg, '+makeHSL(color1)+' 0%,'+makeHSL(color2)+' 100%)';
		}
	};

	var makeQuote = function(){
		colorizeBackground();
		$('quote').textContent = quotes[rand(0,quotes.length - 1)];
	};

	var configureSearchComponent = function($e, handler){
		if (handler) {
			$e.querySelector('.search--input').addEventListener('input', function(ev){
				handler($e.querySelector('.search--input').value);
			});
			$e.addEventListener('submit', function(ev){
				handler($e.querySelector('.search--input').value);
				ev.preventDefault();
			});
			handler($e.querySelector('.search--input').value);
		}
	};

	$('credits').addEventListener('click', function(){
		mode.setValue('normal');
		colorizeBackground();
		$('quote').textContent = 'Made by Jeffrey Huang for the Class Office of 2021. Quotes from various online sources.';
	});

	$('new-quote').addEventListener('click', function(){
		mode.setValue('normal');
		makeQuote();
	});

	mode.init();
})((a) => document.getElementById(a));