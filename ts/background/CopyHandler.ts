import {browser, Menus, Tabs} from "webextension-polyfill-ts";
import {LinksCopiedMessage} from "../common/LinksCopiedMessage";
import {PerformCopyMessage} from "../common/PerformCopyMessage";
import {Settings} from "../common/Settings";

export class CopyHandler {
	private static notify(title: string, message: string) {
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

	public arrangeCopy(contextMenuInfo: Menus.OnClickData, tab?: Tabs.Tab) {
		this.isWindows.then(isWindows => {
			if (tab == null || tab.id == null) {
				throw new Error(`received context menu ${JSON.stringify(contextMenuInfo)} and tab ${JSON.stringify(tab)}?`);
			}

			browser.tabs.sendMessage(tab.id, new PerformCopyMessage(isWindows), {
				frameId: contextMenuInfo.frameId
			}).then(CopyHandler.prototype.afterCopying.bind(this));
		});
	}

	private afterCopying(data: any) {
		if (LinksCopiedMessage.isInstance(data)) {
			const response = LinksCopiedMessage.parse(data);

			Settings.load().then(settings => {
				if (response.linksCopied > 0) {
					if (settings.popupSuccess) {
						CopyHandler.notify("", `Copied ${response.linksCopied} links to clipboard.`);
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
