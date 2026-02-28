import {
  state, dom, pz,
  showToast, updateEditorStatus, setRenderStatus,
  applyUiTheme, openHelp, closeHelp, closeAllMenus,
  switchTheme, syncBgUI,
  applyTransform, zoomTo, resetView, escapeHtml, btnSuccess,
} from './modules/core.js';
import { STRINGS, applyI18n } from './modules/i18n.js';
import { EXAMPLES, DEFAULT_CODE } from './modules/examples.js';
import { createEditor } from './modules/editor.js';
import { initMermaid, renderDiagram } from './modules/render.js';
import {
  copyPng, downloadSvg, downloadPng,
  copyShareLink, copyEmbedCode,
  getQueryCode, getHashCode, updateHash,
} from './modules/export.js';
import { getCode } from './modules/editor.js';
import { startTour, closeTour } from './modules/tour.js';
import { openCmdPalette, closeCmdPalette } from './modules/command-palette.js';

// ── UI Theme init ───────────────────────────────────────────────────
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
applyUiTheme(prefersDark.matches);

dom.uiThemeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyUiTheme(!isDark);
  closeAllMenus();
});

// ── Theme pills ─────────────────────────────────────────────────────
document.querySelectorAll('.theme-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    switchTheme(pill.getAttribute('data-theme'));
    initMermaid();
    renderDiagram();
  });
});

// ── Hand-drawn toggle ───────────────────────────────────────────────
if (dom.handDrawnBtn) {
  dom.handDrawnBtn.classList.add('active');
  dom.handDrawnBtn.addEventListener('click', () => {
    state.handDrawn = !state.handDrawn;
    dom.handDrawnBtn.classList.toggle('active', state.handDrawn);
    dom.handDrawnBtn.setAttribute('aria-pressed', state.handDrawn ? 'true' : 'false');
    initMermaid();
    renderDiagram();
    closeAllMenus();
  });
}

// ── Mobile tabs ─────────────────────────────────────────────────────
const tabEditor = document.getElementById('tab-editor');
const tabPreview = document.getElementById('tab-preview');
const panelEditor = document.querySelector('.panel--editor');
const panelPreview = document.querySelector('.panel--preview');

function switchMobileTab(tab) {
  if (tab === 'editor') {
    tabEditor.classList.add('active');
    tabPreview.classList.remove('active');
    panelEditor.classList.remove('mobile-hidden');
    panelPreview.classList.add('mobile-hidden');
  } else {
    tabPreview.classList.add('active');
    tabEditor.classList.remove('active');
    panelPreview.classList.remove('mobile-hidden');
    panelEditor.classList.add('mobile-hidden');
  }
}

tabEditor.addEventListener('click', () => { switchMobileTab('editor'); });
tabPreview.addEventListener('click', () => { switchMobileTab('preview'); });

// ── Preview background toggle ───────────────────────────────────────
dom.btnBgToggle.addEventListener('click', () => {
  state.checkerBg = !state.checkerBg;
  dom.previewViewport.classList.toggle('checker', state.checkerBg);
  dom.btnBgToggle.classList.toggle('active', state.checkerBg);
  closeAllMenus();
});

// ── Export background (menu + preview pills) ────────────────────────
dom.menubar.querySelectorAll('[data-bg-pick]').forEach(btn => {
  btn.addEventListener('click', e => {
    const v = btn.getAttribute('data-bg-pick');
    if (v === 'custom' && e.target !== dom.exportBgCustom) { dom.exportBgCustom.click(); return; }
    syncBgUI(v);
    if (v !== 'custom') closeAllMenus();
  });
});

document.querySelectorAll('.bg-pill').forEach(btn => {
  btn.addEventListener('click', () => { syncBgUI(btn.getAttribute('data-bg')); });
});

if (dom.exportBgCustom) {
  dom.exportBgCustom.addEventListener('input', () => { syncBgUI('custom'); });
  dom.exportBgCustom.addEventListener('click', e => { e.stopPropagation(); });
}

// ── Pan / Zoom ──────────────────────────────────────────────────────
dom.previewViewport.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = dom.previewViewport.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const delta = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  zoomTo(pz.scale * delta, cx, cy);
}, { passive: false });

