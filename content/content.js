"use strict";

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
			
			sendResponse({
				links: out
			});
		}
	};

	chrome.runtime.onMessage.addListener(onMessage);
})();