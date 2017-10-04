"use strict";

const copyToClipboard = (() => {
	const textarea = document.getElementById("copy");
	
	const copy = text => {
		debug("copy", text, "to clipboard");
		
		textarea.value = text;
		textarea.focus();
		document.execCommand("SelectAll");
		document.execCommand("Copy");
		textarea.value = "";
	};
	
	return copy;
})();