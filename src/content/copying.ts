import {copied, CopiedMessage, RequestedMessage} from "../common/messages";
import {load} from "../common/settings/settings";
import {copyToClipboard} from "./clipboard";
import {Settings} from "../common/settings/io";

function getHrefs(msg: RequestedMessage, settings: Settings): string[] {
    const selection = getSelection();

    if (selection == null) {
        throw new Error("selection disappeared?");
    }

    const hrefs = Array.from(document.links)
        .filter(link => selection.containsNode(link, true))
        .map(link => link.href);

    if (settings.includeCommandTarget && msg.externalContextUrl != null) {
        // people probably drag from start to end
        // so the clicked node is probably at the end
        hrefs.push(msg.externalContextUrl);
    }

    const significant = hrefs.filter(href => href.trim() !== "");

    return settings.deduplicateHrefs ? [...new Set(significant)] : significant;
}

export async function onCopyRequested(msg: RequestedMessage): Promise<CopiedMessage> {
    const settings = await load();

    const hrefs = getHrefs(msg, settings);

    if (hrefs.length > 0) {
        const newline = msg.isWindows ? "\r\n" : "\n";
        const joined = hrefs.join(newline);

        await copyToClipboard(settings.finalNewline ? joined + newline : joined);
    }

    return copied(hrefs.length);
}
