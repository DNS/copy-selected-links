import {Menus, Tabs, browser} from "webextension-polyfill-ts";
import {arrangeCopy} from "./copy";

const CONTEXT_MENU_ID = "copySelectedLinks_CopySelectedLinks";

async function createContextMenu(options: Menus.CreateCreatePropertiesType): Promise<void> {
    return new Promise((resolve, reject) => {
        browser.contextMenus.create(options, (): void => {
            if (browser.runtime.lastError == null) {
                resolve();
            } else {
                reject(new Error(browser.runtime.lastError.message));
            }
        });
    });
}

async function signalTabForCopying(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): Promise<void> {
    if (tab == null) {
        throw new Error("invoked context menu without a tab?");
    }

    switch (contextMenuInfo.menuItemId) {
        case CONTEXT_MENU_ID:
            await arrangeCopy(tab, contextMenuInfo.frameId, contextMenuInfo.linkUrl);
            break;
        default:
            throw new Error(`received unknown context menu command: ${contextMenuInfo.menuItemId}`);
    }
}

export function registerMenu(): void {
    browser.contextMenus.onClicked.addListener((data, tab) => void signalTabForCopying(data, tab).catch(console.error));

    createContextMenu({
        contexts: ["selection", "link"],
        documentUrlPatterns: ["*://*/*", "file:///*"],
        id: CONTEXT_MENU_ID,
        title: "Copy selected links",
        type: "normal"
    }).catch(console.error);
}
