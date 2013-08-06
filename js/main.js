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
		console.log(as);
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
		$('.' + classes.additionalInfo + " a").click(function (e) {
			console.log("bla");
		});
		$("." + classes.posterAndAudioWrapper).click(function (e) {
			console.log("blzb");
			e.preventDefault();
			var el = $(this).parent(),
				index = el.index();

			if(!el.hasClass(classes.active)) {
				var oldIndex = slider.find("." + classes.active).index();
				products.removeClass(classes.active);
				el.addClass(classes.active);
				productsShift(el.position().left, el.width(), true);
				$(slider).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", sliderItemTransitionCallBack(index - oldIndex));
				// code für neverending shifting
				
				// if(index == 0) {
				// 	// sliderCssWithoutTransformation({
				// 	// 	"marginLeft" : -el.width()
				// 	// });
				// 	slider.find("article").last().prependTo(slider);
				// }
				// else if (index == productsAmount -1) {
				// 	slider.find("article").first().appendTo(slider);
				// }
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
		if(!slider.hasClass(classes.eyeCandy) && testForTransforms == true) {
			slider.addClass(classes.eyeCandy);
		}
		slider.css({
			"marginLeft" : marginLeft
		});
	},
	sliderCssWithoutTransformation = function (css) {
		//slider.removeClass(classes.eyeCandy);
		slider.css(css);
		//slider.addClass(classes.eyeCandy);
	},
	sliderItemTransitionCallBack = function (leftOrRight) {
		slider.removeClass(classes.eyeCandy);
		if(leftOrRight < 0) {
			console.log("leftOrRight: " + leftOrRight);
			console.log("shifting left");
			console.log(slider.find("article").last().length)
			slider.find("article").last().addClass("bla").prependTo(slider);
			console.log(slider.css("marginLeft"));
			console.log("math: " + (parseFloat(slider.css("marginLeft")) + productWidth));
			sliderCssWithoutTransformation({
			 	"marginLeft" : (parseFloat(slider.css("marginLeft")) - productWidth) + "px"
			 });
			console.log(slider.css("marginLeft"));
		}
		else if(leftOrRight > 0) {
			console.log("leftOrRight: " + leftOrRight);
			console.log("shifting right");
			slider.find("article").first().appendTo(slider);
			sliderCssWithoutTransformation({
			 	"marginLeft" : (parseFloat(slider.css("marginLeft")) + productWidth) + "px"
			 });
		}
		else {
			console.error("wzf: shifting error");
		}
		slider.addClass(classes.eyeCandy);
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
		
	},
	module.bla = function (css) {
		console.log(css);
		sliderCssWithoutTransformation(css);
	};
	//return the module
	return module;
}(jQuery));

$(document).ready(function() {
	ki.init();
});

$(document).load(function() {

});