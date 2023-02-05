import { showUebersetzung } from '../backgroundAPI/backgroundUtil.mjs';

export class ExtensionMessageService {
  sendTextToWindow = async (text) => {
    browser.runtime
      .sendMessage({
        markedText: text,
      })
      .then(
        (resp) => console.info(`Antwort: ${resp.response}`),
        (err) => console.error(err)
      )
      .catch((err) => console.error(err));
    console.info('Übersetzung abgeschlossen');
  };

  recieveText = async (request, sender, sendResponse, window) => {
    console.debug(sender);
    showUebersetzung(request.markedText, window);
    return sendResponse({ response: request.markedText });
  };
}
