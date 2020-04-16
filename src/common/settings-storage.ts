import {JsonValue} from "type-fest";
import {browser} from "webextension-polyfill-ts";
import {sanitize, Spec} from "./copying";
import ow from "ow";

const defaults = Object.freeze({
    finalNewline: true,
    popupFail: true,
    popupSuccess: false
});

export type SettingsDto = typeof defaults;

const spec: Spec<SettingsDto> = {
    finalNewline: ow.boolean,
    popupFail: ow.boolean,
    popupSuccess: ow.boolean
};

export async function load(): Promise<Record<keyof SettingsDto, JsonValue>> {
    const json = await browser.storage.sync.get(defaults);
    return json as Record<keyof SettingsDto, JsonValue>;
}

export async function save(dto: SettingsDto): Promise<void> {
    return browser.storage.sync.set(dto);
}

export function correct(raw: Record<keyof SettingsDto, JsonValue>): SettingsDto {
    return sanitize(raw, spec, defaults);
}
