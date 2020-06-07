import {JsonValue} from "type-fest";

export enum Subject {
    copyRequested = "copyRequested",
    linksCopied = "linksCopied"
}

export type Sendable<S extends Subject, T extends Record<keyof T, JsonValue>> = {
    subject: S;
} & T;

export class LinksCopiedMessage implements Sendable<Subject.linksCopied, LinksCopiedMessage> {
    public readonly subject = Subject.linksCopied;

    public constructor(public readonly linksCopied: number) {}
}

export class PerformCopyMessage implements Sendable<Subject.copyRequested, PerformCopyMessage> {
    public readonly subject = Subject.copyRequested;

    public constructor(public readonly isWindows: boolean, public readonly clickedLinkUrl: string | null) {}
}

export type Message = PerformCopyMessage | LinksCopiedMessage;
