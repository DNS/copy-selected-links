import {JsonObject} from "./JsonObject";
import {browser} from "webextension-polyfill-ts";

export class Settings {
    public static async load(): Promise<Settings> {
        const raw = await this.loadRaw();
        return new Settings().assimilate(raw);
    }

    public static async validate(): Promise<boolean> {
        const [parsed, raw] = await Promise.all<Settings, JsonObject<Settings>>([Settings.load(), Settings.loadRaw()]);

        if (parsed.equals(raw)) {
            return true;
        } else {
            await parsed.save();
            return false;
        }
    }

    private static async loadRaw(): Promise<JsonObject<Settings>> {
        const data = await browser.storage.sync.get(new Settings());
        return data as JsonObject<Settings>;
    }

    private constructor(public popupSuccess = false, public popupFail = true, public finalNewline = true) {}

    public async save(): Promise<void> {
        return browser.storage.sync.set(this);
    }

    public equals(data: unknown): boolean {
        const other = data as Settings;
        return this.popupSuccess === other.popupSuccess && this.popupFail === other.popupFail && this.finalNewline === other.finalNewline;
    }

    private assimilate(data: any): this {
        if (typeof data.popupSuccess === "boolean") {
            this.popupSuccess = data.popupSuccess;
        }
        if (typeof data.popupFail === "boolean") {
            this.popupFail = data.popupFail;
        }
        if (typeof data.finalNewline === "boolean") {
            this.finalNewline = data.finalNewline;
        }
        return this;
    }
}
