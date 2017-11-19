"use strict";

// https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
const copyToClipboard = text => {
    const onCopy = event => {
		document.removeEventListener("copy", onCopy, true);

        event.stopImmediatePropagation();
		event.preventDefault();

        event.clipboardData.setData("text/plain", text);
	};

    document.addEventListener("copy", onCopy, true);
    document.execCommand("copy");
};

const getLinksInSelection = () => {
	const selection = getSelection();

	return Array.from(document.links).filter(link => selection.containsNode(link, true));
};

const onCopyRequested = (msg, sendResponse) => {
	const foundLinks = [];

	getLinksInSelection().map(link => link.href).forEach(url => {
		if (foundLinks.indexOf(url) === -1) {
			foundLinks.push(url);
		}
	});

	if (msg.linkUrl != null && foundLinks.indexOf(msg.linkUrl) === -1) {
		foundLinks.push(msg.linkUrl);
	}

	if (foundLinks.length > 0) {
		copyToClipboard(foundLinks.join(msg.isWindows? "\r\n": "\n"));
	}

	sendResponse({
		linksCopied: foundLinks.length
	});
};

const onMessageReceived = (msg, sender, sendResponse) => {
	switch (msg.subject) {
		case "copyRequested":
			onCopyRequested(msg, sendResponse);
			break;
		default:
			throw new Error("unknown message subject: " + msg.subject);
	}
};

chrome.runtime.onMessage.addListener(onMessageReceived);
