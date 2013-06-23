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
		productsShift($(".active").position().left, $(".active").width());

		$("article").click(function(e) {
			e.preventDefault();
			slider.find("article").removeClass("active");
			$(this).addClass("active");
			productsShift($(this).position().left, $(this).width());
		});
	},
	productsShift = function (pos, activeWidth) {
		var width = $(window).width();
		var gna = pos * -1 + (width - activeWidth) * 0.5
		slider.css({
			"marginLeft" : gna
		})
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