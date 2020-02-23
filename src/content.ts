import {LinksCopiedMessage} from "./common/messaging/LinksCopiedMessage";
import {Message} from "./common/messaging/MessageTypes";
import {PerformCopyMessage} from "./common/messaging/PerformCopyMessage";
import {Settings} from "./common/Settings";
import {Subject} from "./common/messaging/Subject";
import {browser} from "webextension-polyfill-ts";
import {copyToClipboard} from "./content/ClipboardUtils";

const flag = Symbol.for("copy-selected-links-script-injection");
const register = window as {
    [flag]?: true;
};

async function onCopyRequested(msg: PerformCopyMessage): Promise<LinksCopiedMessage> {
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

async function onMessageReceived(msg: Message): Promise<LinksCopiedMessage> {
    if (msg.subject === Subject.COPY_REQUESTED) {
        return onCopyRequested(msg);
    } else {
        throw new Error(`unknown message ${JSON.stringify(msg)}`);
    }
}

if (register[flag] == null) {
    browser.runtime.onMessage.addListener(onMessageReceived);

    register[flag] = true;
}
