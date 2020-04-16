// https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
export async function copyToClipboard(text: string): Promise<void> {
    const copied = await new Promise<ClipboardEvent>(resolve => {
        const oncopy = (event: ClipboardEvent): void => {
            document.removeEventListener("copy", oncopy, true);
            event.stopImmediatePropagation();
            event.preventDefault();
            resolve(event);
        };

        document.addEventListener("copy", oncopy, true);
        document.execCommand("copy");
    });

    (copied.clipboardData as DataTransfer).setData("text/plain", text);
}
