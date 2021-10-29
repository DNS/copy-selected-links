import {CopyRequestedMessage, LinksRequestedMessage} from "../common/messages";
import {Settings} from "../common/settings/io";

export function getHrefs(msg: CopyRequestedMessage | LinksRequestedMessage, settings: Settings): string[] {
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