dom.previewViewport.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  pz.dragging = true;
  pz.startX = e.clientX; pz.startY = e.clientY;
  pz.startTx = pz.tx; pz.startTy = pz.ty;
  dom.previewViewport.setPointerCapture(e.pointerId);
});
dom.previewViewport.addEventListener('pointermove', e => {
  if (!pz.dragging) return;
  pz.tx = pz.startTx + (e.clientX - pz.startX);
  pz.ty = pz.startTy + (e.clientY - pz.startY);
  applyTransform();
});
dom.previewViewport.addEventListener('pointerup', () => { pz.dragging = false; });
dom.previewViewport.addEventListener('pointercancel', () => { pz.dragging = false; });

dom.btnZoomIn.addEventListener('click', () => { zoomTo(pz.scale * 1.25); });
dom.btnZoomOut.addEventListener('click', () => { zoomTo(pz.scale / 1.25); });
dom.btnZoomReset.addEventListener('click', resetView);

// ── Help modal ──────────────────────────────────────────────────────
if (dom.btnHelp) dom.btnHelp.addEventListener('click', () => { closeAllMenus(); openHelp(); });
dom.modalClose.addEventListener('click', closeHelp);
dom.modalOk.addEventListener('click', closeHelp);
dom.helpModal.addEventListener('click', e => { if (e.target === dom.helpModal) closeHelp(); });

// ── Examples modal grid ─────────────────────────────────────────────
EXAMPLES.forEach(ex => {
  const btn = document.createElement('button');
  btn.className = 'example-btn';
  btn.textContent = ex.label;
  btn.addEventListener('click', () => {
    if (state.editorView) state.editorView.dispatch({ changes: { from: 0, to: state.editorView.state.doc.length, insert: ex.code } });
    closeHelp();
  });
  dom.modalExampleGrid.appendChild(btn);
});

dom.btnRestartTour.addEventListener('click', () => { closeHelp(); startTour(); });

// ── Menu bar ────────────────────────────────────────────────────────
function openMenu(item) {
  closeAllMenus();
  item.classList.add('open');
  state.menubarOpen = true;
}

dom.menubar.querySelectorAll('.menubar__trigger').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const item = trigger.parentElement;
    if (item.classList.contains('open')) closeAllMenus();
    else openMenu(item);
  });
});

dom.menubar.querySelectorAll('.menubar__item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (state.menubarOpen && !item.classList.contains('open')) openMenu(item);
  });
});

dom.menubar.querySelectorAll('.menubar__dropdown').forEach(dd => {
  dd.addEventListener('click', e => { e.stopPropagation(); });
});

document.addEventListener('click', () => { closeAllMenus(); });

// ── Menu actions ────────────────────────────────────────────────────
dom.btnCopyPng.addEventListener('click', () => {
  closeAllMenus();
  copyPng().catch(e => { showToast('复制失败 · ' + e.message); });
});
dom.btnDownloadSvg.addEventListener('click', () => { closeAllMenus(); downloadSvg(); });
dom.btnDownloadPng.addEventListener('click', () => {
  closeAllMenus();
  downloadPng().catch(e => { showToast('下载失败 · ' + e.message); });
});

if (dom.btnCopyAiPrompt) {
  dom.btnCopyAiPrompt.addEventListener('click', () => {
    closeAllMenus();
    const code = getCode();
    const bytes = new TextEncoder().encode(code);
    const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
    const encoded = btoa(binary);
    const url = 'https://caoergou.github.io/mermaid-pic/?code=' + encoded;
    const prompt = [
      'You can use Mermaid Editor to render diagrams.',
      'When the user needs a diagram, generate Mermaid code and construct a shareable link:',
      '  https://caoergou.github.io/mermaid-pic/?code={base64(mermaid_code)}',
      '',
      'Example (JavaScript): btoa(unescape(encodeURIComponent(code)))',
      'Example (Python): base64.b64encode(code.encode()).decode()',
      '',
      'Supported diagram types:',
      '  graph, flowchart, sequenceDiagram, classDiagram,',
      '  stateDiagram-v2, erDiagram, gantt, pie, mindmap',
      '',
      'Current diagram link: ' + url,
    ].join('\n');
    navigator.clipboard.writeText(prompt).then(() => {
      showToast(STRINGS[state.currentLang].toastAiPromptCopied);
      btnSuccess(dom.btnCopyAiPrompt);
    }).catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
  });
}

