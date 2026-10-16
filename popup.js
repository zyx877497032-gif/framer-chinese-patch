const checkbox = document.querySelector("#enabled");

chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
  checkbox.checked = enabled;
});

checkbox.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: checkbox.checked });
});

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
