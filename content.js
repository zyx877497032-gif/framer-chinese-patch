const translations = {
  "Assets": "资源", "Agent": "代理", "Style": "样式", "Type": "类型", "Yes": "是", "No": "否", "Frame": "画框", "Auto layout": "自动布局", "Hug contents": "适应内容", "Fill container": "填充容器", "Ignore auto layout": "忽略自动布局", "Start": "开始", "Distribute": "分布", "Convert": "转换", "Locate": "定位",
  "Set": "设置", "Unset": "取消设置", "Unset variable": "取消变量", "Set variable": "设置变量",
  "Set as variable": "设为变量", "Create variable": "创建变量", "Variable": "变量", "Collection": "集合",
  "Local variables": "本地变量", "Shared variables": "共享变量", "Add variable": "添加变量", "Edit variable": "编辑变量",
  "Display option": "显示选项", "Equals": "等于", "Doesn’t equal": "不等于", "Doesn't equal": "不等于",
  "Overlays": "叠加层", "Cursor": "光标", "Layers": "图层", "Pages": "页面",
  "Components": "组件", "Insert": "插入", "Layout": "布局", "Styles": "样式", "Effects": "效果",
  "Settings": "设置", "Publish": "发布", "Preview": "预览", "Share": "分享", "Design": "设计",
  "Prototype": "原型", "CMS": "内容管理", "Code": "代码", "Canvas": "画布", "Add": "添加",
  "Remove": "移除", "Duplicate": "复制", "Delete": "删除", "Rename": "重命名", "Undo": "撤销",
  "Redo": "重做", "Search": "搜索", "Close": "关闭", "Save": "保存", "Cancel": "取消", "Done": "完成",
  "Create": "创建", "Open": "打开", "Upload": "上传", "Download": "下载", "Desktop": "桌面端",
  "Tablet": "平板端", "Mobile": "移动端", "Width": "宽度", "Height": "高度", "Opacity": "不透明度",
  "Position": "位置", "Size": "尺寸", "Color": "颜色", "Font": "字体", "Typography": "字体排印", "Weight": "字重", "Spacing": "间距",
  "Padding": "内边距", "Padding top": "上内边距", "Padding right": "右内边距", "Padding bottom": "下内边距", "Padding left": "左内边距", "Gap": "间隔", "Radius": "圆角", "Shadow": "阴影", "Border": "边框",
  "Auto": "自动", "Fixed": "固定", "Fill": "填充", "Fit": "适应", "Stack": "堆栈", "Grid": "网格",
  "Visible": "可见", "Hidden": "隐藏", "Align": "对齐", "Alignment": "对齐方式", "Center": "居中",
  "Left": "左对齐", "Right": "右对齐", "Top": "顶部", "Bottom": "底部", "Direction": "方向",
  "Horizontal": "水平", "Vertical": "垂直", "Relative": "相对", "Absolute": "绝对", "Constraints": "约束", "Left & Right": "左右", "Top & Bottom": "上下", "Pin": "固定到边缘", "Pin left": "固定到左侧", "Pin right": "固定到右侧", "Pin top": "固定到顶部", "Pin bottom": "固定到底部",
  "Sizing": "尺寸调整", "Min": "最小", "Max": "最大", "Content": "内容", "Wrap": "换行",
  "Overflow": "溢出", "Clip": "裁剪", "Scroll": "滚动", "Transform": "变换", "Rotate": "旋转",
  "Scale": "缩放", "Blur": "模糊", "Transition": "过渡", "Animation": "动画", "Duration": "时长",
  "Delay": "延迟", "Ease": "缓动", "Linear": "线性", "Spring": "弹簧", "Ease in": "缓入", "Ease out": "缓出", "Ease in out": "缓入缓出", "Trigger": "触发器", "Tap": "点击",
  "Hover": "悬停", "Press": "按下", "Drag": "拖拽", "While hovering": "悬停时", "While pressing": "按下时", "Link": "链接", "URL": "网址", "Target": "目标", "Navigate to": "跳转至", "Open overlay": "打开叠加层", "Smart animate": "智能动画", "Dissolve": "溶解", "Move in": "移入", "Back": "返回", "Open in new tab": "在新标签页打开",
  "New": "新建", "Copy": "复制", "Paste": "粘贴", "Reset": "重置", "Replace": "替换", "More": "更多",
  "General": "常规", "Advanced": "高级", "Appearance": "外观", "Accessibility": "无障碍", "Interactions": "交互", "Layout settings": "布局设置", "Layer settings": "图层设置", "Text settings": "文本设置", "Fill settings": "填充设置", "Stroke": "描边", "Stroke width": "描边宽度", "Corner radius": "圆角半径",
  "Variables": "变量", "Breakpoints": "断点", "Responsive": "响应式", "Variant": "变体", "Overrides": "覆盖",
  "Instance": "实例", "Text": "文本", "RichText": "富文本", "Image": "图片", "Video": "视频",
  "Icon": "图标", "Placeholder": "占位符", "Default": "默认", "Loading": "加载中", "Error": "错误", "No fill": "无填充", "Solid": "纯色", "Gradient": "渐变", "Linear gradient": "线性渐变", "Radial gradient": "径向渐变", "Image fill": "图片填充",
  "Warning": "警告", "Learn more": "了解更多", "Fit content": "适应内容", "In view": "进入视口",
  "Scroll section": "滚动区段", "Page link": "页面链接", "Open link": "打开链接", "Show more": "显示更多", "Show less": "收起", "No results": "无结果", "Try again": "重试", "Remove override": "移除覆盖", "Reset override": "重置覆盖"
};

