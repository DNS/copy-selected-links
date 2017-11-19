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
			if (response.linksCopied > 0) {
				if (options.popupSuccess) {
					notify("", "Copied " + response.linksCopied + " links to clipboard.");
				}
			} else {
				if (options.popupFail) {
					notify("", "No links found.");
				}
			}
		});
	};

	chrome.runtime.getPlatformInfo(platformInfo => {
		const isWindows = platformInfo.os === chrome.runtime.PlatformOs.WIN;

		const onContextMenuClicked = (contextMenuInfo, tab) => {
			switch (contextMenuInfo.menuItemId) {
				case contextMenuId:
					const linkUrl = contextMenuInfo.linkUrl != null && contextMenuInfo.linkUrl !== ""? contextMenuInfo.linkUrl: null;

					chrome.tabs.sendMessage(tab.id, {
						subject: "copyRequested",
						linkUrl: linkUrl,
						isWindows: isWindows
					}, afterCopying);

					return true;

				default:
					throw new Error("unknown context menu id: " + contextMenuInfo.menuItemId);
			}
		};

		chrome.contextMenus.onClicked.addListener(onContextMenuClicked);

		const onCreate = () => {
			const error = chrome.runtime.lastError != null? chrome.runtime.lastError.message: null;
			if (error === "Cannot create item with duplicate id " + contextMenuId) {
				// ignore
			} else if (error != null) {
				throw new Error(error);
			}
		};

		chrome.contextMenus.create({
			type: "normal",
			id: contextMenuId,
			title: "Copy selected links",
			contexts: ["selection", "link"],
			documentUrlPatterns: ["*://*/*", "file:///*"]
		}, onCreate);
	});
};
