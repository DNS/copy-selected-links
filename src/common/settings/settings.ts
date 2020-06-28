import equal from "fast-deep-equal";
import {browser} from "webextension-polyfill-ts";
import {correct, isSetting, read, Settings, write} from "./io";

export async function load(): Promise<Settings> {
    const raw = await read();
    return correct(raw);
}

export async function validate(): Promise<boolean> {
    const raw = await read();
    const validated = correct(raw);

    if (equal(validated, raw)) {
        return true;
    } else {
        await write(validated);
        return false;
    }
}

export function monitor(callback: (settings: Settings) => void): void {
    browser.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && Object.keys(changes).some(isSetting)) {
            load().then(callback).catch(console.error);
        }
    });
}
