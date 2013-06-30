var ki = (function ($) {
	// javascript module pattern
	"use strict"; // enable strict mode for javascript module
	// private vars
	var module = {},
		classes = {
			"posterAndAudioWrapper" : "posterAndAudioWrapper",
			"poster" : "poster",
			"audiojs" : "audiojs",
			"sample" : "sample",
			"hidden" : "hidden",
			"active" : "active",
			"eyeCandy" : "eyeCandy",
			"info" : "info"
		},
		products = $('article.product'),
		as = null,
		slider = $('#mainWrapper'),
		optimized = {
			"top" : null,
			"left" : null,
			"minus" : null
		},
		main = $('#main'),
		winWidth = $(window).width();
	// private methods
	var	audioInit = function() {
		if(Modernizr.audio.mp3 != '') {
			as = audiojs.createAll();
			$("." + classes.sample).addClass(classes.hidden);
		}
		else {
			as = audiojs.createAll();
			$("audio").addClass(classes.hidden);
		}
	},
	positionInit = function (callback) {
		$.each(products, function (index, element) {
			// position the stuff
			var e = $(element);
				if (optimized.minus === null) optimized.minus = 93 * 0.5;
				if (optimized.top === null) optimized.top = e.find("." + classes.poster).height() * 0.5 - optimized.minus;
				if (optimized.left == null) optimized.left = e.find("." + classes.posterAndAudioWrapper).width() * 0.5 - optimized.minus;

				e.find("." + classes.audiojs + " , ." + classes.sample).css({
					"top" : optimized.top,
					"left" : optimized.left
				});

				e.find("." + classes.info).addClass(classes.eyeCandy);
				if(e.hasClass(classes.active)) {
					productsShift(e.position().left, e.width());
				}
		});
		callback();
	},
	eventHandlers = function () {
		slider.find("article").click(function (e) {
			e.preventDefault();
			var el = $(this);
			products.removeClass(classes.active);
			el.addClass(classes.active);
			productsShift(el.position().left, el.width(), true);
		});
		$(window).resize(function() {
			winWidth = $(window).width();
		});
	},
	fanzyIntroShizzle = function () {
		main.addClass(classes.eyeCandy);
		main.css({
			"top" : 0,
			"opacity" : 1
		});
	},
	productsShift = function (pos, activeWidth, testForTransforms) {
		var marginLeft = pos * -1 + (winWidth - activeWidth) * 0.5
		if(!slider.hasClass(classes.eyeCandy) && testForTransforms == true) {
			slider.addClass(classes.eyeCandy);
		}
		slider.css({
			"marginLeft" : marginLeft
		});
	};
	// public methods
	module.init = function () {
		audioInit();
		eventHandlers();
		positionInit(fanzyIntroShizzle);
		
	};
	//return the module
	return module;
}(jQuery));

$(document).ready(function() {
	ki.init();
});