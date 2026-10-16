const translations = {
  Assets:"资源",Start:"开始",Distribute:"分布",Convert:"转换",Locate:"定位", "Display option":"显示选项",Equals:"等于", "Doesn’t equal":"不等于", "Doesn't equal":"不等于", "Set variable":"设置变量",Overlays:"叠加层",Cursor:"光标",Layers:"图层",Pages:"页面",Components:"组件",Insert:"插入",Layout:"布局",Styles:"样式",Effects:"效果",Settings:"设置",Publish:"发布",Preview:"预览",Share:"分享",Design:"设计",Prototype:"原型",CMS:"内容管理",Code:"代码",Canvas:"画布",Add:"添加",Remove:"移除",Duplicate:"复制",Delete:"删除",Rename:"重命名",Undo:"撤销",Redo:"重做",Search:"搜索",Close:"关闭",Save:"保存",Cancel:"取消",Done:"完成",Create:"创建",Open:"打开",Upload:"上传",Download:"下载",Desktop:"桌面端",Tablet:"平板端",Mobile:"移动端",Width:"宽度",Height:"高度",Opacity:"不透明度",Position:"位置",Size:"尺寸",Color:"颜色",Font:"字体",Spacing:"间距",Padding:"内边距",Gap:"间隔",Radius:"圆角",Shadow:"阴影",Border:"边框",Auto:"自动",Fixed:"固定",Fill:"填充",Fit:"适应",Stack:"堆栈",Grid:"网格",Visible:"可见",Hidden:"隐藏",Align:"对齐",Alignment:"对齐方式",Center:"居中",Left:"左对齐",Right:"右对齐",Top:"顶部",Bottom:"底部",Direction:"方向",Horizontal:"水平",Vertical:"垂直",Relative:"相对",Absolute:"绝对",Constraints:"约束",Sizing:"尺寸调整",Min:"最小",Max:"最大",Content:"内容",Wrap:"换行",Overflow:"溢出",Clip:"裁剪",Scroll:"滚动",Transform:"变换",Rotate:"旋转",Scale:"缩放",Blur:"模糊",Transition:"过渡",Animation:"动画",Duration:"时长",Delay:"延迟",Ease:"缓动",Linear:"线性",Trigger:"触发器",Tap:"点击",Hover:"悬停",Press:"按下",Drag:"拖拽",Link:"链接",URL:"网址",Target:"目标",New:"新建",Copy:"复制",Paste:"粘贴",Reset:"重置",Replace:"替换",More:"更多",General:"常规",Advanced:"高级",Appearance:"外观",Accessibility:"无障碍",Interactions:"交互",Variables:"变量",Breakpoints:"断点",Responsive:"响应式",Variant:"变体",Overrides:"覆盖",Instance:"实例",Text:"文本",RichText:"富文本",Image:"图片",Video:"视频",Icon:"图标",Placeholder:"占位符",Default:"默认",Loading:"加载中",Error:"错误",Warning:"警告",LearnMore:"了解更多"
};
const originalText = new WeakMap();
const originalAttrs = new WeakMap();
let enabled = true;
const keys = Object.keys(translations).sort((a,b)=>b.length-a.length);
const wordPattern = new RegExp(`\\b(${keys.join("|")})\\b`, "g");
function translateValue(value) {
  if (!value || typeof value !== "string") return value;
  const trimmed = value.trim();
  if (translations[trimmed]) return value.replace(trimmed, translations[trimmed]);
  return value.replace(wordPattern, word => translations[word] || word);
}
function translateElement(element) {
  if (element.nodeType !== Node.ELEMENT_NODE || element.closest("[contenteditable='true'],textarea")) return;
  for (const attribute of ["aria-label","title","placeholder"]) {
    const value = element.getAttribute(attribute), translated = translateValue(value);
    if (translated && translated !== value) { if (!originalAttrs.has(element)) originalAttrs.set(element, {}); const attrs=originalAttrs.get(element); if (!(attribute in attrs)) attrs[attribute]=value; element.setAttribute(attribute, translated); }
  }
  const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT), nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{ if(!node.nodeValue.trim()||node.parentElement.closest("[contenteditable='true'],textarea")) return; const translated=translateValue(node.nodeValue); if(translated!==node.nodeValue){if(!originalText.has(node)) originalText.set(node,node.nodeValue); node.nodeValue=translated;} });
}
function restore(){ document.querySelectorAll("*").forEach(element=>{const attrs=originalAttrs.get(element); if(attrs) Object.entries(attrs).forEach(([name,value])=>element.setAttribute(name,value));}); const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); while(walker.nextNode()) if(originalText.has(walker.currentNode)) walker.currentNode.nodeValue=originalText.get(walker.currentNode); }
function apply(root=document.body){ if(root&&enabled) translateElement(root); }
chrome.storage.sync.get({enabled:true},result=>{enabled=result.enabled;apply();});
chrome.storage.onChanged.addListener(changes=>{if(!changes.enabled)return;enabled=changes.enabled.newValue;enabled?apply():restore();});
new MutationObserver(mutations=>{if(enabled)mutations.forEach(({addedNodes})=>addedNodes.forEach(node=>{if(node.nodeType===Node.ELEMENT_NODE)apply(node);}));}).observe(document.documentElement,{childList:true,subtree:true});
