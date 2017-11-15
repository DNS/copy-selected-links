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
			popupSuccess: null,
			popupFail: null,
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
				linkUrl: info.linkUrl != null && info.linkUrl !== ""? info.linkUrl: null
			}, onResponse);

			return true;
		}
	};

	const onMessage = function(msg, sender, sendResponse) {
		switch (msg.subject) {
			case "linksSelected":
				chrome.contextMenus.update(CONTEXT_ID, {
					title: "Copy " + msg.linkCount + " selected links"
				});
				break;
			default:
				throw new Error("unknown message subject: " + msg.subject);
		}
	};

	const onCreated = () => chrome.runtime.onMessage.addListener(onMessage);

	chrome.contextMenus.onClicked.addListener(onClicked);

	chrome.contextMenus.create({
		type: "normal",
		id: CONTEXT_ID,
		title: "Copy selected links",
		contexts: ["selection", "link"]
	}, onCreated);
};
