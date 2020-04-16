import {Settings} from "./common/settings";

function provideSuccessPopup(settings: Settings): void {
    const popupSuccessCheckbox = document.getElementById("popupSuccess") as HTMLInputElement;
    popupSuccessCheckbox.checked = settings.get("popupSuccess");

    popupSuccessCheckbox.addEventListener("change", () => {
        settings
            .save({
                popupSuccess: popupSuccessCheckbox.checked
            })
            .catch(console.error);
    });
}

function provideFailurePopup(settings: Settings): void {
    const popupFailCheckbox = document.getElementById("popupFail") as HTMLInputElement;
    popupFailCheckbox.checked = settings.get("popupFail");

    popupFailCheckbox.addEventListener("change", () => {
        settings
            .save({
                popupFail: popupFailCheckbox.checked
            })
            .catch(console.error);
    });
}

function provideFinalNewline(settings: Settings): void {
    const finalNewlineCheckbox = document.getElementById("finalNewline") as HTMLInputElement;
    finalNewlineCheckbox.checked = settings.get("finalNewline");

    finalNewlineCheckbox.addEventListener("change", () => {
        settings
            .save({
                finalNewline: finalNewlineCheckbox.checked
            })
            .catch(console.error);
    });
}

Settings.load()
    .then(settings => {
        provideSuccessPopup(settings);
        provideFailurePopup(settings);
        provideFinalNewline(settings);
    })
    .catch(console.error);
