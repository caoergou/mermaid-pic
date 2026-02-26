import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { linter, lintGutter, setDiagnostics } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mermaid as mermaidLang } from "codemirror-lang-mermaid";
import { oneDark } from "@codemirror/theme-one-dark";

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────
  var currentTheme = 'default';
  var handDrawn = true; // default: hand-drawn on
  var renderTimeout = null;
  var renderCounter = 0;
  var checkerBg = false;
  var editorView = null;

  // pan/zoom state
  var pz = { scale: 1, tx: 0, ty: 0, dragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0 };
  var MIN_SCALE = 0.1, MAX_SCALE = 8;

  // export background
  var exportBg = 'white';

  // history state
  var history = []; // [{code, time}]
  var MAX_HISTORY = 20;
  var historyIndex = -1; // index of currently shown snapshot (-1 = live)

  // ── DOM refs ───────────────────────────────────────────────────────
  var editorContainer = document.getElementById('editor-container');
  var preview = document.getElementById('mermaid-preview');
  var previewViewport = document.getElementById('preview-viewport');
  var zoomLabel = document.getElementById('zoom-label');
  var btnZoomIn = document.getElementById('btn-zoom-in');
  var btnZoomOut = document.getElementById('btn-zoom-out');
  var btnZoomReset = document.getElementById('btn-zoom-reset');
  var historyList = document.getElementById('history-list');
  var themeSelect = document.getElementById('theme-select');
  var handDrawnBtn = document.getElementById('hand-drawn-btn');
  var uiThemeToggle = document.getElementById('ui-theme-toggle');
  var btnCopyPng = document.getElementById('btn-copy-png');
  var btnDownloadSvg = document.getElementById('btn-download-svg');
  var btnDownloadPng = document.getElementById('btn-download-png');
  var btnShare = document.getElementById('btn-share');
  var btnCopyAiPrompt = document.getElementById('btn-copy-ai-prompt');
  var btnBgToggle = document.getElementById('btn-bg-toggle');
  var exportBgSelect = document.getElementById('export-bg-select');
  var exportBgCustom = document.getElementById('export-bg-custom');
  var btnHelp = document.getElementById('btn-help');
  var divider = document.getElementById('divider');
  var toast = document.getElementById('toast');
  var editorStatus = document.getElementById('editor-status');
  var renderStatus = document.getElementById('render-status');
  var iconSun = document.getElementById('icon-sun');
  var iconMoon = document.getElementById('icon-moon');
  var helpModal = document.getElementById('help-modal');
  var modalClose = document.getElementById('modal-close');
  var modalOk = document.getElementById('modal-ok');
  var btnRestartTour = document.getElementById('btn-restart-tour');
  var tourOverlay = document.getElementById('tour-overlay');
  var tourHighlight = document.getElementById('tour-highlight');
  var tourTooltip = document.getElementById('tour-tooltip');
  var tourCurtainTop    = document.getElementById('tour-curtain-top');
  var tourCurtainBottom = document.getElementById('tour-curtain-bottom');
  var tourCurtainLeft   = document.getElementById('tour-curtain-left');
  var tourCurtainRight  = document.getElementById('tour-curtain-right');
  var tourStepEl = document.getElementById('tour-step');
  var tourTitleEl = document.getElementById('tour-title');
  var tourBodyEl = document.getElementById('tour-body');
  var tourDotsEl = document.getElementById('tour-dots');
  var tourSkip = document.getElementById('tour-skip');
  var tourNext = document.getElementById('tour-next');

  var DEFAULT_CODE = `graph TD
    A[开始 Start] --> B{判断 Decision}
    B -->|是 Yes| C[成功 OK]
    B -->|否 No| D[失败 Fail]
    C --> E[结束 End]
    D --> E`;

  // ── History ────────────────────────────────────────────────────────
  function pushHistory(code) {
    // don't duplicate consecutive identical snapshots
    if (history.length > 0 && history[history.length - 1].code === code) return;
    history.push({ code: code, time: new Date() });
    if (history.length > MAX_HISTORY) history.shift();
    historyIndex = -1;
    renderHistoryBar();
  }

  function renderHistoryBar() {
    if (!historyList) return;
    historyList.innerHTML = '';
    history.slice().reverse().forEach(function (snap, i) {
      var realIdx = history.length - 1 - i;
      var item = document.createElement('div');
      item.className = 'history-item';
      var btn = document.createElement('button');
      btn.className = 'history-btn' + (historyIndex === realIdx ? ' current' : '');
      var t = snap.time;
      btn.textContent = t.getHours().toString().padStart(2,'0') + ':' +
                        t.getMinutes().toString().padStart(2,'0') + ':' +
                        t.getSeconds().toString().padStart(2,'0');
      btn.title = snap.code.slice(0, 80) + (snap.code.length > 80 ? '…' : '');
      btn.addEventListener('click', function () {
        historyIndex = realIdx;
        if (editorView) {
          editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: snap.code } });
        }
        renderHistoryBar();
      });
      item.appendChild(btn);
      historyList.appendChild(item);
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  var toastTimeout = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  function updateEditorStatus() {
    var val = getCode();
    var lines = val ? val.split('\n').length : 0;
    editorStatus.textContent = STRINGS[currentLang].editorStatusTpl(lines, val.length);
  }

  function setRenderStatus(state, text) {
    renderStatus.textContent = text || '';
    renderStatus.className = 'render-status' + (state ? ' visible ' + state : '');
  }

  function btnSuccess(btn) {
    btn.classList.add('success');
    setTimeout(function () { btn.classList.remove('success'); }, 1200);
  }

  // ── Mermaid ────────────────────────────────────────────────────────
  function initMermaid() {
    var handwritingFont = "'Virgil', 'LXGW WenKai TC', 'KaiTi', 'STKaiti', cursive";
    var normalFont = "system-ui, -apple-system, sans-serif";
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
      look: handDrawn ? 'handDrawn' : 'classic',
      securityLevel: 'loose',
      handDrawnSeed: 42,
      themeVariables: {
        fontFamily: handDrawn ? handwritingFont : normalFont,
        fontSize: handDrawn ? '17px' : '14px',
      },
    });
    preview.style.fontFamily = handDrawn ? handwritingFont : '';
  }

  async function renderDiagram() {
    var code = getCode().trim();
    if (!code) {
      preview.innerHTML = '<p class="placeholder">' + STRINGS[currentLang].placeholderMain + '</p>';
      setRenderStatus('', '');
      clearDiagnostics();
      return;
    }
    setRenderStatus('rendering', STRINGS[currentLang].renderingStatus);
    // some diagram types have known issues with handDrawn look; fall back to classic
    var noHandDrawn = /^\s*(classDiagram|stateDiagram|erDiagram|gantt|pie|mindmap|timeline|xychart)/i.test(code);
    var handwritingFont = "'Virgil', 'LXGW WenKai TC', 'KaiTi', 'STKaiti', cursive";
    var normalFont = "system-ui, -apple-system, sans-serif";
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
      look: (handDrawn && !noHandDrawn) ? 'handDrawn' : 'classic',
      securityLevel: 'loose',
      handDrawnSeed: 42,
      themeVariables: {
        fontFamily: handDrawn ? handwritingFont : normalFont,
        fontSize: handDrawn ? '17px' : '14px',
      },
    });
    try {
      renderCounter++;
      var id = 'mermaid-diagram-' + renderCounter;
      var result = await mermaid.render(id, code);
      preview.innerHTML = result.svg;
      pushHistory(code);
      setRenderStatus('ok', STRINGS[currentLang].renderOk);
      clearDiagnostics();
      setTimeout(function () { setRenderStatus('', ''); }, 1500);
    } catch (err) {
      var msg = err.message || String(err);
      var lineMatch = msg.match(/line\s+(\d+)/i);
      var s = STRINGS[currentLang];
      var lineHint = lineMatch ? '<span class="error-banner__line">' + s.errorLine.replace('{n}', lineMatch[1]) + '</span>' : '';
      preview.innerHTML =
        '<div class="error-banner">' +
          '<div class="error-banner__header">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
            '<span>' + s.errorSyntax + '</span>' +
            lineHint +
            '<button class="error-banner__close" title="' + s.errorDismiss + '" onclick="this.closest(\'.error-banner\').remove()">' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
          '<pre class="error-banner__msg">' + escapeHtml(msg) + '</pre>' +
          '<div class="error-banner__tip">' + s.errorTip + '</div>' +
        '</div>';
      setRenderStatus('error', STRINGS[currentLang].renderError);
      pushDiagnosticFromError(msg);
    }
  }

  // ── CodeMirror lint integration ────────────────────────────────────
  var currentDiagnostics = [];

  function clearDiagnostics() {
    if (!editorView) return;
    currentDiagnostics = [];
    editorView.dispatch(setDiagnostics(editorView.state, []));
  }

  function pushDiagnosticFromError(msg) {
    if (!editorView) return;
    // Try to extract line number from mermaid error messages like "Parse error on line 3:"
    var lineMatch = msg.match(/line\s+(\d+)/i);
    var from = 0, to = 1;
    if (lineMatch) {
      var lineNum = parseInt(lineMatch[1], 10);
      try {
        var line = editorView.state.doc.line(lineNum);
        from = line.from;
        to = line.to || line.from + 1;
      } catch (e) { /* line out of range */ }
    } else {
      // Mark the whole first line
      try {
        var firstLine = editorView.state.doc.line(1);
        from = firstLine.from;
        to = firstLine.to;
      } catch (e) {}
    }
    var diag = [{ from: from, to: to, severity: 'error', message: msg }];
    currentDiagnostics = diag;
    editorView.dispatch(setDiagnostics(editorView.state, diag));
  }

  // ── CodeMirror setup ───────────────────────────────────────────────
  function getCode() {
    return editorView ? editorView.state.doc.toString() : '';
  }

  function buildEditorTheme(dark) {
    return EditorView.theme({
      '&': {
        height: '100%',
        fontSize: '13.5px',
        fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
      },
      '.cm-scroller': { overflow: 'auto', lineHeight: '1.65' },
      '.cm-content': { padding: '16px' },
      '.cm-focused': { outline: 'none' },
      '.cm-gutters': {
        background: dark ? '#0a0a18' : '#1a1a2e',
        borderRight: '1px solid ' + (dark ? '#1a1a30' : '#2a2a40'),
        color: '#555',
      },
      '.cm-lineNumbers .cm-gutterElement': { padding: '0 8px 0 4px', minWidth: '28px' },
      '.cm-activeLine': { background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.04)' },
      '.cm-activeLineGutter': { background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.06)' },
      '.cm-selectionBackground, ::selection': { background: '#3a5a8a !important' },
    }, { dark: true });
  }

  function createEditor(initialCode) {
    var extensions = [
      basicSetup,
      mermaidLang(),
      oneDark,
      buildEditorTheme(true),
      lintGutter(),
      linter(function () { return currentDiagnostics; }, { delay: 0 }),
      keymap.of([{
        key: 'Tab',
        run: function (view) {
          view.dispatch(view.state.replaceSelection('  '));
          return true;
        }
      }]),
      EditorView.updateListener.of(function (update) {
        if (update.docChanged) {
          updateEditorStatus();
          updateHash(update.state.doc.toString());
          setRenderStatus('rendering', '...');
          clearTimeout(renderTimeout);
          renderTimeout = setTimeout(renderDiagram, 300);
        }
      }),
    ];

    editorView = new EditorView({
      state: EditorState.create({ doc: initialCode, extensions: extensions }),
      parent: editorContainer,
    });
  }

  // ── UI Theme ───────────────────────────────────────────────────────
  function applyUiTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    iconSun.style.display = dark ? 'none' : '';
    iconMoon.style.display = dark ? '' : 'none';
  }

  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  applyUiTheme(prefersDark.matches);

  uiThemeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyUiTheme(!isDark);
  });

  // ── Theme / Hand-drawn ─────────────────────────────────────────────
  themeSelect.addEventListener('change', function () {
    currentTheme = themeSelect.value;
    initMermaid();
    renderDiagram();
  });

  // Set hand-drawn on by default
  if (handDrawnBtn) handDrawnBtn.classList.add('active');

  if (handDrawnBtn) {
    handDrawnBtn.addEventListener('click', function () {
      handDrawn = !handDrawn;
      handDrawnBtn.classList.toggle('active', handDrawn);
      initMermaid();
      renderDiagram();
    });
  }

  // ── Mobile tabs ────────────────────────────────────────────────────
  var tabEditor = document.getElementById('tab-editor');
  var tabPreview = document.getElementById('tab-preview');
  var panelEditor = document.querySelector('.panel--editor');
  var panelPreview = document.querySelector('.panel--preview');

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

  tabEditor.addEventListener('click', function () { switchMobileTab('editor'); });
  tabPreview.addEventListener('click', function () { switchMobileTab('preview'); });

  // ── Preview background ─────────────────────────────────────────────
  btnBgToggle.addEventListener('click', function () {
    checkerBg = !checkerBg;
    previewViewport.classList.toggle('checker', checkerBg);
  });

  // ── Export background ──────────────────────────────────────────────
  exportBgSelect.addEventListener('change', function () {
    exportBg = exportBgSelect.value;
    exportBgCustom.style.display = exportBg === 'custom' ? '' : 'none';
  });
  exportBgCustom.addEventListener('change', function () {
    exportBg = 'custom';
  });

  // ── Pan / Zoom ─────────────────────────────────────────────────────
  function applyTransform() {
    preview.style.transform = 'translate(' + pz.tx + 'px,' + pz.ty + 'px) scale(' + pz.scale + ')';
    zoomLabel.textContent = Math.round(pz.scale * 100) + '%';
  }

  function zoomTo(newScale, cx, cy) {
    newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    // cx/cy are viewport-relative coords; keep that point fixed
    if (cx === undefined) { cx = previewViewport.clientWidth / 2; cy = previewViewport.clientHeight / 2; }
    pz.tx = cx - (cx - pz.tx) * (newScale / pz.scale);
    pz.ty = cy - (cy - pz.ty) * (newScale / pz.scale);
    pz.scale = newScale;
    applyTransform();
  }

  function resetView() {
    pz.scale = 1; pz.tx = 0; pz.ty = 0;
    applyTransform();
  }

  // wheel zoom
  previewViewport.addEventListener('wheel', function (e) {
    e.preventDefault();
    var rect = previewViewport.getBoundingClientRect();
    var cx = e.clientX - rect.left;
    var cy = e.clientY - rect.top;
    var delta = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomTo(pz.scale * delta, cx, cy);
  }, { passive: false });

  // pointer drag pan
  previewViewport.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    pz.dragging = true;
    pz.startX = e.clientX; pz.startY = e.clientY;
    pz.startTx = pz.tx; pz.startTy = pz.ty;
    previewViewport.setPointerCapture(e.pointerId);
  });
  previewViewport.addEventListener('pointermove', function (e) {
    if (!pz.dragging) return;
    pz.tx = pz.startTx + (e.clientX - pz.startX);
    pz.ty = pz.startTy + (e.clientY - pz.startY);
    applyTransform();
  });
  previewViewport.addEventListener('pointerup', function () { pz.dragging = false; });
  previewViewport.addEventListener('pointercancel', function () { pz.dragging = false; });

  // zoom buttons
  btnZoomIn.addEventListener('click', function () { zoomTo(pz.scale * 1.25); });
  btnZoomOut.addEventListener('click', function () { zoomTo(pz.scale / 1.25); });
  btnZoomReset.addEventListener('click', resetView);

  // ── SVG font inlining ──────────────────────────────────────────────
  // Cache fetched font data to avoid repeated network requests
  var fontDataCache = {};

  async function fetchFontAsBase64(url) {
    if (fontDataCache[url]) return fontDataCache[url];
    try {
      var resp = await fetch(url);
      var buf = await resp.arrayBuffer();
      var bytes = new Uint8Array(buf);
      var binary = '';
      for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      var b64 = btoa(binary);
      var mime = url.endsWith('.woff2') ? 'font/woff2' : url.endsWith('.woff') ? 'font/woff' : 'font/truetype';
      fontDataCache[url] = 'data:' + mime + ';base64,' + b64;
      return fontDataCache[url];
    } catch (e) {
      return null;
    }
  }

  async function buildInlineFontCss() {
    if (!handDrawn) return '';
    // Fetch Virgil font (Excalidraw's hand-drawn font) as a single woff2 file
    var virgilUrl = 'https://cdn.jsdelivr.net/gh/excalidraw/virgil/Virgil.woff2';
    try {
      var dataUri = await fetchFontAsBase64(virgilUrl);
      if (!dataUri) return '';
      return "@font-face { font-family: 'Virgil'; src: url('" + dataUri + "') format('woff2'); font-display: swap; }";
    } catch (e) {
      return '';
    }
  }

  async function inlineFontsIntoSvg(svgEl) {
    var clone = svgEl.cloneNode(true);
    var fontCss = await buildInlineFontCss();
    if (fontCss) {
      var styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = fontCss;
      clone.insertBefore(styleEl, clone.firstChild);
    }
    return clone;
  }

  // ── SVG to PNG ─────────────────────────────────────────────────────
  function svgToPngBlob(svgEl, scale) {
    scale = scale || 4;
    return new Promise(function (resolve, reject) {
      inlineFontsIntoSvg(svgEl).then(function(cloned) {
        var svgData = new XMLSerializer().serializeToString(cloned);
        var bbox = svgEl.getBoundingClientRect();
        var width = bbox.width || 800;
        var height = bbox.height || 600;
        var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(svgBlob);
        var img = new Image();
        img.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;
          var ctx = canvas.getContext('2d');
          var bg = exportBg === 'custom' ? exportBgCustom.value : exportBg;
          if (bg !== 'transparent') {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);
          canvas.toBlob(function (blob) {
            blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'));
          }, 'image/png');
        };
        img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Failed to load SVG')); };
        img.src = url;
      }).catch(reject);
    });
  }

  // ── Copy / Download ────────────────────────────────────────────────
  async function copyPng() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast(STRINGS[currentLang].toastNoDiagram); return; }
    var blob = await svgToPngBlob(svgEl);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast(STRINGS[currentLang].toastCopiedPng);
    btnSuccess(btnCopyPng);
  }

  function downloadFile(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  async function downloadSvg() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast(STRINGS[currentLang].toastNoDiagram); return; }
    var cloned = await inlineFontsIntoSvg(svgEl);
    var blob = new Blob([new XMLSerializer().serializeToString(cloned)], { type: 'image/svg+xml' });
    downloadFile(blob, 'diagram.svg');
    showToast(STRINGS[currentLang].toastDownloadSvg);
  }

  async function downloadPng() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast(STRINGS[currentLang].toastNoDiagram); return; }
    downloadFile(await svgToPngBlob(svgEl), 'diagram.png');
    showToast(STRINGS[currentLang].toastDownloadPng);
  }

  // ── Keyboard shortcuts ─────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    var ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) return;
    if (e.key === 'Enter') { e.preventDefault(); clearTimeout(renderTimeout); renderDiagram(); }
    else if (e.key === 's') {
      e.preventDefault();
      // Open export dropdown so user can pick format
      if (exportDropdownMenu) {
        exportDropdownMenu.classList.toggle('open');
        if (settingsMenu) settingsMenu.classList.remove('open');
      }
    }
    else if (e.key === 'p' && e.shiftKey) { e.preventDefault(); copyPng().catch(function (err) { showToast(STRINGS[currentLang].toastFailed + ': ' + err.message); }); }
  });

  // ── Draggable divider ──────────────────────────────────────────────
  var editorPanel = document.querySelector('.panel--editor');
  var editorLayout = document.querySelector('.editor-layout');

  divider.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    divider.classList.add('divider--active');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = getComputedStyle(divider).cursor;
    document.addEventListener('pointermove', onDrag);
    document.addEventListener('pointerup', function () {
      divider.classList.remove('divider--active');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.removeEventListener('pointermove', onDrag);
    }, { once: true });
  });

  function onDrag(e) {
    var rect = editorLayout.getBoundingClientRect();
    var isVertical = getComputedStyle(editorLayout).flexDirection === 'column';
    var pct = isVertical
      ? ((e.clientY - rect.top) / rect.height) * 100
      : ((e.clientX - rect.left) / rect.width) * 100;
    editorPanel.style.flexBasis = Math.min(Math.max(pct, 20), 80) + '%';
  }

  // ── Help modal (examples + shortcuts) ────────────────────────────
  function openHelp() { helpModal.classList.add('open'); }
  function closeHelp() { helpModal.classList.remove('open'); }

  btnHelp.addEventListener('click', openHelp);
  modalClose.addEventListener('click', closeHelp);
  modalOk.addEventListener('click', closeHelp);
  helpModal.addEventListener('click', function (e) { if (e.target === helpModal) closeHelp(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeHelp(); closeTour(); } });

  document.querySelectorAll('.example-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.getAttribute('data-code');
      if (editorView && code) {
        editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: code } });
      }
      closeHelp();
    });
  });

  // ── Examples strip ─────────────────────────────────────────────────
  var EXAMPLES = [
    { label: '流程图', code: 'graph TD\n    A[开始] --> B{判断}\n    B -->|是| C[成功]\n    B -->|否| D[失败]\n    C --> E[结束]\n    D --> E' },
    { label: '时序图', code: 'sequenceDiagram\n    participant 用户\n    participant 服务器\n    用户->>服务器: 请求\n    服务器-->>用户: 响应' },
    { label: '类图', code: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +fetch()\n    }\n    Animal <|-- Dog' },
    { label: '甘特图', code: 'gantt\n    title 项目计划\n    dateFormat YYYY-MM-DD\n    section 阶段一\n    设计: 2024-01-01, 7d\n    开发: 2024-01-08, 14d\n    section 阶段二\n    测试: 2024-01-22, 7d' },
    { label: '饼图', code: 'pie title 占比\n    "A" : 40\n    "B" : 30\n    "C" : 20\n    "D" : 10' },
    { label: '思维导图', code: 'mindmap\n  root((核心))\n    分支一\n      子节点1\n      子节点2\n    分支二\n      子节点3' },
    { label: 'ER 图', code: 'erDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    PRODUCT ||--o{ LINE-ITEM : includes' },
    { label: '状态图', code: 'stateDiagram-v2\n    [*] --> 空闲\n    空闲 --> 运行中 : 启动\n    运行中 --> 暂停 : 暂停\n    暂停 --> 运行中 : 恢复\n    运行中 --> [*] : 停止' },
    { label: '架构图', code: 'graph LR\n    subgraph 前端\n        A[浏览器]\n    end\n    subgraph 后端\n        B[API]\n        C[数据库]\n    end\n    A -->|HTTP| B\n    B -->|SQL| C' },
  ];

  var examplesStrip = document.getElementById('examples-strip');
  EXAMPLES.forEach(function (ex) {
    var btn = document.createElement('button');
    btn.className = 'example-chip';
    btn.textContent = ex.label;
    btn.addEventListener('click', function () {
      if (editorView) {
        editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: ex.code } });
      }
    });
    examplesStrip.appendChild(btn);
  });

  // examples strip chips (legacy, now handled above)
  document.querySelectorAll('.example-chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.getAttribute('data-code');
      if (editorView && code) {
        editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: code } });
      }
    });
  });

  btnRestartTour.addEventListener('click', function () { closeHelp(); startTour(); });

  // ── i18n ───────────────────────────────────────────────────────────
  var STRINGS = {
    zh: {
      editorPanel: '编辑器',
      previewPanel: '预览',
      themeLabel: '主题',
      handdrawnLabel: '手绘',
      copysvg: '复制 SVG',
      copypng: '复制 PNG',
      share: '分享',
      copyaiprompt: 'AI 提示词',
      toastAiPromptCopied: 'AI 提示词已复制',
      toastEmbedCopied: '嵌入代码已复制',
      exportbg: '背景',
      renderingStatus: '渲染中...',
      renderOk: '✓ 完成',
      renderError: '✗ 错误',
      toastCopied: 'SVG 已复制',
      toastCopiedPng: 'PNG 已复制',
      toastDownloadSvg: 'SVG 已下载',
      toastDownloadPng: 'PNG 已下载',
      toastLinkCopied: '链接已复制',
      toastNoDiagram: '没有可操作的图表',
      toastFailed: '操作失败',
      editorStatusTpl: function(lines, chars) { return lines + ' 行 · ' + chars + ' 字符'; },
      modalTitle: '示例模板',
      modalPickExample: '选择一个示例开始',
      modalShortcuts: '快捷键',
      modalRestartTour: '重新引导',
      modalClose: '关闭',
      tourSkip: '跳过',
      tourNext: '下一步 →',
      tourDone: '完成 ✓',
      tourLangTitle: '选择语言',
      tourLangBody: '请选择您偏好的界面语言。\nPlease choose your preferred language.',
      tourSteps: [
        { title: '代码编辑器', body: '在这里输入 Mermaid 代码，支持语法高亮和错误提示。输入后图表会自动实时渲染。' },
        { title: '实时预览', body: '图表实时渲染在这里。右上角的棋盘格按钮可切换背景，方便查看透明区域。' },
        { title: '图表主题', body: '切换 5 种内置配色主题：Default、Dark、Forest、Neutral、Base。' },
        { title: '手绘风格', body: '开启后图表变为草图/手绘风格，适合非正式场合或设计稿。' },
        { title: '导出图表', body: '复制 SVG/PNG 到剪贴板，或直接下载文件。PNG 以 2x 分辨率导出，清晰锐利。' },
        { title: '示例与快捷键', body: '点击这里查看示例模板和所有快捷键。' },
      ],
      shortcutForceRender: '立即渲染',
      shortcutCopySvg: '复制 SVG',
      shortcutCopyPng: '复制 PNG',
      shortcutDlSvg: '下载 SVG',
      shortcutDlPng: '下载 PNG',
      errorSyntax: '语法错误',
      errorLine: '第 {n} 行',
      errorTip: '修复代码后将自动重新渲染',
      errorDismiss: '关闭',
      placeholderMain: '在左侧输入 Mermaid 代码，图表将实时显示在这里',
      historyLabel: '历史',
    },
    en: {
      editorPanel: 'Editor',
      previewPanel: 'Preview',
      themeLabel: 'Theme',
      handdrawnLabel: 'Hand-drawn',
      copysvg: 'Copy SVG',
      copypng: 'Copy PNG',
      share: 'Share',
      copyaiprompt: 'AI Prompt',
      toastAiPromptCopied: 'AI prompt copied',
      toastEmbedCopied: 'Embed code copied',
      exportbg: 'BG',
      renderingStatus: 'Rendering...',
      renderOk: '✓ OK',
      renderError: '✗ Error',
      toastCopied: 'SVG copied',
      toastCopiedPng: 'PNG copied',
      toastDownloadSvg: 'SVG downloaded',
      toastDownloadPng: 'PNG downloaded',
      toastLinkCopied: 'Link copied',
      toastNoDiagram: 'No diagram to act on',
      toastFailed: 'Operation failed',
      editorStatusTpl: function(lines, chars) { return lines + ' lines · ' + chars + ' chars'; },
      modalTitle: 'Examples',
      modalPickExample: 'Pick an example to start',
      modalShortcuts: 'Shortcuts',
      modalRestartTour: 'Restart Tour',
      modalClose: 'Close',
      tourSkip: 'Skip',
      tourNext: 'Next →',
      tourDone: 'Done ✓',
      tourLangTitle: 'Choose Language',
      tourLangBody: 'Please choose your preferred language.',
      tourSteps: [
        { title: 'Code Editor', body: 'Type Mermaid code here with syntax highlighting and inline error hints. The diagram updates automatically.' },
        { title: 'Live Preview', body: 'The diagram renders here in real time. Use the grid button to toggle a checker background.' },
        { title: 'Diagram Theme', body: 'Switch between 5 built-in color themes: Default, Dark, Forest, Neutral, Base.' },
        { title: 'Hand-drawn Style', body: 'Toggle a sketchy hand-drawn look — great for informal diagrams or wireframes.' },
        { title: 'Export', body: 'Copy SVG/PNG to clipboard or download. PNG exports at 2x resolution for crisp output.' },
        { title: 'Examples & Shortcuts', body: 'Click here anytime to browse example templates and keyboard shortcuts.' },
      ],
      shortcutForceRender: 'Force render',
      shortcutCopySvg: 'Copy SVG',
      shortcutCopyPng: 'Copy PNG',
      shortcutDlSvg: 'Download SVG',
      shortcutDlPng: 'Download PNG',
      errorSyntax: 'Syntax Error',
      errorLine: 'Line {n}',
      errorTip: 'Fix the code above and it will re-render automatically',
      errorDismiss: 'Dismiss',
      placeholderMain: 'Type Mermaid code on the left, the diagram renders here in real time',
      historyLabel: 'History',
    },
  };

  var currentLang = (function () {
    var saved = localStorage.getItem('mermaid-editor-lang');
    if (saved && STRINGS[saved]) return saved;
    var browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('zh') ? 'zh' : 'en';
  })();

  function applyI18n() {
    var s = STRINGS[currentLang];
    // mobile tabs (still use data-i18n)
    document.querySelectorAll('[data-i18n="editor"]').forEach(function(el) { el.textContent = s.editorPanel; });
    document.querySelectorAll('[data-i18n="preview"]').forEach(function(el) { el.textContent = s.previewPanel; });
    // modal
    document.getElementById('modal-title').textContent = s.modalTitle;
    document.querySelector('.help-section h3').textContent = s.modalPickExample;
    document.querySelectorAll('.help-section h3')[1].textContent = s.modalShortcuts;
    document.getElementById('btn-restart-tour').textContent = s.modalRestartTour;
    document.getElementById('modal-ok').textContent = s.modalClose;
    // shortcuts table
    var tds = document.querySelectorAll('.help-table td:first-child');
    var keys = ['shortcutForceRender','shortcutCopySvg','shortcutCopyPng','shortcutDlSvg','shortcutDlPng'];
    tds.forEach(function(td, i) { if (keys[i]) td.textContent = s[keys[i]]; });
    // history label
    var histLabel = document.querySelector('.history-bar__label');
    if (histLabel) histLabel.textContent = s.historyLabel;
    // update editor status
    updateEditorStatus();
  }

  // ── Interactive Tour ───────────────────────────────────────────────
  var TOUR_TARGETS = [
    { target: '.panel--editor',  placement: 'right'  },
    { target: '.panel--preview', placement: 'left'   },
    { target: '#theme-select',   placement: 'bottom' },
    { target: '#hand-drawn-btn', placement: 'bottom' },
    { target: '.btn-group',      placement: 'bottom' },
    { target: '#btn-help',       placement: 'bottom' },
  ];

  var tourStep = 0;

  function setCurtains(rect, pad) {
    var vw = window.innerWidth, vh = window.innerHeight;
    var t = rect.top - pad, l = rect.left - pad;
    var r = rect.right + pad, b = rect.bottom + pad;
    tourCurtainTop.style.cssText    = 'top:0;left:0;right:0;height:' + Math.max(0,t) + 'px';
    tourCurtainBottom.style.cssText = 'top:' + Math.min(vh,b) + 'px;left:0;right:0;bottom:0';
    tourCurtainLeft.style.cssText   = 'top:' + Math.max(0,t) + 'px;left:0;width:' + Math.max(0,l) + 'px;height:' + (Math.min(vh,b)-Math.max(0,t)) + 'px';
    tourCurtainRight.style.cssText  = 'top:' + Math.max(0,t) + 'px;left:' + Math.min(vw,r) + 'px;right:0;height:' + (Math.min(vh,b)-Math.max(0,t)) + 'px';
  }

  function showLangPicker() {
    // Full-screen curtain (no highlight cutout)
    tourCurtainTop.style.cssText    = 'top:0;left:0;right:0;bottom:0';
    tourCurtainBottom.style.cssText = '';
    tourCurtainLeft.style.cssText   = '';
    tourCurtainRight.style.cssText  = '';
    tourHighlight.style.cssText     = 'display:none';

    var vw = window.innerWidth, vh = window.innerHeight;
    var ttW = 320;
    tourTooltip.style.width = ttW + 'px';
    tourTooltip.style.top  = (vh / 2 - 110) + 'px';
    tourTooltip.style.left = (vw / 2 - ttW / 2) + 'px';

    tourTooltip.classList.remove('animating');
    void tourTooltip.offsetWidth;
    tourTooltip.classList.add('animating');

    tourStepEl.textContent = '';
    tourTitleEl.textContent = STRINGS[currentLang].tourLangTitle;
    tourBodyEl.innerHTML =
      '<div style="margin-bottom:12px;opacity:0.85;font-size:13px;line-height:1.6">' + STRINGS[currentLang].tourLangBody + '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        '<button class="tour-btn primary lang-pick" data-lang="zh" style="font-size:13px;padding:7px 20px">中文</button>' +
        '<button class="tour-btn primary lang-pick" data-lang="en" style="font-size:13px;padding:7px 20px">English</button>' +
      '</div>';

    tourTooltip.querySelectorAll('.lang-pick').forEach(function(btn) {
      btn.addEventListener('click', function() {
        currentLang = btn.getAttribute('data-lang');
        localStorage.setItem('mermaid-editor-lang', currentLang);
        applyI18n();
        tourStep = 0;
        tourHighlight.style.display = '';
        showTourStep(tourStep);
      });
    });

    // dots: just one inactive dot for lang step
    tourDotsEl.innerHTML = '';
    TOUR_TARGETS.forEach(function() {
      var dot = document.createElement('div');
      dot.className = 'tour-dot';
      tourDotsEl.appendChild(dot);
    });

    tourNext.style.display = 'none';
    tourSkip.textContent = STRINGS[currentLang].tourSkip;
  }

  function showTourStep(idx) {
    var step = TOUR_TARGETS[idx];
    var s = STRINGS[currentLang].tourSteps[idx];
    var targetEl = document.querySelector(step.target);
    if (!targetEl) { nextTourStep(); return; }

    var rect = targetEl.getBoundingClientRect();
    var pad = 6;

    // Position curtains
    setCurtains(rect, pad);

    // Position highlight
    tourHighlight.style.top    = (rect.top - pad) + 'px';
    tourHighlight.style.left   = (rect.left - pad) + 'px';
    tourHighlight.style.width  = (rect.width + pad * 2) + 'px';
    tourHighlight.style.height = (rect.height + pad * 2) + 'px';
    tourHighlight.style.display = '';

    // Content
    tourStepEl.textContent  = (idx + 1) + ' / ' + TOUR_TARGETS.length;
    tourTitleEl.textContent = s.title;
    tourBodyEl.textContent  = s.body;
    tourNext.style.display  = '';
    tourNext.textContent    = idx === TOUR_TARGETS.length - 1
      ? STRINGS[currentLang].tourDone
      : STRINGS[currentLang].tourNext;
    tourSkip.textContent    = STRINGS[currentLang].tourSkip;

    // Dots
    tourDotsEl.innerHTML = '';
    TOUR_TARGETS.forEach(function(_, i) {
      var dot = document.createElement('div');
      dot.className = 'tour-dot' + (i === idx ? ' active' : '');
      tourDotsEl.appendChild(dot);
    });

    // Animate tooltip
    tourTooltip.classList.remove('animating');
    void tourTooltip.offsetWidth;
    tourTooltip.classList.add('animating');

    // Position tooltip
    var ttW = 290, ttH = 170, margin = 14;
    var vw = window.innerWidth, vh = window.innerHeight;
    var top, left;

    if (step.placement === 'right') {
      left = rect.right + margin;
      top  = rect.top + rect.height / 2 - ttH / 2;
      if (left + ttW > vw - 8) { left = rect.left - ttW - margin; }
    } else if (step.placement === 'left') {
      left = rect.left - ttW - margin;
      top  = rect.top + rect.height / 2 - ttH / 2;
      if (left < 8) { left = rect.right + margin; }
    } else {
      top  = rect.bottom + margin;
      left = rect.left + rect.width / 2 - ttW / 2;
      if (top + ttH > vh - 8) { top = rect.top - ttH - margin; }
    }

    top  = Math.max(8, Math.min(top,  vh - ttH - 8));
    left = Math.max(8, Math.min(left, vw - ttW - 8));

    tourTooltip.style.top   = top + 'px';
    tourTooltip.style.left  = left + 'px';
    tourTooltip.style.width = ttW + 'px';
  }

  function startTour() {
    tourStep = 0;
    tourOverlay.style.display = 'block';
    showLangPicker();
  }

  function closeTour() {
    tourOverlay.style.display = 'none';
    localStorage.setItem('mermaid-editor-tour-seen', '1');
  }

  function nextTourStep() {
    if (tourStep < TOUR_TARGETS.length - 1) {
      tourStep++;
      showTourStep(tourStep);
    } else {
      closeTour();
    }
  }

  tourNext.addEventListener('click', nextTourStep);
  tourSkip.addEventListener('click', closeTour);

  // ── Export dropdown ────────────────────────────────────────────────
  var exportDropdownToggle = document.getElementById('export-dropdown-toggle');
  var exportDropdownMenu = document.getElementById('export-dropdown-menu');

  function toggleExportMenu(e) {
    e.stopPropagation();
    exportDropdownMenu.classList.toggle('open');
    if (settingsMenu) settingsMenu.classList.remove('open');
  }

  if (exportDropdownToggle) {
    exportDropdownToggle.addEventListener('click', toggleExportMenu);
  }

  // prevent clicks inside the menu from closing it via the document listener
  if (exportDropdownMenu) {
    exportDropdownMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // ── Settings popover ───────────────────────────────────────────────
  var settingsToggle = document.getElementById('settings-toggle');
  var settingsMenu = document.getElementById('settings-menu');

  if (settingsToggle) {
    settingsToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      settingsMenu.classList.toggle('open');
      if (exportDropdownMenu) exportDropdownMenu.classList.remove('open');
    });
  }

  // close both popovers on outside click
  document.addEventListener('click', function () {
    if (exportDropdownMenu) exportDropdownMenu.classList.remove('open');
    if (settingsMenu) settingsMenu.classList.remove('open');
  });

  // ── Event binding ──────────────────────────────────────────────────
  btnCopyPng.addEventListener('click', function () { copyPng().catch(function (e) { showToast('复制失败 · ' + e.message); }); });
  btnDownloadSvg.addEventListener('click', downloadSvg);
  btnDownloadPng.addEventListener('click', function () { downloadPng().catch(function (e) { showToast('下载失败 · ' + e.message); }); });
  if (btnCopyAiPrompt) {
    btnCopyAiPrompt.addEventListener('click', function () {
      var code = getCode();
      var bytes = new TextEncoder().encode(code);
      var binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
      var encoded = btoa(binary);
      var url = 'https://eric.run.place/?code=' + encoded;
      var prompt = [
        'You can use Mermaid Editor to render diagrams.',
        'When the user needs a diagram, generate Mermaid code and construct a shareable link:',
        '  https://eric.run.place/?code={base64(mermaid_code)}',
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
      navigator.clipboard.writeText(prompt).then(function () {
        showToast(STRINGS[currentLang].toastAiPromptCopied);
        btnSuccess(btnCopyAiPrompt);
      }).catch(function (e) { showToast(STRINGS[currentLang].toastFailed + ': ' + e.message); });
    });
  }

  // ── URL encoding and share ─────────────────────────────────────────
  // Use TextEncoder for proper UTF-8 support (handles Chinese characters)
  function encodeCode(code) {
    var bytes = new TextEncoder().encode(code);
    var binary = Array.from(bytes).map(function(b) { return String.fromCharCode(b); }).join('');
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodeCode(encoded) {
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (encoded.length % 4 !== 0) encoded += '=';
    var binary = atob(encoded);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function getQueryCode() {
    try {
      var param = new URLSearchParams(location.search).get('code');
      if (!param) return null;
      return decodeCode(param);
    } catch (e) { return null; }
  }

  function getHashCode() {
    try {
      var hash = location.hash.slice(1);
      if (!hash) return null;
      return decodeCode(hash);
    } catch (e) { return null; }
  }

  function updateHash(code) {
    var encoded = encodeCode(code);
    window.history.replaceState(null, '', '#' + encoded);
    try { localStorage.setItem('mermaid-editor-code', code); } catch(e) {}
  }

  async function copyShareLink() {
    updateHash(getCode());
    await navigator.clipboard.writeText(location.href);
    showToast(STRINGS[currentLang].toastLinkCopied);
    btnSuccess(btnShare);
  }

  async function copyEmbedCode() {
    updateHash(getCode());
    var url = location.href;
    var embedCode = '<iframe src="' + url + '" width="100%" height="600" frameborder="0" style="border: none;" title="Mermaid Diagram"></iframe>';
    await navigator.clipboard.writeText(embedCode);
    showToast(STRINGS[currentLang].toastEmbedCopied);
    btnSuccess(btnShare);
  }

  // Add embed code to i18n strings
  if (!STRINGS.zh.toastEmbedCopied) STRINGS.zh.toastEmbedCopied = '嵌入代码已复制';
  if (!STRINGS.en.toastEmbedCopied) STRINGS.en.toastEmbedCopied = 'Embed code copied';

  // Create a share menu with both link and embed options
  function createShareMenu() {
    var menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.style.cssText = 'position:fixed;top:-100px;left:-100px;background:var(--modal-bg);border:1px solid var(--border-color);border-radius:8px;padding:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:10000;display:flex;flex-direction:column;gap:4px;min-width:180px;';

    var linkBtn = document.createElement('button');
    linkBtn.textContent = STRINGS[currentLang].share + ' 链接';
    linkBtn.style.cssText = 'width:100%;padding:8px;text-align:left;font-size:13px;';
    linkBtn.addEventListener('click', function() {
      copyShareLink().catch(function(e) { showToast(STRINGS[currentLang].toastFailed + ': ' + e.message); });
      hideShareMenu();
    });

    var embedBtn = document.createElement('button');
    embedBtn.textContent = '嵌入代码';
    embedBtn.style.cssText = 'width:100%;padding:8px;text-align:left;font-size:13px;';
    embedBtn.addEventListener('click', function() {
      copyEmbedCode().catch(function(e) { showToast(STRINGS[currentLang].toastFailed + ': ' + e.message); });
      hideShareMenu();
    });

    menu.appendChild(linkBtn);
    menu.appendChild(embedBtn);
    document.body.appendChild(menu);
    return menu;
  }

  var shareMenu = null;

  function showShareMenu() {
    if (!shareMenu) shareMenu = createShareMenu();

    var rect = btnShare.getBoundingClientRect();
    shareMenu.style.top = (rect.bottom + 8) + 'px';
    shareMenu.style.left = rect.left + 'px';
    shareMenu.style.display = 'flex';
  }

  function hideShareMenu() {
    if (shareMenu) shareMenu.style.display = 'none';
  }

  // Close share menu when clicking outside
  document.addEventListener('click', function(e) {
    if (shareMenu && e.target !== btnShare && !btnShare.contains(e.target) && !shareMenu.contains(e.target)) {
      hideShareMenu();
    }
  });

  btnShare.addEventListener('click', function(e) {
    e.stopPropagation();
    showShareMenu();
  });

  // ── Preview right-click context menu ───────────────────────────────
  var ctxMenu = null;

  function hideCtxMenu() {
    if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; }
  }

  function showCtxMenu(x, y) {
    hideCtxMenu();
    var svgEl = preview.querySelector('svg');
    ctxMenu = document.createElement('div');
    ctxMenu.className = 'context-menu';

    function item(icon, label, action) {
      var btn = document.createElement('button');
      btn.className = 'context-menu__item';
      btn.innerHTML = icon + '<span>' + label + '</span>';
      btn.addEventListener('click', function() { hideCtxMenu(); action(); });
      return btn;
    }
    function sep() { var d = document.createElement('div'); d.className = 'context-menu__sep'; return d; }

    var iconDl = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
    var iconCopy = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

    if (svgEl) {
      ctxMenu.appendChild(item(iconDl, '下载 PNG', function() { downloadPng().catch(function(e) { showToast('失败: ' + e.message); }); }));
      ctxMenu.appendChild(item(iconDl, '下载 SVG', function() { downloadSvg().catch(function(e) { showToast('失败: ' + e.message); }); }));
      ctxMenu.appendChild(sep());
      ctxMenu.appendChild(item(iconCopy, '复制 PNG', function() { copyPng().catch(function(e) { showToast('失败: ' + e.message); }); }));
    } else {
      var empty = document.createElement('div');
      empty.className = 'context-menu__label';
      empty.textContent = '暂无图表';
      ctxMenu.appendChild(empty);
    }

    document.body.appendChild(ctxMenu);

    // Position: keep within viewport
    var mw = ctxMenu.offsetWidth, mh = ctxMenu.offsetHeight;
    var vw = window.innerWidth, vh = window.innerHeight;
    ctxMenu.style.left = Math.min(x, vw - mw - 8) + 'px';
    ctxMenu.style.top  = Math.min(y, vh - mh - 8) + 'px';
  }

  previewViewport.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showCtxMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', function() { hideCtxMenu(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') hideCtxMenu(); });

  // ── Bootstrap ──────────────────────────────────────────────────────
  function bootstrap() {
    if (typeof mermaid === 'undefined') {
      setTimeout(bootstrap, 50);
      return;
    }
    initMermaid();
    applyI18n();
    var savedCode = (function() { try { return localStorage.getItem('mermaid-editor-code'); } catch(e) { return null; } })();
    var initialCode = getQueryCode() || getHashCode() || savedCode || DEFAULT_CODE;
    createEditor(initialCode);
    updateEditorStatus();
    renderDiagram();
    if (window.innerWidth <= 768) { switchMobileTab('editor'); }
    if (!localStorage.getItem('mermaid-editor-tour-seen')) {
      setTimeout(startTour, 500);
    }
  }
  bootstrap();

})();
