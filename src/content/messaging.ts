import {LinksCopiedMessage, Message, Subject} from "../common/messages";
import {onCopyRequested} from "./copying";

export async function onMessageReceived(msg: Message): Promise<LinksCopiedMessage> {
    if (msg.subject === Subject.copyRequested) {
        return onCopyRequested(msg);
    } else {
        throw new Error(`unknown message ${JSON.stringify(msg)}`);
    }
}
