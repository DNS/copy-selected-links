import {noop as ignore} from "ts-essentials";
import {browser, Tabs} from "webextension-polyfill-ts";
import {Message, PerformCopyMessage, Subject} from "../common/messages";
import {load} from "../common/settings/settings";

async function notify(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: "/images/icon-128.png",
        message,
        title,
        type: "basic"
    });
}

async function afterCopying(data: Message): Promise<void> {
    if (data.subject === Subject.linksCopied) {
        const settings = await load();

        if (data.linksCopied > 0) {
            if (settings.popupSuccess) {
                await notify("", `Copied ${data.linksCopied} links to clipboard.`);
            }
        } else {
            if (settings.popupFail) {
                await notify("", "No links found.");
            }
        }
    } else {
        throw new Error(`unknown response ${JSON.stringify(data)}`);
    }
}

const isWindows = browser.runtime.getPlatformInfo().then(platformInfo => platformInfo.os === "win");

export async function arrangeCopy(tab: Tabs.Tab, frameId?: number, contextualUrl?: string): Promise<void> {
    if (tab.id == null) {
        throw new Error(`received a tab without an id?`);
    }

    try {
        // this throws an error if the content script doesnt return a jsonable result
        // we cant guarantee the result of the content script because of bundling
        await browser.tabs.executeScript(tab.id, {
            allFrames: true,
            file: browser.extension.getURL("content.js"),
            runAt: "document_end"
        });
    } catch (error) {
        ignore(error);
    }

    const message = new PerformCopyMessage(await isWindows, contextualUrl ?? null);
    const response = await browser.tabs.sendMessage(tab.id, message, {frameId}).then(msg => msg as Message);

    await afterCopying(response);
}
