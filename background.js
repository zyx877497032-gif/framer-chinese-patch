function updateBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? "✓" : "" });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? "#35a853" : "#777985" });
  chrome.action.setTitle({ title: enabled ? "Framer 中文补丁：已开启" : "Framer 中文补丁：已关闭" });
}

chrome.storage.sync.get({ enabled: true }, ({ enabled }) => updateBadge(enabled));
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) updateBadge(changes.enabled.newValue);
});
