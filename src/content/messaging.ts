import {CopiedMessage, Message} from "../common/messages";
import {onCopyRequested} from "./copying";

export async function onMessageReceived(msg: Message): Promise<CopiedMessage> {
    if (msg.subject === "copyRequested") {
        return onCopyRequested(msg);
    } else {
        throw new Error(`unknown message ${JSON.stringify(msg)}`);
    }
}
