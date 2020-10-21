import {load} from "./common/settings/settings";
import {provideFailurePopup, provideSuccessPopup} from "./options/notifications";
import {provideFinalNewline} from "./options/general";
import {provideDeduplicateHrefs, provideIncludeCommandTarget} from "./options/gathering";

load()
    .then(settings => {
        provideFinalNewline(settings);

        provideIncludeCommandTarget(settings);
        provideDeduplicateHrefs(settings);

        provideSuccessPopup(settings);
        provideFailurePopup(settings);
    })
    .catch(console.error);
