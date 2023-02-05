import { LISTENER_KEY } from './konstanten.mjs';
import { ExtSettingsService } from './storage/ExtSettingsService.mjs';
import { TabMessageService } from './message/TabMessageService.mjs';
import { ExtensionMessageService } from './message/ExtensionMessageService.mjs';
import { getSelectedText } from './contentAPI/contentUtil.mjs';

export function main() {
  console.info(`content script here: ${window.location.hostname}`);

  const extSettingsService = new ExtSettingsService();
  const tabMessageService = new TabMessageService();
  const extensionMessageService = new ExtensionMessageService();

  let uebersetze = (event) => {
    extensionMessageService.sendTextToWindow(getSelectedText());
  };

  let listenerActive = document.createAttribute(LISTENER_KEY);
  listenerActive.value = false;

  extSettingsService.getStatusDoubleClick().then((status) => {
    if (status) {
      document.addEventListener('dblclick', uebersetze);
      listenerActive.value = true;
    }
  });

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    tabMessageService.recieveActiveDoubleClickListener(
      listenerActive,
      request,
      sender,
      sendResponse,
      uebersetze
    );
    return true; // send resp async
  });
}
