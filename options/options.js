"use strict";

(() => {
	const popupSuccess = document.getElementById("popupSuccess");
	const popupFail = document.getElementById("popupFail");

	//

	chrome.storage.sync.get({
		popupSuccess: null,
		popupFail: null,
	}, options => {
		popupSuccess.checked = options.popupSuccess;
		popupFail.checked = options.popupFail;

		//

		popupSuccess.addEventListener("change", event => {
			chrome.storage.sync.set({
				popupSuccess: popupSuccess.checked
			});
		});

		popupFail.addEventListener("change", event => {
			chrome.storage.sync.set({
				popupFail: popupFail.checked
			});
		});
	});
})();
