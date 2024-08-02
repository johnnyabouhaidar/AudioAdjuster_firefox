let currentTabId;

browser.browserAction.onClicked.addListener(async (tab) => {
  currentTabId = tab.id;
  await browser.tabs.executeScript(currentTabId, { file: "content.js" });
});