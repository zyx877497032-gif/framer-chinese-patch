function updateBadge(enabled) {
  chrome.action.setIcon({
    path: enabled
      ? { 16: "icons/icon16-enabled.png", 32: "icons/icon32-enabled.png", 128: "icons/icon128-enabled.png" }
      : { 16: "icons/icon16.png", 32: "icons/icon32.png", 128: "icons/icon128.png" }
  });
  chrome.action.setTitle({ title: enabled ? "Framer 中文补丁：已开启" : "Framer 中文补丁：已关闭" });
}

chrome.storage.sync.get({ enabled: true }, ({ enabled }) => updateBadge(enabled));
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) updateBadge(changes.enabled.newValue);
});
