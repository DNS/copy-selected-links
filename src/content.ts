import {LinksCopiedMessage, Message, PerformCopyMessage, Subject} from "./common/messages";
import {browser} from "webextension-polyfill-ts";
import {load} from "./common/settings/settings";
import {copyToClipboard} from "./content/clipboard";

const flag = Symbol.for("copy-selected-links-script-injection");
const register = window as {
    [flag]?: true;
};

function getHrefs(msg: PerformCopyMessage): string[] {
    const selection = getSelection();

    if (selection == null) {
        throw new Error("selection disappeared?");
    }

    const hrefs = Array.from(document.links)
        .filter(link => selection.containsNode(link, true))
        .map(link => link.href);

    if (msg.externalContextUrl != null) {
        // people probably drag from start to end
        // so the clicked node is probably at the end
        hrefs.push(msg.externalContextUrl);
    }

    return hrefs.filter(href => href.trim() !== "");
}

async function onCopyRequested(msg: PerformCopyMessage): Promise<LinksCopiedMessage> {
    const hrefs = getHrefs(msg);

    if (hrefs.length > 0) {
        const settings = await load();
        const newline = msg.isWindows ? "\r\n" : "\n";
        const joined = hrefs.join(newline);

        await copyToClipboard(settings.finalNewline ? joined + newline : joined);
    }

    return new LinksCopiedMessage(hrefs.length);
}

async function onMessageReceived(msg: Message): Promise<LinksCopiedMessage> {
    if (msg.subject === Subject.copyRequested) {
        return onCopyRequested(msg);
    } else {
        throw new Error(`unknown message ${JSON.stringify(msg)}`);
    }
}

if (register[flag] == null) {
    browser.runtime.onMessage.addListener(onMessageReceived);

    register[flag] = true;
}
