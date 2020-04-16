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
    if (contextMenuInfo.menuItemId === CONTEXT_MENU_ID) {
        return arrangeCopy(contextMenuInfo, tab);
    } else {
        throw new Error(`received context menu ${JSON.stringify(contextMenuInfo)} and tab ${JSON.stringify(tab)}?`);
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
