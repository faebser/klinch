var ki = (function ($) {
	// javascript module pattern
	"use strict"; // enable strict mode for javascript module
	// private vars
	var module = {};
	// private methods
	// public methods
	module.init = function () {
		// code for placment of buttons
	};
	//return the module
	return module;
}(jQuery));

$(document).ready(function() {
	var as = audiojs.createAll();
	ki.init();
});