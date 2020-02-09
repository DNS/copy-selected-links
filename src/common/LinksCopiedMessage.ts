export class LinksCopiedMessage {
	private static readonly SUBJECT = "linksCopied";

	public static parse(data: any) {
		if (typeof data.linksCopied === "number") {
			return new LinksCopiedMessage(data.linksCopied);
		} else {
			throw new Error(`invalid message ${data}`);
		}
	}

	public static isInstance(data: any) {
		return this.SUBJECT === data.subject;
	}

	private readonly subject = LinksCopiedMessage.SUBJECT;

	public constructor(public readonly linksCopied: number) {}
}
