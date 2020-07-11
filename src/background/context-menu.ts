import {Menus, Tabs, browser} from "webextension-polyfill-ts";
import {arrangeCopy} from "./copy";

const CONTEXT_MENU_ID = "copySelectedLinks_CopySelectedLinks";

function checkError(): void {
    if (browser.runtime.lastError == null) {
        return;
    }

    const errorMsg = browser.runtime.lastError.message;

    if (errorMsg === `Cannot create item with duplicate id ${CONTEXT_MENU_ID}`) {
        // ignore
        // TODO find some kind of one-off trigger to register contextmenu
    } else {
        throw new Error(errorMsg);
    }
}

async function onClick(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): Promise<void> {
    switch (contextMenuInfo.menuItemId) {
        case CONTEXT_MENU_ID:
            if (tab == null) {
                throw new Error("invoked context menu without a tab?");
            }
            await arrangeCopy(tab, contextMenuInfo.frameId, contextMenuInfo.linkUrl);
            break;
        default:
            throw new Error(`received unknown context menu command: ${contextMenuInfo.menuItemId}`);
    }
}

export function registerMenu(): void {
    browser.contextMenus.onClicked.addListener((data, tab) => void onClick(data, tab).catch(console.error));

    browser.contextMenus.create(
        {
            contexts: ["selection", "link"],
            documentUrlPatterns: ["*://*/*", "file:///*"],
            id: CONTEXT_MENU_ID,
            title: "Copy selected links",
            type: "normal"
        },
        checkError
    );
}
