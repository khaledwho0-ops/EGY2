// EAL Cognitive Shield — in-feed claim checker.
// Select text on a feed → a floating "✓ EAL" button appears → click it (or use
// the right-click menu) → it calls the REAL EAL One-Law endpoint and renders the
// verdict + cited sources inline. No fake data: an unsourced claim shows UNVERIFIED.

const DEFAULT_BASE = "http://localhost:3000";
let floatBtn = null;

async function getBase() {
  try {
    const { ealBase } = await chrome.storage.sync.get("ealBase");
    return ealBase || DEFAULT_BASE;
  } catch {
    return DEFAULT_BASE;
  }
}

document.addEventListener("mouseup", (e) => {
  const sel = (window.getSelection()?.toString() || "").trim();
  removeBtn();
  if (sel.length > 12) showBtn(e.pageX, e.pageY, sel);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === "EAL_CHECK" && msg.claim) {
    const x = window.scrollX + 80;
    const y = window.scrollY + 80;
    check(msg.claim, x, y);
  }
});

function removeBtn() {
  if (floatBtn) {
    floatBtn.remove();
    floatBtn = null;
  }
}

function showBtn(x, y, claim) {
  floatBtn = document.createElement("div");
  floatBtn.textContent = "✓ EAL";
  Object.assign(floatBtn.style, {
    position: "absolute", left: x + "px", top: y + 10 + "px", zIndex: 2147483647,
    background: "#f0c030", color: "#0b0b12", padding: "4px 10px", borderRadius: "8px",
    fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "system-ui, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,.4)",
  });
  floatBtn.addEventListener("mousedown", (ev) => { ev.preventDefault(); check(claim, x, y); });
  document.body.appendChild(floatBtn);
}

async function check(claim, x, y) {
  removeBtn();
  const box = makeBox(x, y, "Checking with EAL… · جارٍ التحقّق…");
  try {
    const base = await getBase();
    const res = await fetch(base + "/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: claim, mode: "claim" }),
    });
    const j = await res.json();
    const verified = j?.enforcement?.status === "verified";
    const badge = verified ? "✅ VERIFIED" : "⚠ UNVERIFIED";
    const badgeColor = verified ? "#3fcb6b" : "#ff9f43";
    const sources = (j.sources || [])
      .slice(0, 3)
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" style="color:#22d3ee;display:block;font-size:11px;margin-top:3px;word-break:break-all">${s.url}</a>`)
      .join("");
    box.querySelector(".eal-body").innerHTML =
      `<div style="font-weight:700;color:${badgeColor};margin-bottom:6px">${badge}</div>` +
      `<div style="font-size:12px;line-height:1.5;color:#d8d4cc">${escapeHtml((j.text || "").slice(0, 300))}…</div>` +
      (sources ? `<div style="margin-top:8px;border-top:1px solid #2a2a33;padding-top:6px">${sources}</div>` : "");
  } catch {
    box.querySelector(".eal-body").innerHTML =
      `Could not reach EAL. Open the extension popup and set your EAL base URL (default ${DEFAULT_BASE}).`;
  }
}

function makeBox(x, y, html) {
  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "absolute", left: x + "px", top: y + 10 + "px", zIndex: 2147483647, maxWidth: "340px",
    background: "#0b0b12", color: "#e8e2d6", border: "1px solid #f0c030", padding: "12px 14px",
    borderRadius: "12px", fontFamily: "system-ui, sans-serif", boxShadow: "0 10px 30px rgba(0,0,0,.55)",
  });
  box.innerHTML = `<div style="font-weight:800;font-size:12px;color:#f0c030;margin-bottom:6px">EAL · الدرع المعرفي</div><div class="eal-body">${html}</div>`;
  const close = document.createElement("div");
  close.textContent = "×";
  Object.assign(close.style, { position: "absolute", top: "6px", right: "10px", cursor: "pointer", color: "#777", fontSize: "16px" });
  close.addEventListener("click", () => box.remove());
  box.appendChild(close);
  document.body.appendChild(box);
  return box;
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
