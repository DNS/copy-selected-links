import {registerMenu} from "./background/context-menu";
import {monitorHotkey} from "./background/hotkey";
import {validateSettingsOnInstall} from "./background/settings-validation";

validateSettingsOnInstall();
registerMenu();
monitorHotkey();
