export class TabMessageService {
  send2TabActiveDoubleClickListener = async (tab, activate) => {
    console.debug(`Tab: ${JSON.stringify(tab)}`);
    console.debug(`Activate translation with doubleclick ${activate}`);
    browser.tabs
      .sendMessage(tab.id, {
        doppelKlick: activate,
      })
      .then(
        (resp) => console.info(`Status Listener: ${resp.stausListener}`),
        (err) => console.error(`Error while sending Message to Tab ${err}`)
      )
      .catch((err) =>
        console.error(`Exception while sending Message to Tab ${err}`)
      );
  };

  recieveActiveDoubleClickListener = async (
    listenerActive,
    request,
    sender,
    sendResponse,
    uebersetze
  ) => {
    console.debug(sender);
    console.info(`Add/remove listener: ${request.doppelKlick}`);
    console.info(`Exists listener: ${listenerActive.value}`);
    if (request.doppelKlick != listenerActive.value) {
      if (request.doppelKlick) {
        console.debug('Add doubleclick listener hinzu');
        document.addEventListener('dblclick', uebersetze);
        listenerActive.value = true;
      } else {
        console.debug('remove doubleclick listener');
        document.removeEventListener('dblclick', uebersetze);
        listenerActive.value = false;
      }
    }
    sendResponse({ stausListener: listenerActive.value });
  };
}
