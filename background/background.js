"use strict";

const main = () => {
	const contextMenuId = "copySelectedLinksContextMenuItem";

	const notify = (title, message) => {
		chrome.notifications.create({
			type: "basic",
			title: title,
			message: message,
			iconUrl: "/images/icon-128.png"
		});
	};

	const afterCopying = response => {
		chrome.storage.sync.get({
			popupSuccess: null,
			popupFail: null,
		}, options => {
			if (response.linksCopied.length > 0) {
				if (options.popupSuccess) {
					notify("", "Copied " + response.linksCopied.length + " links to clipboard.");
				}
			} else {
				if (options.popupFail) {
					notify("", "No links found.");
				}
			}
		});
	};

	const onContextMenuClicked = (info, tab) => {
		switch (info.menuItemId) {
			case contextMenuId:
				chrome.runtime.getPlatformInfo(info => {
					chrome.tabs.sendMessage(tab.id, {
						subject: "copyRequested",
						linkUrl: info.linkUrl != null && info.linkUrl !== ""? info.linkUrl: null,
						isWindows: info.os === chrome.runtime.PlatformOs.WIN
					}, afterCopying);
				});

				return true;

			default:
				throw new Error("unknown context menu id: " + info.menuItemId);
		}
	};

	chrome.contextMenus.onClicked.addListener(onContextMenuClicked);

	chrome.contextMenus.create({
		type: "normal",
		id: contextMenuId,
		title: "Copy selected links",
		contexts: ["selection", "link"],
		documentUrlPatterns: ["*://*/*", "file:///*"]
	});
};
