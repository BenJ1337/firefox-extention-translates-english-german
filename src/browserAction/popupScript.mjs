import { WordStorageService } from '../lib/storage/WordStorageService.mjs';
import { ExtSettingsService } from '../lib/storage/ExtSettingsService.mjs';
import { TabMessageService } from '../lib/message/TabMessageService.mjs';
import { exportTableToCSV } from './export.mjs';

console.info(`popup script here...`);

const extSettingsService = new ExtSettingsService();
const tabMessageService = new TabMessageService();
const wordStorageService = new WordStorageService();

var checkbox = document.querySelector('input[name=checkbox]');
checkbox.addEventListener('change', function () {
  extSettingsService.setStatusDoubleClick(this.checked);
  let tab = browser.tabs.query({ currentWindow: true, active: true });
  tab.then(
    (tabs) => {
      if (tabs.length === 1) {
        tabMessageService.send2TabActiveDoubleClickListener(
          tabs[0],
          this.checked
        );
      } else {
        console.error(`Es wurde nicht ein Tab gefunden: ${tabs.length}`);
      }
    },
    (err) => console.error(err)
  );
});

extSettingsService
  .getStatusDoubleClick()
  .then(
    (status) => {
      console.debug(`initial Status Checkbox: ${status}`);
      checkbox.checked = status;
    },
    (err) => console.error(err)
  )
  .catch((exc) => console.error(exc));

let addWord = (word) => {
  var table = document.getElementById('word-list');
  var tr = document.createElement('tr');
  tr.className = 'entry';
  table.appendChild(tr);

  let text = word['text'];
  let anzahl = word['details']['anzahl'];
  let erstmals = word['details']['first'];
  let letztmals = word['details']['last'];
  let erstmalsDatum = erstmals.toLocaleDateString('de-de');
  let letztmalsDatum = letztmals.toLocaleDateString('de-de');
  let erstmalsUhrzeit = erstmals.toLocaleTimeString('de-de');
  let letztmalsUhrzeit = letztmals.toLocaleTimeString('de-de');

  var td1 = document.createElement('td');
  td1.appendChild(document.createTextNode(`${text}`));
  tr.appendChild(td1);
  var td2 = document.createElement('td');
  td2.appendChild(document.createTextNode(`${anzahl}`));
  tr.appendChild(td2);
  var td3 = document.createElement('td');
  td3.appendChild(
    document.createTextNode(`${erstmalsDatum} ${erstmalsUhrzeit}`)
  );
  tr.appendChild(td3);
  var td4 = document.createElement('td');
  if (erstmals.valueOf() !== letztmals.valueOf()) {
    td4.appendChild(
      document.createTextNode(`${letztmalsDatum} ${letztmalsUhrzeit}`)
    );
    tr.appendChild(td4);
  }
};

(await wordStorageService.getWords()).forEach(addWord);

var resetBtn = document.getElementById('reset-list');
resetBtn.textContent = browser.i18n.getMessage('btnResetWords');
resetBtn.addEventListener('click', function () {
  wordStorageService.resetWords();
  var table = document.getElementById('word-list');
  while (table.lastChild && table.lastChild.className == 'entry') {
    table.removeChild(table.lastChild);
  }
});

var exportBtn = document.getElementById('export-list');
exportBtn.addEventListener('click', function () {
  console.log('Export');
  exportTableToCSV(null, 'words');
});
