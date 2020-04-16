import {Menus, Tabs, browser} from "webextension-polyfill-ts";
import {Message, PerformCopyMessage, Subject} from "../common/messages";
import {Settings} from "../common/settings";
import {noop as ignore} from "ts-essentials";

async function notify(title: string, message: string): Promise<void> {
    await browser.notifications.create({
        iconUrl: "/images/icon-128.png",
        message,
        title,
        type: "basic"
    });
}

async function afterCopying(data: Message): Promise<void> {
    if (data.subject === Subject.LINKS_COPIED) {
        const settings = await Settings.load();

        if (data.linksCopied > 0) {
            if (settings.get("popupSuccess")) {
                return notify("", `Copied ${data.linksCopied} links to clipboard.`);
            }
        } else {
            if (settings.get("popupFail")) {
                return notify("", "No links found.");
            }
        }
    } else {
        throw new Error(`unknown response ${JSON.stringify(data)}`);
    }
}

const isWindows = browser.runtime.getPlatformInfo().then(platformInfo => platformInfo.os === "win");

export async function arrangeCopy(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): Promise<void> {
    if (tab == null || tab.id == null) {
        throw new Error(`received context menu ${JSON.stringify(contextMenuInfo)} and tab ${JSON.stringify(tab)}?`);
    }
    const tabId = tab.id;

    try {
        // this throws an error if the content script doesnt return a jsonable result
        // we cant guarantee the result of the content script because of bundling
        await browser.tabs.executeScript(tabId, {
            allFrames: true,
            file: browser.extension.getURL("content.js"),
            runAt: "document_end"
        });
    } catch (error) {
        ignore(error);
    }

    const response = (await browser.tabs.sendMessage(tabId, new PerformCopyMessage(await isWindows, contextMenuInfo.linkUrl ?? null), {
        frameId: contextMenuInfo.frameId
    })) as Message;

    return afterCopying(response);
}
