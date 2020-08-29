import {copied, CopiedMessage, RequestedMessage} from "../common/messages";
import {load} from "../common/settings/settings";
import {copyToClipboard} from "./clipboard";

function getHrefs(msg: RequestedMessage): string[] {
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

export async function onCopyRequested(msg: RequestedMessage): Promise<CopiedMessage> {
    const hrefs = getHrefs(msg);

    if (hrefs.length > 0) {
        const settings = await load();
        const newline = msg.isWindows ? "\r\n" : "\n";
        const joined = hrefs.join(newline);

        await copyToClipboard(settings.finalNewline ? joined + newline : joined);
    }

    return copied(hrefs.length);
}