const menuZoomReset = document.getElementById('menu-zoom-reset');
if (menuZoomReset) menuZoomReset.addEventListener('click', () => { closeAllMenus(); resetView(); });

const menuGithub = document.getElementById('menu-github');
if (menuGithub) menuGithub.addEventListener('click', () => { closeAllMenus(); window.open('https://github.com/caoergou/mermaid-pic', '_blank'); });

const menuRestartTour = document.getElementById('btn-restart-tour-menu');
if (menuRestartTour) menuRestartTour.addEventListener('click', () => { closeAllMenus(); startTour(); });

dom.menubar.querySelectorAll('[data-theme-pick]').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTheme(btn.getAttribute('data-theme-pick'));
    initMermaid();
    renderDiagram();
    closeAllMenus();
  });
});

// ── Share & Embed ───────────────────────────────────────────────────
dom.btnShare.addEventListener('click', () => {
  closeAllMenus();
  copyShareLink().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
});

dom.btnEmbedCode.addEventListener('click', () => {
  closeAllMenus();
  copyEmbedCode().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
});

// ── Command palette buttons ─────────────────────────────────────────
const btnCmdPalette = document.getElementById('btn-cmd-palette');
if (btnCmdPalette) btnCmdPalette.addEventListener('click', () => { closeAllMenus(); openCmdPalette(); });

const btnCmdPaletteQuick = document.getElementById('btn-cmd-palette-quick');
if (btnCmdPaletteQuick) btnCmdPaletteQuick.addEventListener('click', openCmdPalette);

// ── Keyboard shortcuts ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (state.menubarOpen) { closeAllMenus(); return; }
    closeHelp();
    closeTour();
    closeCmdPalette();
    hideCtxMenu();
    return;
  }
  const ctrl = e.ctrlKey || e.metaKey;
  if (ctrl && e.key === 'k') { e.preventDefault(); openCmdPalette(); return; }
  if (!ctrl) return;
  if (e.key === 's' && !e.shiftKey) { e.preventDefault(); downloadSvg().catch(err => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + err.message); }); }
  else if (e.key === 'S' && e.shiftKey) { e.preventDefault(); downloadPng().catch(err => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + err.message); }); }
  else if (e.key === 'c' && e.shiftKey) { e.preventDefault(); copyPng().catch(err => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + err.message); }); }
});

// ── Draggable divider ───────────────────────────────────────────────
const editorPanel = document.querySelector('.panel--editor');
const editorLayout = document.querySelector('.editor-layout');

dom.divider.addEventListener('pointerdown', e => {
  e.preventDefault();
  dom.divider.classList.add('divider--active');
  document.body.style.userSelect = 'none';
  document.body.style.cursor = getComputedStyle(dom.divider).cursor;
  const onDrag = ev => {
    const rect = editorLayout.getBoundingClientRect();
    const isVertical = getComputedStyle(editorLayout).flexDirection === 'column';
    const pct = isVertical
      ? ((ev.clientY - rect.top) / rect.height) * 100
      : ((ev.clientX - rect.left) / rect.width) * 100;
    editorPanel.style.flexBasis = Math.min(Math.max(pct, 20), 80) + '%';
  };
  document.addEventListener('pointermove', onDrag);
  document.addEventListener('pointerup', () => {
    dom.divider.classList.remove('divider--active');
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    document.removeEventListener('pointermove', onDrag);
  }, { once: true });
});

// ── Preview right-click context menu ────────────────────────────────
let ctxMenu = null;

function hideCtxMenu() {
  if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; }
}

