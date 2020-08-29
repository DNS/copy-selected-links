const topics = {
    copyRequested: "copyRequested",
    linksCopied: "linksCopied"
} as const;

export type RequestedMessage = {subject: typeof topics.copyRequested; isWindows: boolean; externalContextUrl: string | null};
export function copyRequested(isWindows: boolean, externalContextUrl: string | null): RequestedMessage {
    return {
        externalContextUrl,
        isWindows,
        subject: topics.copyRequested
    };
}

export type CopiedMessage = {subject: typeof topics.linksCopied; linksCopied: number};
export function copied(linksCopied: number): CopiedMessage {
    return {
        linksCopied,
        subject: topics.linksCopied
    };
}

//

const subjects = Object.values(topics) as string[];

export type Message = RequestedMessage | CopiedMessage;

function hasSubject(value: {subject?: unknown}): value is {subject: string} {
    return typeof value.subject == "string";
}

function isMessage(value: unknown): value is Message {
    return typeof value == "object" && value != null && hasSubject(value) && subjects.includes(value.subject);
}

export function asMessage(value: unknown): Message {
    if (isMessage(value)) {
        return value;
    } else {
        throw new Error(`${JSON.stringify(value)} is not a message`);
    }
}
