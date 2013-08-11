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
			"info" : "info",
			"showButtons" : "showButtons",
			"playPause" : "play-pause",
			"additionalInfo" : "additionalInfo"
		},
		products = $('article.product'),
		productsAmount = products.length,
		as = null,
		slider = $('#mainWrapper'),
		optimized = {
			"top" : null,
			"left" : null,
			"minus" : null
		},
		main = $('#main'),
		winWidth = $(window).width(),
		currentPlayer = null,
		productWidth = 700,
		indexOfLastShiftedProduct = null;
	// private methods
	var	audioInit = function() {
		if(Modernizr.audio.mp3 != '') { // mp3 suuport
			as = audiojs.createAll();
			$("." + classes.playPause).addClass(classes.eyeCandy);
			$("." + classes.sample).addClass(classes.hidden);
		}
		else {
			$("audio").addClass(classes.hidden);
			$("." + classes.sample).addClass(classes.eyeCandy);
		}
	},
	positionInit = function (callback) {
		slider.width(products.length * productWidth);
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
		$("." + classes.sample).click(function(e) {
			e.stopPropagation()
		});
		$("." + classes.posterAndAudioWrapper).click(function (e) {
			e.preventDefault();
			
			var el = $(this).parent(),
				index = el.index();

			if(!el.hasClass(classes.active)) {
				slider.addClass(classes.eyeCandy);
				var oldIndex = slider.find("." + classes.active).index();
				products.removeClass(classes.active);
				el.addClass(classes.active);
				productsShift(el.position().left, el.width(), true);
				if(Modernizr.csstransitions) {
					$(slider).one("transitionend otransitionend oTransitionEnd msTransitionEnd", function(event) {
						sliderItemTransitionCallBack(index - oldIndex);
					});
				}
				else {
					sliderItemTransitionCallBack(index - oldIndex);
				}
				
				$.each(as, function (index, element) {
					element.pause();
				});
			}
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
		slider.css({
			"marginLeft" : marginLeft
		});
	},
	sliderCssWithoutTransformation = function (css) {
		slider.css(css);
	},
	sliderItemTransitionCallBack = function (leftOrRight) {
		slider.removeClass(classes.eyeCandy);
		if(leftOrRight < 0) {
			slider.find("article").last().prependTo(slider);
			sliderCssWithoutTransformation({
			 	"marginLeft" : (parseFloat(slider.css("marginLeft")) - productWidth) + "px"
			 });
		}
		else if(leftOrRight > 0) {
			slider.find("article").first().appendTo(slider);
			sliderCssWithoutTransformation({
			 	"marginLeft" : (parseFloat(slider.css("marginLeft")) + productWidth) + "px"
			 });
		}
		else {
			console.error("wzf: shifting error");
		}
	};
	// public methods
	module.init = function () {
		main.css({
			"top":  "-200px",
    		"opacity": 0
		});
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