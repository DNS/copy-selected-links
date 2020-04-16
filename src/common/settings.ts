import {correct, SettingsDto, load, save} from "./settings-storage";
import equal from "fast-deep-equal";

export class Settings {
    public static async load(): Promise<Settings> {
        const raw = await load();
        const dto = correct(raw);
        return new Settings(dto);
    }

    public static async validate(): Promise<boolean> {
        const raw = await load();
        const validated = correct(raw);

        if (equal(validated, raw)) {
            return true;
        } else {
            await save(validated);
            return false;
        }
    }

    private constructor(private readonly dto: SettingsDto) {}

    public async save(update?: Partial<SettingsDto>): Promise<void> {
        if (update != null) {
            Object.assign(this.dto, update);
        }
        return save(this.dto);
    }

    public get<P extends keyof SettingsDto>(property: P): Readonly<SettingsDto[P]> {
        return this.dto[property];
    }
}
