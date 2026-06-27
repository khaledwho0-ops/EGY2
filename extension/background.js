// EAL Cognitive Shield — background service worker.
// Adds a right-click "Check this claim with EAL" menu; hands the selection to
// the in-page content script, which renders the One-Law verdict inline.

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "eal-check",
    title: "Check this claim with EAL · تحقّق من الادعاء",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "eal-check" && info.selectionText && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: "EAL_CHECK", claim: info.selectionText });
  }
});
