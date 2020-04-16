import {JsonValue} from "type-fest";

export enum Subject {
    COPY_REQUESTED = "copyRequested",
    LINKS_COPIED = "linksCopied"
}

export type Sendable<S extends Subject, T extends Record<keyof T, JsonValue>> = {
    subject: S;
} & T;

export class LinksCopiedMessage implements Sendable<Subject.LINKS_COPIED, LinksCopiedMessage> {
    public readonly subject = Subject.LINKS_COPIED;

    public constructor(public readonly linksCopied: number) {}
}

export class PerformCopyMessage implements Sendable<Subject.COPY_REQUESTED, PerformCopyMessage> {
    public readonly subject = Subject.COPY_REQUESTED;

    public constructor(public readonly isWindows: boolean, public readonly clickedLinkUrl: string | null) {}
}

export type Message = PerformCopyMessage | LinksCopiedMessage;
