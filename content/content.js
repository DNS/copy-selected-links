"use strict";

// https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
const copyToClipboard = text => {
    const oncopy = event => {
		document.removeEventListener("copy", oncopy, true);

        event.stopImmediatePropagation();
		event.preventDefault();

        event.clipboardData.setData("text/plain", text);
	};

    document.addEventListener("copy", oncopy, true);
    document.execCommand("copy");
};

const getLinksInSelection = () => {
	const selection = getSelection();

	return Array.from(document.links).filter(link => selection.containsNode(link, true));
};

const toHref = link => link.href;

const onMessage = (msg, sender, sendResponse) => {
	if (msg.subject === "copyRequested") {
		const selectedLinks = getLinksInSelection();

		let out;

		if (selectedLinks.length > 0) {
			out = selectedLinks.map(toHref);
		} else {
			out = msg.linkUrl? [msg.linkUrl]: [];
		}

		if (out.length > 0) {
			copyToClipboard(out.join("\n"));
		}

		sendResponse({
			links: out
		});
	}
};

let timeOut = null;

const onTimeout = () => {
	timeOut = null;

	const count = getLinksInSelection().length;

	chrome.runtime.sendMessage({
		subject: "linksSelected",
		linkCount: count
	});
};

document.addEventListener("selectionchange", function() {
	if (timeOut) {
		clearTimeout(timeOut);
	}

	timeOut = setTimeout(onTimeout, 100);
});

const onContextMenu = event => {
	let nodeToInspect = event.target;

	while (nodeToInspect != null) {
		if (nodeToInspect.nodeName === "A") {
			chrome.runtime.sendMessage({
				subject: "linksSelected",
				linkCount: 1
			});
			break;
		}

		nodeToInspect = nodeToInspect.parentNode;
	}
};

document.addEventListener("contextmenu", onContextMenu);

chrome.runtime.onMessage.addListener(onMessage);
