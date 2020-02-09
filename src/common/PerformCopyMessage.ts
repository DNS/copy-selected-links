export class PerformCopyMessage {
    private static readonly SUBJECT = "copyRequested";

    public static parse(data: any) {
        if (typeof data.isWindows === "boolean") {
            return new PerformCopyMessage(data.isWindows);
        } else {
            throw new Error(`invalid message ${data}`);
        }
    }

    public static isInstance(data: any) {
        return this.SUBJECT === data.subject;
    }

    private readonly subject = PerformCopyMessage.SUBJECT;

    public constructor(public readonly isWindows: boolean) {}
}
