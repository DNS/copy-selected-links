"use strict";

(() => {
	const popupSuccessCheckbox = document.getElementById("popupSuccess");
	const popupFailCheckbox = document.getElementById("popupFail");

	//

	chrome.storage.sync.get({
		popupSuccess: null,
		popupFail: null,
	}, options => {
		popupSuccessCheckbox.checked = options.popupSuccess;
		popupFailCheckbox.checked = options.popupFail;

		//

		popupSuccessCheckbox.addEventListener("change", event => {
			chrome.storage.sync.set({
				popupSuccess: popupSuccessCheckbox.checked
			});
		});

		popupFailCheckbox.addEventListener("change", event => {
			chrome.storage.sync.set({
				popupFail: popupFailCheckbox.checked
			});
		});
	});
})();
