import {browser} from "webextension-polyfill-ts";
import {LinksCopiedMessage} from "./common/LinksCopiedMessage";
import {PerformCopyMessage} from "./common/PerformCopyMessage";
import {Settings} from "./common/Settings";
import {copyToClipboard} from "./content/ClipboardUtils";

const flag = Symbol.for("copy-selected-links-script-injection");
const register = window as {
	[flag]?: true
};

if (register[flag] == null) {
	function onCopyRequested(msg: PerformCopyMessage) {
		const selection = getSelection();

		if (selection == null) {
			throw new Error("selection disappeared?");
		}

		const hrefs = Array.from(document.links)
			.filter(link => selection.containsNode(link, true))
			.map(link => link.href);

		const foundLinks = [...new Set(hrefs)];

		if (foundLinks.length > 0) {
			Settings.load().then(settings => {
				const newline = msg.isWindows ? "\r\n" : "\n";
				const joined = foundLinks.join(newline);

				copyToClipboard(settings.finalNewline ? joined + newline : joined);
			});
		}

		return Promise.resolve(new LinksCopiedMessage(foundLinks.length));
	}

	function onMessageReceived(msg: any) {
		if (PerformCopyMessage.isInstance(msg)) {
			return onCopyRequested(PerformCopyMessage.parse(msg));
		} else {
			throw new Error(`unknown message ${JSON.stringify(msg)}`);
		}
	}

	browser.runtime.onMessage.addListener(onMessageReceived);

	register[flag] = true;
}
