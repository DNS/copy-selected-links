"use strict";

(() => {
	const debugging = document.getElementById("debugging");
	
	const onChanged = event => {
		chrome.storage.local.set({
			debugging: debugging.checked
		});
	};
	
	chrome.storage.local.get({
		debugging: false
	}, options => {
		debugging.checked = options.debugging;

		debugging.addEventListener("change", onChanged);
	});
})();