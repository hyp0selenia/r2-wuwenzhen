var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/ui.js
var esc = /* @__PURE__ */ __name((value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]), "esc");
var embed = /* @__PURE__ */ __name((value) => JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028|\u2029/g, ""), "embed");
var STYLES = `
:root{
  --bg:#fdfaf1; --bg-soft:#f6efdc; --surface:#ffffff; --line:#efe5cc; --line-strong:#e3d6b6;
  --ink:#2c2618; --ink-soft:#6f6552; --ink-faint:#9c917b; --accent:#f5b921; --accent-deep:#8a6200;
  --accent-soft:#fff4d1; --danger:#c2410c; --radius:16px; --shadow:0 18px 40px -30px rgba(44,38,24,.45);
}
html[data-theme="dark"]{
  --bg:#161511; --bg-soft:#1d1b15; --surface:#201e18; --line:#332f24; --line-strong:#413c2d;
  --ink:#f5f1e6; --ink-soft:#b7ae99; --ink-faint:#8b8371; --accent:#f7c548; --accent-deep:#f7c548;
  --accent-soft:#33290d; --shadow:0 18px 40px -30px rgba(0,0,0,.8);
}
*{box-sizing:border-box}
/* Class rules below set display, so keep [hidden] authoritative. */
[hidden]{display:none !important}
html,body{margin:0;padding:0}
body{
  background:var(--bg);color:var(--ink);min-height:100vh;
  font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit}
.wrap{max-width:960px;margin:0 auto;padding:0 20px}

header.top{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:saturate(160%) blur(12px);border-bottom:1px solid var(--line)}
.top-inner{display:flex;align-items:center;gap:14px;height:68px}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.brand img{width:40px;height:40px;display:block}
.brand-name{font-size:19px;font-weight:700;letter-spacing:.04em}
.search{margin-left:auto;position:relative;flex:1 1 220px;max-width:320px}
.search input{
  width:100%;height:40px;padding:0 34px 0 36px;border-radius:11px;border:1px solid var(--line-strong);
  background:var(--surface);color:var(--ink);outline:none;transition:border-color .15s,box-shadow .15s;
}
.search input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.search .icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--ink-faint);display:flex}
.search .clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);border:0;background:none;color:var(--ink-faint);cursor:pointer;padding:4px;display:none;border-radius:6px}
.search .clear:hover{color:var(--ink)}
.icon-btn{border:1px solid var(--line-strong);background:var(--surface);width:40px;height:40px;border-radius:11px;cursor:pointer;display:grid;place-items:center;flex-shrink:0}
.icon-btn:hover{border-color:var(--accent);color:var(--accent-deep)}

main{padding:26px 0 64px}
.crumbs{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:14px;color:var(--ink-soft);margin-bottom:6px;min-height:24px}
.crumbs a{padding:3px 8px;border-radius:8px;font-weight:600;color:var(--ink)}
.crumbs a:hover{background:var(--accent-soft);color:var(--accent-deep)}
.crumbs .sep{color:var(--ink-faint)}
.crumbs .here{color:var(--ink-soft);padding:3px 0}
.meta{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:2px 0 16px;color:var(--ink-faint);font-size:13px}
.meta strong{color:var(--ink);font-size:15px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden}
.row{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;gap:14px;padding:12px 16px;border-top:1px solid var(--line);transition:background .12s}
/* File rows carry one more column than folder rows (size + modified time). */
.row.file{grid-template-columns:auto minmax(0,1fr) auto auto auto}
.row:first-child{border-top:0}
.row:hover{background:var(--bg-soft)}
.row .mark{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent-deep);font-size:16px;font-weight:700;flex-shrink:0}
.row.folder .mark{background:var(--bg-soft);color:var(--accent-deep)}
.name{min-width:0;display:flex;flex-direction:column;gap:2px}
.name .label{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.name .sub{font-size:12px;color:var(--ink-faint);display:none}
.size,.time{font-size:13px;color:var(--ink-faint);font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
.size{min-width:86px}
.time{min-width:86px}
.actions{display:flex;align-items:center;gap:6px;justify-self:end}
.row.folder .actions{color:var(--ink-faint)}
.get{border:1px solid var(--line-strong);background:var(--surface);border-radius:9px;padding:6px 12px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.get:hover{border-color:var(--accent);background:var(--accent-soft);color:var(--accent-deep)}
.copy{border:0;background:none;color:var(--ink-faint);cursor:pointer;padding:6px;border-radius:8px;display:grid;place-items:center}
.copy:hover{color:var(--accent-deep);background:var(--accent-soft)}
.row.folder{cursor:pointer}
.empty{text-align:center;padding:56px 20px;color:var(--ink-soft)}
.empty img{width:96px;height:96px;opacity:.92;margin-bottom:10px}
.empty h2{margin:.2rem 0 .4rem;font-size:17px;color:var(--ink)}
.empty p{margin:0;font-size:13px;color:var(--ink-faint)}
.more{display:flex;justify-content:center;border-top:1px solid var(--line);padding:14px}
.more button{border:1px solid var(--line-strong);background:var(--surface);border-radius:10px;padding:9px 22px;font-weight:600;cursor:pointer}
.more button:hover{border-color:var(--accent);background:var(--accent-soft);color:var(--accent-deep)}
.more button[disabled]{opacity:.6;cursor:progress}
footer{border-top:1px solid var(--line);padding:22px 0 40px;color:var(--ink-faint);font-size:12px}
.foot-inner{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.foot-inner img{width:20px;height:20px;opacity:.75}
.toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,14px);background:var(--ink);color:var(--bg);padding:9px 16px;border-radius:10px;font-size:13px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:40}
.toast.on{opacity:1;transform:translate(-50%,0)}

@media (max-width:720px){
  .wrap{padding:0 14px}
  .search{max-width:none}
  .row,.row.file{grid-template-columns:auto minmax(0,1fr) auto;gap:10px;padding:11px 12px}
  .name .sub{display:block}
  .time{display:none}
  .size{min-width:0;font-size:12px}
  .copy{display:none}
  .get{padding:6px 10px}
}
@media (max-width:420px){ .get span{display:none} }
`;
var FAVICONS = `
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#f5b921">
`;
var SCRIPT = String.raw`
const S = window.__WENZHEN__;
const list = document.getElementById("list");
const crumbs = document.getElementById("crumbs");
const metaCount = document.getElementById("meta-count");
const emptyBox = document.getElementById("empty");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("search-clear");
const moreBox = document.getElementById("more");
const moreBtn = document.getElementById("more-btn");
const toast = document.getElementById("toast");

const state = {
  path: S.initial.path || "",
  files: S.initial.files || [],
  folders: S.initial.folders || [],
  cursor: S.initial.cursor || null,
  query: ""
};

const svg = {
  file: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M19 21H5V3h9l5 5v13z"/></svg>',
  folder: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6L11.4 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  download: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></svg>',
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
};

function formatSize(bytes){
  if (typeof bytes !== "number" || !isFinite(bytes)) return "--";
  if (bytes < 1024) return bytes + " B";
  const units = ["KB","MB","GB","TB"];
  let value = bytes / 1024, i = 0;
  while (value >= 1024 && i < units.length - 1) { value /= 1024; i++; }
  return (value >= 100 ? Math.round(value) : value.toFixed(1)) + " " + units[i];
}

function formatTime(iso){
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const now = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (d.getFullYear() !== now.getFullYear()) return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
  return (d.getMonth() + 1) + "月" + d.getDate() + "日 " + hh + ":" + mm;
}

const encodeKey = (key) => {
  const text = String(key).replace(/^\//, "");
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  // base64url so the key survives being used as a single path segment.
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const downloadUrl = (key) => "/dl/" + encodeKey(key);

let toastTimer = 0;
function toastMessage(message){
  toast.textContent = message;
  toast.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("on"), 1900);
}

function renderCrumbs(){
  const parts = state.path.split("/").filter(Boolean);
  const nodes = ['<a href="#" data-nav="">全部文件</a>'];
  let acc = "";
  parts.forEach((part, index) => {
    acc += part + "/";
    const last = index === parts.length - 1;
    nodes.push('<span class="sep">/</span>');
    nodes.push(last
      ? '<span class="here">' + escapeHtml(part) + '</span>'
      : '<a href="#" data-nav="' + escapeHtml(acc) + '">' + escapeHtml(part) + '</a>');
  });
  crumbs.innerHTML = nodes.join("");
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function visible(){
  if (!state.query) return { folders: state.folders, files: state.files };
  const q = state.query.toLowerCase();
  const match = (name) => name.toLowerCase().includes(q);
  return {
    folders: state.folders.filter((f) => match(f.name)),
    files: state.files.filter((f) => match(f.name))
  };
}

function render(){
  renderCrumbs();
  const shown = visible();
  const total = shown.folders.length + shown.files.length;

  metaCount.innerHTML = "<strong>" + total + "</strong> 个项目";

  document.getElementById("total-count").textContent = String(total);
  list.innerHTML = "";
  emptyBox.hidden = total !== 0;

  shown.folders.forEach((folder) => {
    const row = document.createElement("div");
    row.className = "row folder";
    row.innerHTML =
      '<div class="mark">' + svg.folder + '</div>' +
      '<div class="name"><span class="label">' + escapeHtml(folder.name) + '</span><span class="sub">文件夹</span></div>' +
      '<div class="size">文件夹</div>' +
      '<div class="actions">' + svg.chevron + '</div>';
    row.addEventListener("click", () => navigate(folder.prefix));
    list.appendChild(row);
  });

  shown.files.forEach((file) => {
    if (file.type === "link") {
      const row = document.createElement("a");
      row.className = "row file link";
      row.href = file.url;
      row.innerHTML =
        '<div class="mark">' + svg.file + '</div>' +
        '<div class="name"><span class="label">' + escapeHtml(file.name) + '</span><span class="sub">链接</span></div>' +
        '<div class="size">链接</div><div class="time"></div>' +
        '<div class="actions">' + svg.chevron + '</div>';
      list.appendChild(row);
      return;
    }
    const row = document.createElement("div");
    row.className = "row file";
    row.innerHTML =
      '<div class="mark">' + svg.file + '</div>' +
      '<div class="name"><span class="label">' + escapeHtml(file.name) + '</span>' +
      '<span class="sub">' + formatSize(file.size) + ' · ' + formatTime(file.uploaded) + '</span></div>' +
      '<div class="size">' + formatSize(file.size) + '</div>' +
      '<div class="time">' + formatTime(file.uploaded) + '</div>' +
      '<div class="actions">' +
        '<button class="copy" type="button" title="复制下载链接">' + svg.copy + '</button>' +
        '<a class="get" href="' + downloadUrl(file.key) + '" download>' + svg.download + '<span>下载</span></a>' +
      '</div>';
    row.querySelector(".copy").addEventListener("click", async (event) => {
      event.stopPropagation();
      const url = new URL(downloadUrl(file.key), location.origin).href;
      try {
        await navigator.clipboard.writeText(url);
        toastMessage("下载链接已复制");
      } catch {
        toastMessage("复制失败，请手动复制");
      }
    });
    list.appendChild(row);
  });

  moreBox.hidden = !(state.cursor && !state.query);
}

async function load(path, cursor, append){
  moreBtn.disabled = true;
  try {
    const query = new URLSearchParams();
    if (path) query.set("path", path);
    if (cursor) query.set("cursor", cursor);
    const response = await fetch("/api/list?" + query.toString(), { headers: { accept: "application/json" } });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || response.status);

    if (append) {
      state.files = state.files.concat(body.files || []);
      state.folders = state.folders.concat(body.folders || []);
    } else {
      state.path = path;
      state.files = body.files || [];
      state.folders = body.folders || [];
    }
    state.cursor = body.cursor || null;
    render();
  } catch (error) {
    toastMessage("加载失败：" + error.message);
  } finally {
    moreBtn.disabled = false;
  }
}

function navigate(path, push){
  searchInput.value = "";
  clearBtn.style.display = "none";
  state.query = "";
  const url = path ? "?p=" + encodeURIComponent(path) : location.pathname;
  if (push !== false) history.pushState({ path }, "", url);
  window.scrollTo({ top: 0 });
  load(path, null, false);
}

list.addEventListener("click", () => {});
crumbs.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-nav]");
  if (!link) return;
  event.preventDefault();
  navigate(link.getAttribute("data-nav"));
});
moreBtn.addEventListener("click", () => load(state.path, state.cursor, true));
searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  clearBtn.style.display = state.query ? "block" : "none";
  render();
});
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  clearBtn.style.display = "none";
  render();
  searchInput.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
  if (event.key === "Escape" && document.activeElement === searchInput) { clearBtn.click(); searchInput.blur(); }
});
window.addEventListener("popstate", (event) => {
  const path = (event.state && event.state.path) || new URLSearchParams(location.search).get("p") || "";
  navigate(path, false);
});

const themeBtn = document.getElementById("theme-btn");
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("wenzhen-theme", theme); } catch {}
  themeBtn.innerHTML = theme === "dark"
    ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
    : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
};
themeBtn.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

const initialPath = new URLSearchParams(location.search).get("p");
if (initialPath && initialPath !== state.path) {
  history.replaceState({ path: state.path }, "", initialPath ? "?p=" + encodeURIComponent(state.path) : location.pathname);
  navigate(initialPath, false);
} else {
  history.replaceState({ path: state.path }, "", state.path ? "?p=" + encodeURIComponent(state.path) : location.pathname);
  render();
}
`;
function renderPage({ title, initial }) {
  return `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(title)}\u6587\u4EF6\u5217\u8868\u4E0E\u4E0B\u8F7D\u3002">
<meta name="robots" content="index, follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(title)}\u6587\u4EF6\u5217\u8868\u4E0E\u4E0B\u8F7D\u3002">
<meta property="og:image" content="/icons/icon-512.png">
<meta property="og:type" content="website">
${FAVICONS}
<style>${STYLES}</style>
</head>
<body>
<header class="top">
  <div class="wrap top-inner">
    <a class="brand" href="/" aria-label="${esc(title)}\u9996\u9875">
      <img src="/icons/logo-mark.png" alt="" width="40" height="40">
      <span class="brand-text">
        <span class="brand-name">${esc(title)}</span>
      </span>
    </a>
    <div class="search">
      <span class="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></span>
      <input id="search" type="search" placeholder="\u641C\u7D22\u5F53\u524D\u76EE\u5F55\uFF08\u6309 / \u805A\u7126\uFF09" autocomplete="off" aria-label="\u641C\u7D22\u6587\u4EF6">
      <button class="clear" id="search-clear" type="button" aria-label="\u6E05\u9664\u641C\u7D22">\u2715</button>
    </div>
    <button class="icon-btn" id="theme-btn" type="button" title="\u5207\u6362\u4E3B\u9898" aria-label="\u5207\u6362\u4E3B\u9898"></button>
  </div>
</header>

<main class="wrap">
  <nav class="crumbs" id="crumbs" aria-label="\u76EE\u5F55\u8DEF\u5F84"></nav>
  <div class="meta">
    <span id="meta-count"></span>
  </div>

  <div class="card">
    <div id="list"></div>
    <div class="empty" id="empty" hidden>
      <img src="/icons/logo-mark.png" alt="">
      <h2>\u8FD9\u91CC\u8FD8\u6CA1\u6709\u6587\u4EF6</h2>
      <p>\u6362\u4E2A\u76EE\u5F55\u770B\u770B\uFF0C\u6216\u6E05\u7A7A\u641C\u7D22\u5173\u952E\u8BCD\u3002</p>
    </div>
    <div class="more" id="more" hidden><button id="more-btn" type="button">\u52A0\u8F7D\u66F4\u591A</button></div>
  </div>
</main>

<footer>
  <div class="wrap foot-inner">
    <img src="/icons/logo-mark.png" alt="">
    <span>\u5171 <span id="total-count">0</span> \u9879</span>
  </div>
</footer>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script>window.__WENZHEN__ = ${embed({ initial })};<\/script>
<script>${SCRIPT}<\/script>
</body>
</html>`;
}
__name(renderPage, "renderPage");

