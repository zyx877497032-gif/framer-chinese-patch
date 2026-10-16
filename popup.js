const checkbox = document.querySelector("#enabled");
chrome.storage.sync.get({ enabled: true }, ({ enabled }) => { checkbox.checked = enabled; });
checkbox.addEventListener("change", () => chrome.storage.sync.set({ enabled: checkbox.checked }));

const dictionary = document.createElement("section");
dictionary.innerHTML = `<style>.custom-dict{margin:0 12px 12px;padding:12px;border:1px solid #2c2d36;border-radius:14px;background:#1b1c22}.custom-dict h3{margin:0 0 8px;font-size:12px}.custom-dict p{margin:0 0 9px;color:#92939e;font-size:10px}.custom-dict .dict-row{display:flex;gap:6px}.custom-dict input{width:0;flex:1;border:1px solid #3a3b46;border-radius:7px;background:#25262e;color:#fff;padding:7px;font-size:11px}.custom-dict button{border:0;border-radius:7px;background:#7564f6;color:#fff;padding:0 9px;font-size:11px}.custom-dict ul{margin:9px 0 0;padding:0;list-style:none;color:#aaa;font-size:10px;line-height:1.7}</style><h3>自定义词典</h3><p>添加后会优先使用你的翻译。</p><div class="dict-row"><input id="dict-en" placeholder="英文术语"><input id="dict-zh" placeholder="中文翻译"><button id="dict-add">添加</button></div><ul id="dict-list"></ul>`;
document.querySelector("main")?.after(dictionary);
const renderDictionary = (terms) => { dictionary.querySelector("#dict-list").innerHTML = Object.entries(terms).map(([en, zh]) => `<li>${en} → ${zh}</li>`).join(""); };
chrome.storage.sync.get({ customTranslations: {} }, ({ customTranslations }) => renderDictionary(customTranslations));
dictionary.querySelector("#dict-add").onclick = () => { const en = dictionary.querySelector("#dict-en").value.trim(); const zh = dictionary.querySelector("#dict-zh").value.trim(); if (!en || !zh) return; chrome.storage.sync.get({ customTranslations: {} }, ({ customTranslations }) => { const next = { ...customTranslations, [en]: zh }; chrome.storage.sync.set({ customTranslations: next }); renderDictionary(next); dictionary.querySelector("#dict-en").value = ""; dictionary.querySelector("#dict-zh").value = ""; }); };

const feedbackLink = document.querySelector(".feedback");
feedbackLink?.addEventListener("click", (event) => {
  event.preventDefault();
  const modal = document.createElement("div");
  modal.innerHTML = `
    <style>
      .zh-modal{position:fixed;inset:0;padding:16px;background:#101115;color:#f6f7fb;font:13px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;z-index:10}
      .zh-modal h2{margin:0 0 6px;font-size:15px}.zh-modal p{margin:0 0 14px;color:#9c9da8;font-size:11px;line-height:1.5}
      .zh-modal label{display:block;margin:10px 0 5px;color:#c9cad4;font-size:11px}.zh-modal input,.zh-modal textarea{width:100%;border:1px solid #3a3b46;border-radius:8px;background:#1b1c22;color:#fff;padding:9px;font:12px inherit;outline:none}.zh-modal textarea{height:58px;resize:none}.zh-modal input:focus,.zh-modal textarea:focus{border-color:#7564f6}.zh-actions{display:flex;gap:8px;margin-top:14px}.zh-actions button{flex:1;border:0;border-radius:8px;padding:9px;cursor:pointer;font-weight:600}.zh-cancel{background:#2b2c34;color:#ddd}.zh-submit{background:#7564f6;color:#fff}
    </style>
    <section class="zh-modal"><h2>提交术语反馈</h2><p>填写后会打开一条预填好的 GitHub Issue，你确认后即可提交到项目。</p>
      <label>英文原文</label><input id="zh-original" placeholder="例如：Set variable">
      <label>建议翻译</label><input id="zh-translation" placeholder="例如：设置变量">
      <label>补充说明（可选）</label><textarea id="zh-note" placeholder="它出现在哪个面板或菜单？"></textarea>
      <div class="zh-actions"><button class="zh-cancel">取消</button><button class="zh-submit">继续提交</button></div>
    </section>`;
  document.body.appendChild(modal);
  modal.querySelector(".zh-cancel").onclick = () => modal.remove();
  modal.querySelector(".zh-submit").onclick = () => {
    const original = modal.querySelector("#zh-original").value.trim();
    const translation = modal.querySelector("#zh-translation").value.trim();
    const note = modal.querySelector("#zh-note").value.trim();
    if (!original || !translation) return;
    const title = encodeURIComponent(`术语反馈：${original} → ${translation}`);
    const body = encodeURIComponent(`## 漏翻或翻译建议\n\n- 英文原文：${original}\n- 建议翻译：${translation}\n- 补充说明：${note || "无"}\n\n> 由 Framer 中文补丁反馈窗口生成`);
    window.open(`https://github.com/zyx877497032-gif/framer-chinese-patch/issues/new?title=${title}&body=${body}`, "_blank");
    modal.remove();
  };
});
