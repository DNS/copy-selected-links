import {browser, Menus, Tabs} from "webextension-polyfill-ts";
import {CopyHandler} from "./CopyHandler";

const CONTEXT_MENU_ID = "copySelectedLinks_CopySelectedLinks";

export class ContextMenuHandler {
    private static checkError(): void {
        if (browser.runtime.lastError == null) {
            return;
        }

        const errorMsg = browser.runtime.lastError.message;

        if (errorMsg === "Cannot create item with duplicate id " + CONTEXT_MENU_ID) {
            // ignore
            // TODO find some kind of one-off trigger to register contextmenu
        } else {
            throw new Error(errorMsg);
        }
    }

    private readonly copyHandler = new CopyHandler();

    public register(): void {
        browser.contextMenus.onClicked.addListener(ContextMenuHandler.prototype.onContextMenuClicked.bind(this));

        browser.contextMenus.create(
            {
                contexts: ["selection"],
                documentUrlPatterns: ["*://*/*", "file:///*"],
                id: CONTEXT_MENU_ID,
                title: "Copy selected links",
                type: "normal"
            },
            ContextMenuHandler.checkError
        );
    }

    private onContextMenuClicked(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab): void {
        if (contextMenuInfo.menuItemId === CONTEXT_MENU_ID) {
            this.copyHandler.arrangeCopy(contextMenuInfo, tab);
        } else {
            throw new Error(`received context menu ${JSON.stringify(contextMenuInfo)} and tab ${JSON.stringify(tab)}?`);
        }
    }
}
