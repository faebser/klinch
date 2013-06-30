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
			"active" : "active"
		},
		products = $('article.product'),
		as = null,
		optimized = {
			"top" : null,
			"left" : null,
			"minus" : null
		};
	// private methods
	var c = function (which ,withSelector) {
		if(withSelector == false || typeof(withSelector) ==='undefined') {
			return classes[which];
		}
		else {
			return "." + classes[which];
		}
	},
	audioInit = function() {
		if(Modernizr.audio.mp3 != '') {
			as = audiojs.createAll();
			$("." + classes.sample).addClass(classes.hidden);
		}
		else {
			as = audiojs.createAll();
			$("audio").addClass(c("hidden"));
		}
	},
	positionInit = function () {
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

				if(e.hasClass("." + classes.active)) {
					// center and make it bigger
					// write fuction to hold this
				}
		});
	};
	// public methods
	module.init = function () {
		audioInit();
		positionInit();
		eventHandlers();
	};
	//return the module
	return module;
}(jQuery));

$(document).ready(function() {
	ki.init();
});