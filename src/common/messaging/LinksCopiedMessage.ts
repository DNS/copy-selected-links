import {Sendable} from "./MessageTypes";
import {Subject} from "./Subject";

export class LinksCopiedMessage implements Sendable<Subject.LINKS_COPIED, LinksCopiedMessage> {
    public readonly subject = Subject.LINKS_COPIED;

    public constructor(public readonly linksCopied: number) {}
}
