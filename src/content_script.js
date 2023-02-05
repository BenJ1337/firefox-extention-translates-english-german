(async () => {
  import(chrome.runtime.getURL('./lib/content_script.mjs'))
    .then((contentScript) => contentScript.main())
    .catch((err) => console.error(err));
})();
