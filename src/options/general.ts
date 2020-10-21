import {Settings, write} from "../common/settings/io";

export function provideFinalNewline(settings: Settings): void {
    const finalNewlineCheckbox = document.getElementById("finalNewline") as HTMLInputElement;
    finalNewlineCheckbox.checked = settings.finalNewline;

    finalNewlineCheckbox.addEventListener("change", () => {
        write({
            finalNewline: finalNewlineCheckbox.checked
        }).catch(console.error);
    });
}
