import {Runtime, browser} from "webextension-polyfill-ts";
import {Settings} from "../common/Settings";
import OnInstalledDetailsType = Runtime.OnInstalledDetailsType;

export class SettingsValidator {
    public static guard(): void {
        browser.runtime.onInstalled.addListener(SettingsValidator.onInstall);
    }

    private static onInstall(details: OnInstalledDetailsType): void {
        if (details.reason === "install" || details.reason === "update") {
            browser.storage.sync.get(Settings.shim()).then((data: any) => {
                const settings = Settings.parse(data);

                if (!settings.equals(data)) {
                    settings.save().then(browser.runtime.openOptionsPage.bind(browser.runtime));
                }
            });
        }
    }
}