// src/worker.js
var DEFAULTS = {
  apiBase: "https://api.wenzhen.ccwu.cc",
  bucket: "wuwenzhen",
  hiddenPrefix: ".r2-explorer/",
  title: "\u868A\u5B50\u7F51",
  // Name of the service binding declared in wrangler.toml ([[services]]).
  service: "API_SERVICE"
};
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
var envValue = /* @__PURE__ */ __name((env, key, fallback) => {
  const v = env?.[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}, "envValue");
var settings = /* @__PURE__ */ __name((env) => ({
  apiBase: envValue(env, "API_BASE", DEFAULTS.apiBase).replace(/\/+$/, ""),
  bucket: envValue(env, "BUCKET_NAME", DEFAULTS.bucket),
  hiddenPrefix: envValue(env, "HIDDEN_PREFIX", DEFAULTS.hiddenPrefix),
  title: envValue(env, "SITE_TITLE", DEFAULTS.title),
  service: envValue(env, "API_SERVICE", DEFAULTS.service)
}), "settings");
var upstreamHeaders = /* @__PURE__ */ __name((request) => {
  const headers = new Headers({
    "user-agent": UA,
    accept: "application/json, text/plain, */*",
    "accept-language": request?.headers.get("accept-language") || "zh-CN,zh;q=0.9,en;q=0.8"
  });
  const referer = request?.headers.get("referer");
  if (referer) headers.set("referer", referer);
  return headers;
}, "upstreamHeaders");
var encodeBase64 = /* @__PURE__ */ __name((value) => btoa(String.fromCharCode(...new TextEncoder().encode(value))), "encodeBase64");
var decodeBase64 = /* @__PURE__ */ __name((value) => new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))), "decodeBase64");
var fromBase64Url = /* @__PURE__ */ __name((value) => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  return decodeBase64(padded + "=".repeat((4 - padded.length % 4) % 4));
}, "fromBase64Url");
async function upstream(env, request, path, init = {}) {
  const cfg = settings(env);
  const headers = init.headers || upstreamHeaders(request);
  const method = init.method || "GET";
  const binding = cfg.service ? env?.[cfg.service] : void 0;
  if (typeof binding?.fetch === "function") {
    try {
      const viaBinding = await binding.fetch(
        new Request(`https://${cfg.service.toLowerCase()}.internal${path}`, { method, headers })
      );
      const type = viaBinding.headers.get("content-type") || "";
      if (!/text\/html/i.test(type)) return viaBinding;
    } catch {
    }
  }
  if (!cfg.apiBase) throw new Error("\u4E0A\u6E38\u4E0D\u53EF\u7528\uFF1Aservice binding \u672A\u751F\u6548\uFF0C\u4E14\u672A\u914D\u7F6E API_BASE");
  const url = path.startsWith("http") ? path : cfg.apiBase + path;
  try {
    return await fetch(url, { ...init, method, headers });
  } catch (error) {
    throw new Error(`\u65E0\u6CD5\u8FDE\u63A5\u4E0A\u6E38 ${new URL(cfg.apiBase).host}\uFF1A${error.message}`);
  }
}
__name(upstream, "upstream");
async function bucketName(env, request) {
  const cfg = settings(env);
  if (cfg.bucket) return cfg.bucket;
  const res = await upstream(env, request, "/api/server/config");
  if (!res.ok) throw new Error(`storage config unavailable (${res.status})`);
  const body = await res.json();
  const name = body?.buckets?.[0]?.name;
  if (!name) throw new Error("storage reports no buckets");
  return name;
}
__name(bucketName, "bucketName");
var isHidden = /* @__PURE__ */ __name((key, cfg) => cfg.hiddenPrefix !== "" && key.startsWith(cfg.hiddenPrefix), "isHidden");
async function listFolder(env, request, cfg, path, cursor) {
  const bucket = await bucketName(env, request);
  const query = new URLSearchParams({ delimiter: "/" });
  if (path) query.set("prefix", encodeBase64(path));
  if (cursor) query.set("cursor", cursor);
  const res = await upstream(
    env,
    request,
    `/api/buckets/${encodeURIComponent(bucket)}?${query.toString()}`
  );
  if (!res.ok) throw new Error(`\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\u5217\u8868\uFF08${res.status}\uFF09`);
  const body = await res.json();
  const files = (body.objects || []).filter((o) => !isHidden(o.key, cfg) && o.key !== "links.txt").map((o) => ({
    key: o.key,
    name: o.key.slice(path.length),
    size: o.size,
    uploaded: o.uploaded
  })).filter((o) => o.name !== "" && !o.name.endsWith("/"));
  // Load root shortcuts once, independently of the page containing links.txt.
  if (!path && !cursor) {
    try {
      const linksRes = await upstream(env, request,
        `/api/buckets/${encodeURIComponent(bucket)}/${encodeURIComponent(encodeBase64("links.txt"))}`);
      if (linksRes.ok) {
        const raw = (await linksRes.text()).replace(/^\uFEFF/, "").trim();
        if (raw) {
          const entries = JSON.parse(raw.startsWith("{") ? raw : `{${raw.replace(/,\s*$/, "")}}`);
          if (entries && typeof entries === "object" && !Array.isArray(entries)) {
            for (const [name, value] of Object.entries(entries)) {
              if (!name.trim() || typeof value !== "string") continue;
              try {
                const url = new URL(value);
                if (url.protocol === "http:" || url.protocol === "https:") {
                  files.push({ type: "link", name, url: url.href });
                }
              } catch { /* Ignore invalid link targets. */ }
            }
          }
        }
      } else if (linksRes.status !== 404) {
        console.error("Unable to read links.txt:", linksRes.status);
      }
    } catch (error) {
      console.error("Unable to parse or read links.txt:", error);
    }
  }
  const folders = (body.delimitedPrefixes || []).filter((p) => !isHidden(p, cfg)).map((p) => ({ prefix: p, name: p.slice(path.length).replace(/\/$/, "") })).filter((f) => f.name !== "");
  return {
    files,
    folders,
    cursor: body.truncated ? body.cursor || null : null
  };
}
__name(listFolder, "listFolder");
var html = /* @__PURE__ */ __name((body, status = 200, extraHeaders = {}) => new Response(body, {
  status,
  headers: {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
    ...extraHeaders
  }
}), "html");
function errorPage(message) {
  return html(
    `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>\u868A\u5B50\u7F51</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fdfaf1;color:#2c2618;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
.box{max-width:32rem;padding:2.5rem;background:#fff;border:1px solid #f0e7cd;border-radius:20px;box-shadow:0 18px 40px -28px rgba(44,38,24,.35);text-align:center}
h1{margin:.2rem 0 .6rem;font-size:1.35rem}p{margin:.4rem 0;color:#6d6350}a{color:#b07d00}</style></head>
<body><div class="box"><div style="font-size:2.6rem">\u{1F99F}</div><h1>\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\u5217\u8868</h1><p>${String(message).replace(/[<>&]/g, "")}</p><p><a href="/">\u91CD\u65B0\u52A0\u8F7D</a></p></div></body></html>`,
    502
  );
}
__name(errorPage, "errorPage");
async function download(env, request, key) {
  if (!key) return new Response("\u7F3A\u5C11\u6587\u4EF6\u540D", { status: 400 });
  const bucket = await bucketName(env, request);
  const headers = upstreamHeaders(request);
  const range = request.headers.get("range");
  if (range) headers.set("range", range);
  if (request.headers.get("if-none-match")) headers.set("if-none-match", request.headers.get("if-none-match"));
  const res = await upstream(
    env,
    request,
    `/api/buckets/${encodeURIComponent(bucket)}/${encodeURIComponent(encodeBase64(key))}`,
    { method: "GET", headers }
  );
  if (!res.ok && res.status !== 206) {
    return new Response(`\u65E0\u6CD5\u4E0B\u8F7D\u8BE5\u6587\u4EF6\uFF08${res.status}\uFF09`, {
      status: res.status === 404 ? 404 : 502,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
    });
  }
  const name = key.split("/").pop() || "download";
  const ascii = name.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "'");
  const out = new Headers({
    "content-type": res.headers.get("content-type") || "application/octet-stream",
    "content-disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
    "cache-control": "private, max-age=0, must-revalidate",
    "x-content-type-options": "nosniff"
  });
  for (const header of ["content-length", "content-range", "accept-ranges", "etag", "last-modified"]) {
    const value = res.headers.get(header);
    if (value) out.set(header, value);
  }
  return new Response(res.body, { status: res.status, headers: out });
}
__name(download, "download");
var worker_default = {
  async fetch(request, env) {
    const cfg = settings(env);
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("\u53EA\u652F\u6301\u67E5\u770B\u4E0E\u4E0B\u8F7D", { status: 405, headers: { allow: "GET, HEAD" } });
    }
    if (path.startsWith("/dl/")) {
      try {
        return await download(env, request, fromBase64Url(decodeURIComponent(path.slice(4))));
      } catch (error) {
        return new Response(`\u4E0B\u8F7D\u5931\u8D25\uFF1A${error.message}`, {
          status: 502,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }
    }
    if (path === "/api/list") {
      try {
        const folder = (url.searchParams.get("path") || "").replace(/^\/+/, "");
        const safe = folder.endsWith("/") || folder === "" ? folder : `${folder}/`;
        const result = await listFolder(env, request, cfg, safe, url.searchParams.get("cursor"));
        return Response.json(result, { headers: { "cache-control": "no-store" } });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 502 });
      }
    }
    if (path === "/" || path === "/index.html") {
      let initial = { path: "", files: [], folders: [], cursor: null };
      let failure = null;
      try {
        initial = { path: "", ...await listFolder(env, request, cfg, "", null) };
      } catch (error) {
        failure = error.message;
      }
      if (failure) return errorPage(failure);
      return html(renderPage({ title: cfg.title, initial }));
    }
    if (path === "/healthz") {
      try {
        const bucket = await bucketName(env, request);
        const probe = await listFolder(env, request, settings(env), "", null);
        return Response.json({ ok: true, bucket, files: probe.files.length, folders: probe.folders.length });
      } catch (error) {
        return Response.json({ ok: false, error: error.message }, { status: 502 });
      }
    }
    if (env?.ASSETS) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    }
    return new Response("\u9875\u9762\u4E0D\u5B58\u5728", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
