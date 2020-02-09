import {Sendable} from "./MessageTypes";
import {Subject} from "./Subject";

export class PerformCopyMessage implements Sendable<Subject.COPY_REQUESTED, PerformCopyMessage> {
    public readonly subject = Subject.COPY_REQUESTED;

    public constructor(public readonly isWindows: boolean) {}
}
