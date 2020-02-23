import {browser, Menus, Tabs} from "webextension-polyfill-ts";
import {Message} from "../common/messaging/MessageTypes";
import {PerformCopyMessage} from "../common/messaging/PerformCopyMessage";
import {Subject} from "../common/messaging/Subject";
import {Settings} from "../common/Settings";

export class CopyHandler {
    private static notify(title: string, message: string): void {
        browser.notifications.create({
            iconUrl: "/images/icon-128.png",
            message: message,
            title: title,
            type: "basic"
        });
    }

    private readonly isWindows: Promise<boolean>;

    public constructor() {
        this.isWindows = browser.runtime.getPlatformInfo().then(platformInfo => {
            return platformInfo.os === "win";
        });
    }

    public arrangeCopy(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): void {
        this.isWindows.then(isWindows => {
            if (tab == null || tab.id == null) {
                throw new Error(`received context menu ${JSON.stringify(contextMenuInfo)} and tab ${JSON.stringify(tab)}?`);
            }
            const tabId = tab.id;

            // this throws an error if the content script doesnt return a jsonable result
            // we cant guarantee the result of the content script because of bundling
            browser.tabs
                .executeScript(tabId, {
                    allFrames: true,
                    file: browser.extension.getURL("content.js"),
                    runAt: "document_end"
                })
                .catch(() => undefined)
                .then(() =>
                    browser.tabs.sendMessage(tabId, new PerformCopyMessage(isWindows), {
                        frameId: contextMenuInfo.frameId
                    })
                )
                .then(CopyHandler.prototype.afterCopying.bind(this));
        });
    }

    private afterCopying(data: Message): void {
        if (data.subject === Subject.LINKS_COPIED) {
            Settings.load().then(settings => {
                if (data.linksCopied > 0) {
                    if (settings.popupSuccess) {
                        CopyHandler.notify("", `Copied ${data.linksCopied} links to clipboard.`);
                    }
                } else {
                    if (settings.popupFail) {
                        CopyHandler.notify("", "No links found.");
                    }
                }
            });
        } else {
            throw new Error(`unknown response ${JSON.stringify(data)}`);
        }
    }
}
