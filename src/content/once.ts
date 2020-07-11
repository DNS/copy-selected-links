import {browser} from "webextension-polyfill-ts";
import {onMessageReceived} from "./messaging";

const flag = Symbol.for("copy-selected-links-script-injection");
const register = window as {
    [flag]?: true;
};

export function setUp(): void {
    if (register[flag] == null) {
        browser.runtime.onMessage.addListener(onMessageReceived);

        register[flag] = true;
    }
}
