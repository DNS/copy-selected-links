import {Settings, write} from "./common/settings/io";
import {load} from "./common/settings/settings";

function provideSuccessPopup(settings: Settings): void {
    const popupSuccessCheckbox = document.getElementById("popupSuccess") as HTMLInputElement;
    popupSuccessCheckbox.checked = settings.popupSuccess;

    popupSuccessCheckbox.addEventListener("change", () => {
        write({
            popupSuccess: popupSuccessCheckbox.checked
        }).catch(console.error);
    });
}

function provideFailurePopup(settings: Settings): void {
    const popupFailCheckbox = document.getElementById("popupFail") as HTMLInputElement;
    popupFailCheckbox.checked = settings.popupFail;

    popupFailCheckbox.addEventListener("change", () => {
        write({
            popupFail: popupFailCheckbox.checked
        }).catch(console.error);
    });
}

function provideFinalNewline(settings: Settings): void {
    const finalNewlineCheckbox = document.getElementById("finalNewline") as HTMLInputElement;
    finalNewlineCheckbox.checked = settings.finalNewline;

    finalNewlineCheckbox.addEventListener("change", () => {
        write({
            finalNewline: finalNewlineCheckbox.checked
        }).catch(console.error);
    });
}

load()
    .then(settings => {
        provideSuccessPopup(settings);
        provideFailurePopup(settings);
        provideFinalNewline(settings);
    })
    .catch(console.error);
