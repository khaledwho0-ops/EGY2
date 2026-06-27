const DEFAULT_BASE = "http://localhost:3000";
const $ = (id) => document.getElementById(id);

(async function init() {
  const { ealBase } = await chrome.storage.sync.get("ealBase");
  $("base").value = ealBase || DEFAULT_BASE;
  // Pre-fill from a context-menu selection, if any.
  const { pendingClaim } = await chrome.storage.local.get("pendingClaim");
  if (pendingClaim) {
    $("claim").value = pendingClaim;
    chrome.storage.local.remove("pendingClaim");
  }
})();

$("base").addEventListener("change", () => {
  chrome.storage.sync.set({ ealBase: $("base").value.trim() || DEFAULT_BASE });
});

$("check").addEventListener("click", check);

async function check() {
  const claim = $("claim").value.trim();
  if (claim.length < 8) {
    $("badge").textContent = "Type a longer claim.";
    return;
  }
  $("badge").textContent = "Checking… · جارٍ التحقّق…";
  $("badge").style.color = "#9aa0a6";
  $("out").innerHTML = "";
  try {
    const base = ($("base").value.trim() || DEFAULT_BASE).replace(/\/$/, "");
    const res = await fetch(base + "/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: claim, mode: "claim" }),
    });
    const j = await res.json();
    const verified = j?.enforcement?.status === "verified";
    $("badge").textContent = verified ? "✅ VERIFIED" : "⚠ UNVERIFIED";
    $("badge").style.color = verified ? "#3fcb6b" : "#ff9f43";
    const sources = (j.sources || [])
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>`)
      .join("");
    $("out").innerHTML = `<div>${escapeHtml((j.text || "").slice(0, 600))}</div>` + (sources ? `<div style="margin-top:8px">${sources}</div>` : "");
  } catch {
    $("badge").textContent = "Could not reach EAL — check the base URL below.";
    $("badge").style.color = "#ff7a7a";
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
