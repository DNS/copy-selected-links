"use strict";

(() => {
	chrome.storage.sync.get({
		popupSuccess: false,
		popupFail: true
	}, options => {
		const overwrite = {};
		
		//

		if (typeof(options.popupSuccess) !== "boolean") {
			overwrite.popupSuccess = false;
		}
		
		if (typeof(options.popupFail) !== "boolean") {
			overwrite.popupFail = true;
		}
		
		//
		
		const keys = Object.keys(overwrite);
		if (keys.length > 0) {
			debug("resetting", overwrite);

			chrome.storage.sync.set(overwrite, () => {
				chrome.runtime.openOptionsPage();
				main();
			});
		} else {
			main();
		}
	});
})();