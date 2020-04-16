import {registerMenu} from "./background/context-menu";
import {validateSettingsOnInstall} from "./background/settings-validation";

validateSettingsOnInstall();
registerMenu();
