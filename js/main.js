var ki = (function ($) {
	// javascript module pattern
	"use strict"; // enable strict mode for javascript module
	// private vars
	var module = {},
	cssCode = null,
	slider = $("#mainWrapper"),
	pra = $("article");
	// private methods
	var productsInit = function () {
		//cssCode = $('<style/>').html("#main #mainWrapper article.active {max-width :" + ($(window).width() - 20 * 2)  + "px; }").appendTo($("head"));
		console.log($(".active").position().left);
		var pos = $(".active").position().left,
			width = $(window).width(),
			w2 = $(".active").width();

			var gna = (width - w2) * 0.5;
			console.log(gna);
		slider.css({
			"marginLeft" : (pos * -1) + gna
		});
	};
	// public methods
	module.init = function () {
		// code for placment of buttons
		productsInit();
	};
	//return the module
	return module;
}(jQuery));

$(document).ready(function() {
	var as = audiojs.createAll();
	ki.init();
});