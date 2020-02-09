import {ContextMenuHandler} from "./background/ContextMenuHandler";
import {SettingsValidator} from "./background/SettingsValidator";

SettingsValidator.guard();
new ContextMenuHandler().register();
