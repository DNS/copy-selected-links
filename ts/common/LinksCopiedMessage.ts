export class LinksCopiedMessage {
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

	private static readonly SUBJECT = "linksCopied";
	private readonly subject = LinksCopiedMessage.SUBJECT;

	public constructor(public readonly linksCopied: number) {}
}
