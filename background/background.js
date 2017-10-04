"use strict";

const main = () => {
	const CONTEXT_ID = "copySelected";
	
	const onInstalled = details => {
		debug("create context menu");
		
		chrome.contextMenus.create({
			type: "normal",
			id: CONTEXT_ID,
			title: "Copy selected links",
			contexts: ["selection", "link"]
		});
	};
	
	const notify = (title, message) => {
		chrome.notifications.create({
			type: "basic",
			title: title,
			message: message,
			iconUrl: "/images/icon-128.png"
		});
	};
	
	const onResponse = response => {
		debug("response:", response);

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
		debug("context menu clicked:", info, tab);
		
		if (info.menuItemId === CONTEXT_ID) {
			debug("request copy");
			
			chrome.tabs.sendMessage(tab.id, {
				subject: "copyRequested",
				linkUrl: info.linkUrl !== undefined? info.linkUrl: null
			}, onResponse);
			
			return true;
		}
	};
	
	chrome.runtime.onInstalled.addListener(onInstalled);
	chrome.contextMenus.onClicked.addListener(onClicked);
};