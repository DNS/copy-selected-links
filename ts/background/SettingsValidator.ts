import {browser} from "webextension-polyfill-ts";
import {Settings} from "../common/Settings";

export class SettingsValidator {
	public static guard() {
		browser.runtime.onInstalled.addListener(SettingsValidator.onInstall);
	}

	private static onInstall() {
		browser.storage.sync.get(Settings.shim()).then((data: any) => {
			const settings = Settings.parse(data);

			if (!settings.equals(data)) {
				settings.save().then(browser.runtime.openOptionsPage.bind(browser.runtime));
			}
		});
	}
}
