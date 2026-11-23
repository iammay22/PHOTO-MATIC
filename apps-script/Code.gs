// PHOTO-MATIC 數據後台：把網頁送來的事件寫進 events 分頁
// 部署：部署 → 新增部署作業 → 網頁應用程式，執行身分選自己，存取權選「所有人」
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(5000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('events');
    sheet.appendRow([new Date(), d.session || '', d.event || '', d.value || '', d.device || '', d.source || '']);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('alive');
}
