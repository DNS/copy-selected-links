import {JsonValue} from "type-fest";
import {browser} from "webextension-polyfill-ts";
import {bool, sanitize} from "./validation";

const spec = {
    finalNewline: bool(true),
    popupFail: bool(true),
    popupSuccess: bool(false)
};

export type Settings = {
    readonly [P in keyof typeof spec]: ReturnType<typeof spec[P]>;
};

export function isSetting(key: string): key is keyof Settings {
    return key in spec;
}

export async function read(): Promise<Record<keyof Settings, JsonValue>> {
    const json = await browser.storage.sync.get(Object.keys(spec));
    return json as Record<keyof Settings, JsonValue>;
}

export async function write(dto: Partial<Settings>): Promise<void> {
    return browser.storage.sync.set(dto);
}

export function correct(raw: Record<keyof Settings, JsonValue>): Settings {
    return sanitize<Settings>(raw, spec);
}