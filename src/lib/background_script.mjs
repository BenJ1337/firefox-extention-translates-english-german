import { ExtensionMessageService } from './message/ExtensionMessageService.mjs';
import {
  showUebersetzung,
  createWindow,
} from './backgroundAPI/backgroundUtil.mjs';

console.info('backgroud script here...');
const extensionMessageService = new ExtensionMessageService();

browser.menus.create({
  id: 'log-selection',
  title: "Übersetze '%s'",
  contexts: ['selection'],
});

let window = null;

let openWindow = async () => {
  if (window == null) {
    await createWindow((winId) => {
      if (window.id == winId) {
        window = null;
      }
      console.info(`Closed window: ${winId}`);
    })
      .then(
        (win) => {
          window = win;
        },
        (err) => console.error(err)
      )
      .catch((exc) => console.error(exc));
  } else {
    console.log(`Existing Window Id: ${window.id}`);
  }
};

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'log-selection') {
    console.info(info.selectionText);
    openWindow().then(() => {
      showUebersetzung(info.selectionText.trim(), window);
    });
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  openWindow().then(() => {
    extensionMessageService.recieveText(request, sender, sendResponse, window);
  });
  return true; // send resp async
});
