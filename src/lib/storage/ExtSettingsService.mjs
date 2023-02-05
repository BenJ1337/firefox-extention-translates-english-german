export class ExtSettingsService {
  #STORAGE_KEY_DOPPELKLICK_AKTIV = 'doppelKlickActive';

  setStatusDoubleClick = async (val) => {
    console.debug(`SETTER: Translate with doubleclick: ${val}`);
    let setting = {};
    setting[this.#STORAGE_KEY_DOPPELKLICK_AKTIV] = val;
    browser.storage.local.set(setting);
  };

  getStatusDoubleClick = async () => {
    const status = (
      await browser.storage.local.get(this.#STORAGE_KEY_DOPPELKLICK_AKTIV)
    )[this.#STORAGE_KEY_DOPPELKLICK_AKTIV];
    console.debug(`GETTER: Translate with doubleclick: ${status}`);
    return status;
  };
}
