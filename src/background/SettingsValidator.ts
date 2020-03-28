import {Runtime, browser} from "webextension-polyfill-ts";
import {Settings} from "../common/Settings";
import OnInstalledDetailsType = Runtime.OnInstalledDetailsType;

export class SettingsValidator {
    public static guard(): void {
        browser.runtime.onInstalled.addListener(details => void SettingsValidator.onInstall(details).catch(console.error));
    }

    private static async onInstall(details: OnInstalledDetailsType): Promise<void> {
        if (details.reason === "install" || details.reason === "update") {
            const valid = await Settings.validate();
            return valid ? undefined : browser.runtime.openOptionsPage();
        }
    }
}
