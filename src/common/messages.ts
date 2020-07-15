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

    public constructor(public readonly isWindows: boolean, public readonly externalContextUrl: string | null) {}
}

export type Message = PerformCopyMessage | LinksCopiedMessage;

function isMessage(value: unknown): value is Message {
    return (
        typeof value == "object" &&
        value != null &&
        "subject" in value &&
        (Object.values(Subject) as unknown[]).includes((value as Record<string, unknown>).subject)
    );
}

export function asMessage(value: unknown): Message {
    if (isMessage(value)) {
        return value;
    } else {
        throw new Error(`${JSON.stringify(value)} is not a message`);
    }
}
