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

(() => {
	let selection;

	const isSelected = link => selection.containsNode(link, true);
	const toHref = link => link.href;

	const onMessage = (msg, sender, sendResponse) => {
		if (msg.subject === "copyRequested") {
			selection = getSelection();
			const selectedLinks = Array.from(document.links).filter(isSelected);
			
			let out;
			
			if (selectedLinks.length > 0) {
				out = selectedLinks.map(toHref);
			} else {
				out = msg.linkUrl !== null? [msg.linkUrl]: [];
			}

			if (out.length > 0) {
				copyToClipboard(out.join("\n"));
			}
			
			sendResponse({
				links: out
			});
		}
	};

	chrome.runtime.onMessage.addListener(onMessage);
})();