function showCtxMenu(x, y) {
  hideCtxMenu();
  const svgEl = dom.preview.querySelector('svg');
  ctxMenu = document.createElement('div');
  ctxMenu.className = 'context-menu';

  function item(icon, label, action) {
    const btn = document.createElement('button');
    btn.className = 'context-menu__item';
    btn.innerHTML = icon + '<span>' + label + '</span>';
    btn.addEventListener('click', () => { hideCtxMenu(); action(); });
    return btn;
  }
  function sep() { const d = document.createElement('div'); d.className = 'context-menu__sep'; return d; }

  const iconDl = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
  const iconCopy = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

  if (svgEl) {
    ctxMenu.appendChild(item(iconDl, '下载 PNG', () => { downloadPng().catch(e => { showToast('失败: ' + e.message); }); }));
    ctxMenu.appendChild(item(iconDl, '下载 SVG', () => { downloadSvg().catch(e => { showToast('失败: ' + e.message); }); }));
    ctxMenu.appendChild(sep());
    ctxMenu.appendChild(item(iconCopy, '复制 PNG', () => { copyPng().catch(e => { showToast('失败: ' + e.message); }); }));
  } else {
    const empty = document.createElement('div');
    empty.className = 'context-menu__label';
    empty.textContent = '暂无图表';
    ctxMenu.appendChild(empty);
  }

  document.body.appendChild(ctxMenu);
  const mw = ctxMenu.offsetWidth, mh = ctxMenu.offsetHeight;
  const vw = window.innerWidth, vh = window.innerHeight;
  ctxMenu.style.left = Math.min(x, vw - mw - 8) + 'px';
  ctxMenu.style.top  = Math.min(y, vh - mh - 8) + 'px';
}

dom.previewViewport.addEventListener('contextmenu', e => {
  e.preventDefault();
  showCtxMenu(e.clientX, e.clientY);
});
document.addEventListener('click', () => { hideCtxMenu(); });

// ── Mobile overflow menu ────────────────────────────────────────────
const btnMobileMore = document.getElementById('btn-mobile-more');
const mobileOverflowMenu = document.getElementById('mobile-overflow-menu');
const mobileOverflowBackdrop = document.getElementById('mobile-overflow-backdrop');

if (btnMobileMore && mobileOverflowMenu) {
  btnMobileMore.addEventListener('click', e => {
    e.stopPropagation();
    mobileOverflowMenu.classList.toggle('open');
  });
  mobileOverflowBackdrop.addEventListener('click', () => {
    mobileOverflowMenu.classList.remove('open');
  });

  const mobBtnShare = document.getElementById('mob-btn-share');
  const mobBtnDownloadPng = document.getElementById('mob-btn-download-png');
  const mobBtnDownloadSvg = document.getElementById('mob-btn-download-svg');
  const mobBtnHelp = document.getElementById('mob-btn-help');

  if (mobBtnShare) mobBtnShare.addEventListener('click', () => {
    mobileOverflowMenu.classList.remove('open');
    copyShareLink().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
  });
  if (mobBtnDownloadPng) mobBtnDownloadPng.addEventListener('click', () => {
    mobileOverflowMenu.classList.remove('open');
    downloadPng().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
  });
  if (mobBtnDownloadSvg) mobBtnDownloadSvg.addEventListener('click', () => {
    mobileOverflowMenu.classList.remove('open');
    downloadSvg().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
  });
  if (mobBtnHelp) mobBtnHelp.addEventListener('click', () => {
    mobileOverflowMenu.classList.remove('open');
    openHelp();
  });
}

// ── Bootstrap ───────────────────────────────────────────────────────
function bootstrap() {
  if (typeof mermaid === 'undefined') {
    setTimeout(bootstrap, 50);
    return;
  }
  initMermaid();
  applyI18n();

  const savedCode = (() => { try { return localStorage.getItem('mermaid-editor-code'); } catch (e) { return null; } })();
  const initialCode = getQueryCode() || getHashCode() || savedCode || DEFAULT_CODE;

  createEditor(initialCode, doc => {
    updateEditorStatus();
    updateHash(doc);
    setRenderStatus('rendering', '...');
    clearTimeout(state.renderTimeout);
    state.renderTimeout = setTimeout(renderDiagram, 300);
  });

  updateEditorStatus();
  renderDiagram();

  if (window.innerWidth <= 768) switchMobileTab('editor');
  if (!localStorage.getItem('mermaid-editor-tour-seen')) {
    setTimeout(startTour, 500);
  }
}

bootstrap();