const originalText = new WeakMap();
const originalAttrs = new WeakMap();
const exactKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
const exactPattern = new RegExp(`^\\s*(${exactKeys.map(escapeRegExp).join("|")})\\s*$`, "i");
const wordKeys = exactKeys.filter((key) => !/\s/.test(key) && !/[’']/u.test(key));
const wordPattern = new RegExp(`\\b(${wordKeys.map(escapeRegExp).join("|")})\\b`, "g");
let enabled = true;
let customTranslations = {};
let displayMode = "zh";
let debugMode = false;
const debugStyle = document.createElement("style");
debugStyle.textContent = "[data-framer-zh-untranslated]{outline:2px dashed #f59e0b !important;outline-offset:2px !important;background:rgba(245,158,11,.08) !important;cursor:copy !important;}";
document.documentElement.appendChild(debugStyle);
let scanQueued = false;

function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"); }

function translateValue(value) {
  if (!value || typeof value !== "string") return value;
  const dictionary = { ...translations, ...customTranslations };
  const customKey = Object.keys(customTranslations).find((key) => value.trim().toLowerCase() === key.toLowerCase());
  if (customKey) return value.replace(value.trim(), customTranslations[customKey]);
  const exact = value.match(exactPattern);
  if (exact) {
    const original = exact[1];
    const key = exactKeys.find((candidate) => candidate.toLowerCase() === original.toLowerCase());
    if (key) return value.replace(original, translations[key]);
  }
  return value.replace(wordPattern, (word) => translations[word] || word);
}

function isUiElement(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
  if (element.closest("[contenteditable='true'], textarea, input, pre, code, [data-framer-canvas]")) return false;
  if (element.matches("button,[role='button'],[role='menuitem'],[role='option'],[role='tab'],[role='listbox'],[aria-label],[title],label") || element.closest("[role='menu'],[role='dialog'],[role='listbox']")) return true;
  const text = element.childNodes.length === 1 && element.firstChild.nodeType === Node.TEXT_NODE ? element.textContent.trim() : "";
  if (!text || text.length > 64 || !/[A-Za-z]/.test(text)) return false;
  if (translations[text] || Object.prototype.hasOwnProperty.call(customTranslations, text)) return true;
  return wordKeys.some((key) => new RegExp(`\\b${escapeRegExp(key)}\\b`, "i").test(text));
}

function rememberText(node, value) {
  if (!originalText.has(node)) originalText.set(node, value);
}

function translateElement(element) {
  if (!isUiElement(element) || element.dataset.framerZhTranslated === "1") return;
  let changed = false;
  for (const attribute of ["aria-label", "title", "placeholder"]) {
    const value = element.getAttribute(attribute);
    const translated = translateValue(value);
    if (translated && translated !== value) {
      if (!originalAttrs.has(element)) originalAttrs.set(element, {});
      const attrs = originalAttrs.get(element);
      if (!(attribute in attrs)) attrs[attribute] = value;
      element.setAttribute(attribute, translated);
      changed = true;
    }
  }
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.nodeValue.trim() || node.parentElement.closest("[contenteditable='true'],textarea,input,pre,code")) return;
    const translated = translateValue(node.nodeValue);
    if (translated !== node.nodeValue) { rememberText(node, node.nodeValue); node.nodeValue = translated; changed = true; }
  });
  if (changed) element.dataset.framerZhTranslated = "1";
  if (debugMode && !changed && /[A-Za-z]{2,}/.test(element.textContent || "")) {
    element.dataset.framerZhUntranslated = "1";
  }
}

