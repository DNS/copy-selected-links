"use strict";

const debug = (() => {
	let debuggingEnabled = null;
	
	const onStorageChanged = (changes, areaName) => {
		if (areaName === "local" && changes.debugging !== undefined && typeof(changes.debugging.newValue) === "boolean") {
			debuggingEnabled = changes.debugging.newValue;
			console.debug("debugging", debuggingEnabled? "enabled": "disabled");
		}
	};
	
	chrome.storage.onChanged.addListener(onStorageChanged);
	
	// needs to be function because of arguments
	const output = function() {
		if (debuggingEnabled === true) {
			console.debug.apply(console, arguments);
		} else {
			if (debuggingEnabled === null) {
				chrome.storage.local.get({
					debugging: false
				}, options => { // can't split away to const because of arguments
					if (typeof(options.debugging) !== "boolean") {
						throw "debugging is not set to a boolean";
					}
					
					debuggingEnabled = options.debugging;
					debug.apply(this, arguments);
				});
			}
		}
	};
	
	return output;
})();