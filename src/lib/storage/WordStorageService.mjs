export class WordStorageService {
  #KEY_WORDS = 'words';
  #STORAGE_KEY_WORDS = 'wordsStore';

  #getWordStore = async () => {
    let wordsObjs = await browser.storage.local.get(this.#STORAGE_KEY_WORDS);
    let obj = { words: {} };
    if (Object.hasOwn(wordsObjs, this.#STORAGE_KEY_WORDS)) {
      obj = wordsObjs[this.#STORAGE_KEY_WORDS];
    }
    console.log(obj);
    return obj;
  };

  appendWord = async (word) => {
    const obj = await this.#getWordStore();
    let wordObj = { anzahl: 1, first: new Date(), last: new Date() };
    if (Object.hasOwn(obj[this.#KEY_WORDS], word)) {
      wordObj = obj[this.#KEY_WORDS][word];
      let anzahl = wordObj['anzahl'];
      console.log(anzahl);
      wordObj['anzahl'] = ++anzahl;
      wordObj['last'] = new Date();
    }
    obj[this.#KEY_WORDS][word] = wordObj;
    let tmp = {};
    tmp[this.#STORAGE_KEY_WORDS] = obj;
    browser.storage.local.set(tmp);
  };

  getWords = async () => {
    const obj = await this.#getWordStore();
    console.info(obj);
    let result = [];
    let words = obj[this.#KEY_WORDS];
    Object.keys(words).forEach((word) => {
      result.push({ text: word, details: words[word] });
    });
    console.log(result);
    return result;
  };

  resetWords = async () => {
    const obj = await this.#getWordStore();
    obj[this.#KEY_WORDS] = {};
    let tmp = {};
    tmp[this.#STORAGE_KEY_WORDS] = obj;
    browser.storage.local.set(tmp);
  };
}
