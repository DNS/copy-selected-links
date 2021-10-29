import {copied, CopiedMessage, CopyRequestedMessage, linksPicked, LinksPickedMessage, LinksRequestedMessage} from "../common/messages";
import {load} from "../common/settings/settings";
import {copyToClipboard} from "./clipboard";
import {getHrefs} from "./selection";

export async function onCopyRequested(msg: CopyRequestedMessage): Promise<CopiedMessage> {
    const settings = await load();

    const hrefs = getHrefs(msg, settings);

    if (hrefs.length > 0) {
        const newline = msg.isWindows ? "\r\n" : "\n";
        const joined = hrefs.join(newline);

        await copyToClipboard(settings.finalNewline ? joined + newline : joined);
    }

    return copied(hrefs.length);
}

export async function onLinksRequested(msg: LinksRequestedMessage): Promise<LinksPickedMessage> {
    const settings = await load();
    const hrefs = getHrefs(msg, settings);
    return linksPicked(hrefs);
}
