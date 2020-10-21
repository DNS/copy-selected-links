import {load} from "./common/settings/settings";
import {provideFailurePopup, provideSuccessPopup} from "./options/notifications";
import {provideFinalNewline} from "./options/general";

load()
    .then(settings => {
        provideSuccessPopup(settings);
        provideFailurePopup(settings);
        provideFinalNewline(settings);
    })
    .catch(console.error);
