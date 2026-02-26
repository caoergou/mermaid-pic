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
  var handDrawnToggle = document.getElementById('hand-drawn-toggle');
  var uiThemeToggle = document.getElementById('ui-theme-toggle');
  var btnCopySvg = document.getElementById('btn-copy-svg');
  var btnCopyPng = document.getElementById('btn-copy-png');
  var btnDownloadSvg = document.getElementById('btn-download-svg');
  var btnDownloadPng = document.getElementById('btn-download-png');
  var btnShare = document.getElementById('btn-share');
  var btnBgToggle = document.getElementById('btn-bg-toggle');
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
    editorStatus.textContent = lines + ' 行 lines · ' + val.length + ' 字符 chars';
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
    var handwritingFont = "'Long Cang', 'Caveat', cursive";
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
      preview.innerHTML = '<p class="placeholder">在左侧输入 Mermaid 代码，图表将实时显示在这里<br><small>Type Mermaid code on the left, the diagram renders here in real time</small></p>';
      setRenderStatus('', '');
      clearDiagnostics();
      return;
    }
    setRenderStatus('rendering', '渲染中 Rendering...');
    // some diagram types have known issues with handDrawn look; fall back to classic
    var noHandDrawn = /^\s*(classDiagram|stateDiagram|erDiagram|gantt|pie|mindmap|timeline|xychart)/i.test(code);
    var handwritingFont = "'Long Cang', 'Caveat', cursive";
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
      setRenderStatus('ok', '✓ OK');
      clearDiagnostics();
      setTimeout(function () { setRenderStatus('', ''); }, 1500);
    } catch (err) {
      preview.innerHTML = '<pre class="error">' + escapeHtml(err.message || String(err)) + '</pre>';
      setRenderStatus('error', '✗ 错误 Error');
      pushDiagnosticFromError(err.message || String(err));
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

  // Set hand-drawn toggle to checked by default
  handDrawnToggle.checked = true;

  handDrawnToggle.addEventListener('change', function () {
    handDrawn = handDrawnToggle.checked;
    initMermaid();
    renderDiagram();
  });

  // ── Preview background ─────────────────────────────────────────────
  btnBgToggle.addEventListener('click', function () {
    checkerBg = !checkerBg;
    previewViewport.classList.toggle('checker', checkerBg);
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

  // ── SVG to PNG ─────────────────────────────────────────────────────
  function svgToPngBlob(svgEl, scale) {
    scale = scale || 2;
    return new Promise(function (resolve, reject) {
      var svgData = new XMLSerializer().serializeToString(svgEl);
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
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob(function (blob) {
          blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'));
        }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Failed to load SVG')); };
      img.src = url;
    });
  }

  // ── Copy / Download ────────────────────────────────────────────────
  async function copySvg() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast('没有可复制的图表 · No diagram'); return; }
    await navigator.clipboard.writeText(new XMLSerializer().serializeToString(svgEl));
    showToast('SVG 已复制到剪贴板 · Copied');
    btnSuccess(btnCopySvg);
  }

  async function copyPng() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast('没有可复制的图表 · No diagram'); return; }
    var blob = await svgToPngBlob(svgEl);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast('PNG 已复制到剪贴板 · Copied');
    btnSuccess(btnCopyPng);
  }

  function downloadFile(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  function downloadSvg() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast('没有可下载的图表 · No diagram'); return; }
    var blob = new Blob([new XMLSerializer().serializeToString(svgEl)], { type: 'image/svg+xml' });
    downloadFile(blob, 'diagram.svg');
    showToast('SVG 已下载 · Downloaded');
  }

  async function downloadPng() {
    var svgEl = preview.querySelector('svg');
    if (!svgEl) { showToast('没有可下载的图表 · No diagram'); return; }
    downloadFile(await svgToPngBlob(svgEl), 'diagram.png');
    showToast('PNG 已下载 · Downloaded');
  }

  // ── Keyboard shortcuts ─────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    var ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) return;
    if (e.key === 'Enter') { e.preventDefault(); clearTimeout(renderTimeout); renderDiagram(); }
    else if (e.key === 's' && !e.shiftKey) { e.preventDefault(); downloadSvg(); }
    else if (e.key === 's' && e.shiftKey) { e.preventDefault(); downloadPng().catch(function (err) { showToast('下载失败 · Failed: ' + err.message); }); }
    else if (e.key === 'c' && e.shiftKey) { e.preventDefault(); copySvg().catch(function (err) { showToast('复制失败 · Failed: ' + err.message); }); }
    else if (e.key === 'p' && e.shiftKey) { e.preventDefault(); copyPng().catch(function (err) { showToast('复制失败 · Failed: ' + err.message); }); }
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

  // ── Interactive Tour ───────────────────────────────────────────────
  var TOUR_STEPS = [
    {
      target: '.panel--editor',
      title: '代码编辑器 · Code Editor',
      body: '在这里输入 Mermaid 代码，支持语法高亮和错误提示。输入后图表会自动实时渲染。\nType Mermaid code here with syntax highlighting and inline error hints. The diagram updates automatically.',
      placement: 'right',
    },
    {
      target: '.panel--preview',
      title: '实时预览 · Live Preview',
      body: '图表实时渲染在这里。右上角的棋盘格按钮可切换背景，方便查看透明区域。\nThe diagram renders here in real time. Use the grid button to toggle a checker background.',
      placement: 'left',
    },
    {
      target: '#theme-select',
      title: '图表主题 · Diagram Theme',
      body: '切换 5 种内置配色主题：Default、Dark、Forest、Neutral、Base。\nSwitch between 5 built-in color themes.',
      placement: 'bottom',
    },
    {
      target: '#hand-drawn-toggle',
      title: '手绘风格 · Hand-drawn Style',
      body: '开启后图表变为草图/手绘风格，适合非正式场合或设计稿。\nToggle a sketchy hand-drawn look — great for informal diagrams or wireframes.',
      placement: 'bottom',
    },
    {
      target: '.btn-group',
      title: '导出图表 · Export',
      body: '复制 SVG/PNG 到剪贴板，或直接下载文件。PNG 以 2x 分辨率导出，清晰锐利。\nCopy SVG/PNG to clipboard or download. PNG exports at 2x resolution for crisp output.',
      placement: 'bottom',
    },
    {
      target: '#btn-help',
      title: '示例与快捷键 · Examples & Shortcuts',
      body: '点击这里查看示例模板和所有快捷键。\nClick here anytime to browse example templates and keyboard shortcuts.',
      placement: 'bottom',
    },
  ];

  var tourStep = 0;

  function startTour() {
    tourStep = 0;
    tourOverlay.style.display = 'block';
    showTourStep(tourStep);
  }

  function closeTour() {
    tourOverlay.style.display = 'none';
    localStorage.setItem('mermaid-editor-tour-seen', '1');
  }

  function showTourStep(idx) {
    var step = TOUR_STEPS[idx];
    var targetEl = document.querySelector(step.target);
    if (!targetEl) { nextTourStep(); return; }

    var rect = targetEl.getBoundingClientRect();
    var pad = 6;

    // Position highlight
    tourHighlight.style.top = (rect.top - pad) + 'px';
    tourHighlight.style.left = (rect.left - pad) + 'px';
    tourHighlight.style.width = (rect.width + pad * 2) + 'px';
    tourHighlight.style.height = (rect.height + pad * 2) + 'px';

    // Content
    tourStepEl.textContent = (idx + 1) + ' / ' + TOUR_STEPS.length;
    tourTitleEl.textContent = step.title;
    tourBodyEl.textContent = step.body;
    tourNext.textContent = idx === TOUR_STEPS.length - 1 ? '完成 Done ✓' : '下一步 Next →';

    // Dots
    tourDotsEl.innerHTML = '';
    TOUR_STEPS.forEach(function (_, i) {
      var dot = document.createElement('div');
      dot.className = 'tour-dot' + (i === idx ? ' active' : '');
      tourDotsEl.appendChild(dot);
    });

    // Position tooltip
    var ttW = 280, ttH = 160, margin = 14;
    var vw = window.innerWidth, vh = window.innerHeight;
    var top, left;

    if (step.placement === 'right') {
      left = rect.right + margin;
      top = rect.top + rect.height / 2 - ttH / 2;
      if (left + ttW > vw - 8) { left = rect.left - ttW - margin; }
    } else if (step.placement === 'left') {
      left = rect.left - ttW - margin;
      top = rect.top + rect.height / 2 - ttH / 2;
      if (left < 8) { left = rect.right + margin; }
    } else { // bottom
      top = rect.bottom + margin;
      left = rect.left + rect.width / 2 - ttW / 2;
      if (top + ttH > vh - 8) { top = rect.top - ttH - margin; }
    }

    top = Math.max(8, Math.min(top, vh - ttH - 8));
    left = Math.max(8, Math.min(left, vw - ttW - 8));

    tourTooltip.style.top = top + 'px';
    tourTooltip.style.left = left + 'px';
    tourTooltip.style.width = ttW + 'px';
  }

  function nextTourStep() {
    if (tourStep < TOUR_STEPS.length - 1) {
      tourStep++;
      showTourStep(tourStep);
    } else {
      closeTour();
    }
  }

  tourNext.addEventListener('click', nextTourStep);
  tourSkip.addEventListener('click', closeTour);

  // ── Event binding ──────────────────────────────────────────────────
  btnCopySvg.addEventListener('click', function () { copySvg().catch(function (e) { showToast('复制失败 · ' + e.message); }); });
  btnCopyPng.addEventListener('click', function () { copyPng().catch(function (e) { showToast('复制失败 · ' + e.message); }); });
  btnDownloadSvg.addEventListener('click', downloadSvg);
  btnDownloadPng.addEventListener('click', function () { downloadPng().catch(function (e) { showToast('下载失败 · ' + e.message); }); });

  // ── URL hash share ─────────────────────────────────────────────────
  function getHashCode() {
    try {
      var hash = location.hash.slice(1);
      if (!hash) return null;
      return new TextDecoder().decode(Uint8Array.from(atob(hash), function(c) { return c.charCodeAt(0); }));
    } catch (e) { return null; }
  }

  function updateHash(code) {
    var bytes = new TextEncoder().encode(code);
    var binary = Array.from(bytes).map(function(b) { return String.fromCharCode(b); }).join('');
    var encoded = btoa(binary);
    window.history.replaceState(null, '', '#' + encoded);
  }

  async function copyShareLink() {
    updateHash(getCode());
    await navigator.clipboard.writeText(location.href);
    showToast('链接已复制 · Link copied');
    btnSuccess(btnShare);
  }

  btnShare.addEventListener('click', function () {
    copyShareLink().catch(function (e) { showToast('复制失败 · ' + e.message); });
  });

  // ── Bootstrap ──────────────────────────────────────────────────────
  function bootstrap() {
    if (typeof mermaid === 'undefined') {
      setTimeout(bootstrap, 50);
      return;
    }
    initMermaid();
    var initialCode = getHashCode() || DEFAULT_CODE;
    createEditor(initialCode);
    updateEditorStatus();
    renderDiagram();
    if (!localStorage.getItem('mermaid-editor-tour-seen')) {
      setTimeout(startTour, 500);
    }
  }
  bootstrap();

})();
