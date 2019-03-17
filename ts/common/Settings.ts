import {browser, Tabs} from "webextension-polyfill-ts";

export class Settings {
	public static shim() {
		return new Settings();
	}

	public static parse(data: any) {
		return new Settings().assimilate(data);
	}

	public static load() {
		return browser.storage.sync.get(Settings.shim()).then(Settings.parse);
	}

	private constructor(
		public popupSuccess = false,
		public popupFail = true,
		public finalNewline = true
	) {}

	public save() {
		return browser.storage.sync.set(this);
	}

	public equals(data: any) {
		const other = data as Settings;
		return this.popupSuccess === other.popupSuccess
			&& this.popupFail === other.popupFail
			&& this.finalNewline === other.finalNewline;
	}

	private assimilate(data: any) {
		if (typeof (data.popupSuccess) === "boolean") {
			this.popupSuccess = data.popupSuccess;
		}
		if (typeof (data.popupFail) === "boolean") {
			this.popupFail = data.popupFail;
		}
		if (typeof (data.finalNewline) === "boolean") {
			this.finalNewline = data.finalNewline;
		}
		return this;
	}
}
