"use strict";

const main = () => {
	const CONTEXT_ID = "copySelected";

	const notify = (title, message) => {
		chrome.notifications.create({
			type: "basic",
			title: title,
			message: message,
			iconUrl: "/images/icon-128.png"
		});
	};

	const onResponse = response => {
		chrome.storage.sync.get({
			popupSuccess: false,
			popupFail: true,
		}, options => {
			if (response.links.length > 0) {
				if (options.popupSuccess) {
					notify("", "Copied " + response.links.length + " links to clipboard.");
				}
			} else {
				if (options.popupFail) {
					notify("", "No links found.");
				}
			}
		});
	};

	const onClicked = (info, tab) => {
		if (info.menuItemId === CONTEXT_ID) {
			chrome.tabs.sendMessage(tab.id, {
				subject: "copyRequested",
				linkUrl: info.linkUrl !== ""? info.linkUrl: null
			}, onResponse);

			return true;
		}
	};

	chrome.contextMenus.onClicked.addListener(onClicked);

	chrome.contextMenus.create({
		type: "normal",
		id: CONTEXT_ID,
		title: "Copy selected links",
		contexts: ["selection", "link"]
	});
};
