import {Runtime, browser} from "webextension-polyfill-ts";
import {Settings} from "../common/settings";
import OnInstalledDetailsType = Runtime.OnInstalledDetailsType;

async function onInstall(details: OnInstalledDetailsType): Promise<void> {
    if (details.reason === "install" || details.reason === "update") {
        const valid = await Settings.validate();
        return valid ? undefined : browser.runtime.openOptionsPage();
    }
}

export function validateSettingsOnInstall(): void {
    browser.runtime.onInstalled.addListener(details => void onInstall(details).catch(console.error));
}
