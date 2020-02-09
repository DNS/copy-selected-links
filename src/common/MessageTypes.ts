import {JsonObject} from "./JsonObject";
import {LinksCopiedMessage} from "./LinksCopiedMessage";
import {PerformCopyMessage} from "./PerformCopyMessage";
import {Subject} from "./Subject";

export type Sendable<S extends Subject, T extends JsonObject<T>> = {
    subject: S
} & T;

export type Message = Sendable<Subject.COPY_REQUESTED, PerformCopyMessage>
    | Sendable<Subject.LINKS_COPIED, LinksCopiedMessage>;