function scanRoot(root) {
  if (!root) return;
  if (root.nodeType === Node.ELEMENT_NODE) translateElement(root);
  root.querySelectorAll?.("button,[role='button'],[role='menuitem'],[role='option'],[role='tab'],[role='listbox'],[aria-label],[title],label,[role='menu'],[role='dialog'],div,span").forEach(translateElement);
  root.querySelectorAll?.("*").forEach((element) => { if (element.shadowRoot) scanRoot(element.shadowRoot); });
}

function queueScan() {
  if (!enabled || scanQueued) return;
  scanQueued = true;
  requestAnimationFrame(() => { scanQueued = false; scanRoot(document.body); });
}

function restore() {
  document.querySelectorAll("[data-framer-zh-translated]").forEach((element) => {
    const attrs = originalAttrs.get(element);
    if (attrs) Object.entries(attrs).forEach(([name, value]) => value == null ? element.removeAttribute(name) : element.setAttribute(name, value));
    delete element.dataset.framerZhTranslated;
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) if (originalText.has(walker.currentNode)) walker.currentNode.nodeValue = originalText.get(walker.currentNode);
  document.querySelectorAll("[data-framer-zh-untranslated]").forEach((element) => delete element.dataset.framerZhUntranslated);
}

chrome.storage.sync.get({ enabled: true, customTranslations: {}, displayMode: "zh", debugMode: false }, ({ enabled: saved, customTranslations: savedTerms, displayMode: savedMode, debugMode: savedDebug }) => { enabled = saved; customTranslations = savedTerms || {}; displayMode = savedMode; debugMode = savedDebug; displayMode === "original" ? restore() : queueScan(); });
chrome.storage.onChanged.addListener((changes) => { if (!changes.enabled) return; enabled = changes.enabled.newValue; enabled ? queueScan() : restore(); });
chrome.storage.onChanged.addListener((changes) => { if (!changes.customTranslations) return; customTranslations = changes.customTranslations.newValue || {}; restore(); queueScan(); });
chrome.storage.onChanged.addListener((changes) => { if (changes.displayMode) { displayMode = changes.displayMode.newValue; displayMode === "original" ? restore() : queueScan(); } if (changes.debugMode) { debugMode = changes.debugMode.newValue; restore(); queueScan(); } });
document.addEventListener("click", (event) => { const target = event.target.closest?.("[data-framer-zh-untranslated]"); if (!target || !debugMode) return; navigator.clipboard?.writeText(target.textContent.trim()); target.title = "已复制英文术语"; });
new MutationObserver((mutations) => { if (enabled && mutations.some(({ addedNodes }) => addedNodes.length)) queueScan(); }).observe(document.documentElement, { childList: true, subtree: true });
