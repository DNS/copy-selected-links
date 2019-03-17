// https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
export function copyToClipboard(text: string) {
	const onCopy = (event: ClipboardEvent) => {
		document.removeEventListener("copy", onCopy, true);

		event.stopImmediatePropagation();
		event.preventDefault();

		event.clipboardData.setData("text/plain", text);
	};

	document.addEventListener("copy", onCopy, true);
	document.execCommand("copy");
}
