// ── Shared application state ────────────────────────────────────────
export const state = {
  currentTheme: 'default',
  handDrawn: true,
  renderTimeout: null,
  renderCounter: 0,
  checkerBg: false,
  editorView: null,
  exportBg: 'white',
  menubarOpen: false,
  toastTimeout: null,
  currentLang: (() => {
    const saved = localStorage.getItem('mermaid-editor-lang');
    if (saved && (saved === 'zh' || saved === 'en')) return saved;
    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('zh') ? 'zh' : 'en';
  })(),
};

export const pz = {
  scale: 1, tx: 0, ty: 0,
  dragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0,
};

export const MIN_SCALE = 0.1;
export const MAX_SCALE = 8;

// ── DOM references ──────────────────────────────────────────────────
export const dom = {
  editorContainer: document.getElementById('editor-container'),
  preview: document.getElementById('mermaid-preview'),
  previewViewport: document.getElementById('preview-viewport'),
  zoomLabel: document.getElementById('zoom-label'),
  btnZoomIn: document.getElementById('btn-zoom-in'),
  btnZoomOut: document.getElementById('btn-zoom-out'),
  btnZoomReset: document.getElementById('btn-zoom-reset'),
  themeSelect: document.getElementById('theme-select'),
  handDrawnBtn: document.getElementById('hand-drawn-btn'),
  uiThemeToggle: document.getElementById('ui-theme-toggle'),
  btnCopyPng: document.getElementById('btn-copy-png'),
  btnDownloadSvg: document.getElementById('btn-download-svg'),
  btnDownloadPng: document.getElementById('btn-download-png'),
  btnShare: document.getElementById('btn-share'),
  btnEmbedCode: document.getElementById('btn-embed-code'),
  btnCopyAiPrompt: document.getElementById('btn-copy-ai-prompt'),
  btnBgToggle: document.getElementById('btn-bg-toggle'),
  menubar: document.getElementById('menubar'),
  btnHelp: document.getElementById('btn-help'),
  divider: document.getElementById('divider'),
  toast: document.getElementById('toast'),
  editorStatus: document.getElementById('editor-status'),
  renderStatus: document.getElementById('render-status'),
  iconSun: document.getElementById('icon-sun'),
  iconMoon: document.getElementById('icon-moon'),
  helpModal: document.getElementById('help-modal'),
  modalClose: document.getElementById('modal-close'),
  modalOk: document.getElementById('modal-ok'),
  btnRestartTour: document.getElementById('btn-restart-tour'),
  tourOverlay: document.getElementById('tour-overlay'),
  tourHighlight: document.getElementById('tour-highlight'),
  tourTooltip: document.getElementById('tour-tooltip'),
  tourCurtainTop: document.getElementById('tour-curtain-top'),
  tourCurtainBottom: document.getElementById('tour-curtain-bottom'),
  tourCurtainLeft: document.getElementById('tour-curtain-left'),
  tourCurtainRight: document.getElementById('tour-curtain-right'),
  tourStepEl: document.getElementById('tour-step'),
  tourTitleEl: document.getElementById('tour-title'),
  tourBodyEl: document.getElementById('tour-body'),
  tourDotsEl: document.getElementById('tour-dots'),
  tourSkip: document.getElementById('tour-skip'),
  tourNext: document.getElementById('tour-next'),
  exportBgCustom: document.getElementById('export-bg-custom'),
  modalExampleGrid: document.getElementById('modal-example-grid'),
};

// ── Utility functions ───────────────────────────────────────────────
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add('show');
  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => { dom.toast.classList.remove('show'); }, 2200);
}

export function updateEditorStatus() {
  const val = state.editorView ? state.editorView.state.doc.toString() : '';
  const lines = val ? val.split('\n').length : 0;
  dom.editorStatus.textContent = state.currentLang === 'zh'
    ? lines + ' 行 · ' + val.length + ' 字符'
    : lines + ' lines · ' + val.length + ' chars';
}

export function setRenderStatus(s, text) {
  dom.renderStatus.textContent = text || '';
  dom.renderStatus.className = 'render-status' + (s ? ' visible ' + s : '');
}

export function btnSuccess(btn) {
  btn.classList.add('success');
  setTimeout(() => { btn.classList.remove('success'); }, 1200);
}

export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Shared UI actions ───────────────────────────────────────────────
export function applyUiTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  dom.iconSun.style.display = dark ? 'none' : '';
  dom.iconMoon.style.display = dark ? '' : 'none';
  dom.uiThemeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
}

export function openHelp() { dom.helpModal.classList.add('open'); }
export function closeHelp() { dom.helpModal.classList.remove('open'); }

export function closeAllMenus() {
  dom.menubar.querySelectorAll('.menubar__item.open').forEach(m => { m.classList.remove('open'); });
  state.menubarOpen = false;
}

export function switchTheme(t) {
  state.currentTheme = t;
  document.querySelectorAll('.theme-pill').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-checked', 'false');
  });
  const pill = document.querySelector('.theme-pill[data-theme="' + t + '"]');
  if (pill) { pill.classList.add('active'); pill.setAttribute('aria-checked', 'true'); }
  dom.themeSelect.value = t;
  dom.menubar.querySelectorAll('[data-theme-pick]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme-pick') === t);
  });
}

export function syncBgUI(value) {
  state.exportBg = value;
  dom.menubar.querySelectorAll('[data-bg-pick]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-bg-pick') === value);
  });
  document.querySelectorAll('.bg-pill').forEach(b => {
    const v = b.getAttribute('data-bg');
    b.classList.toggle('active', v === value);
    b.setAttribute('aria-checked', v === value ? 'true' : 'false');
  });
}

// ── Zoom / Pan ──────────────────────────────────────────────────────
export function applyTransform() {
  dom.preview.style.transform = 'translate(' + pz.tx + 'px,' + pz.ty + 'px) scale(' + pz.scale + ')';
  dom.zoomLabel.textContent = Math.round(pz.scale * 100) + '%';
}

export function zoomTo(newScale, cx, cy) {
  newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
  if (cx === undefined) {
    cx = dom.previewViewport.clientWidth / 2;
    cy = dom.previewViewport.clientHeight / 2;
  }
  pz.tx = cx - (cx - pz.tx) * (newScale / pz.scale);
  pz.ty = cy - (cy - pz.ty) * (newScale / pz.scale);
  pz.scale = newScale;
  applyTransform();
}

export function resetView() {
  pz.scale = 1; pz.tx = 0; pz.ty = 0;
  applyTransform();
}
