import {Settings} from "./common/Settings";

function provideSuccessPopup(settings: Settings) {
	const popupSuccessCheckbox = document.getElementById("popupSuccess") as HTMLInputElement;
	popupSuccessCheckbox.checked = settings.popupSuccess;

	popupSuccessCheckbox.addEventListener("change", () => {
		settings.popupSuccess = popupSuccessCheckbox.checked;
		settings.save();
	});
}

function provideFailurePopup(settings: Settings) {
	const popupFailCheckbox = document.getElementById("popupFail") as HTMLInputElement;
	popupFailCheckbox.checked = settings.popupFail;

	popupFailCheckbox.addEventListener("change", () => {
		settings.popupFail = popupFailCheckbox.checked;
		settings.save();
	});
}

function provideFinalNewline(settings: Settings) {
	const finalNewlineCheckbox = document.getElementById("finalNewline") as HTMLInputElement;
	finalNewlineCheckbox.checked = settings.finalNewline;

	finalNewlineCheckbox.addEventListener("change", () => {
		settings.finalNewline = finalNewlineCheckbox.checked;
		settings.save();
	});
}

Settings.load().then(settings => {
	provideSuccessPopup(settings);
	provideFailurePopup(settings);
	provideFinalNewline(settings);
});
