import { state, dom, escapeHtml, setRenderStatus, getHandDrawnFontFamily, getHandDrawnFontSizePx, resolveHandDrawnSeed, HAND_FONTS, getExportBgColor } from './core.js';
import { STRINGS } from './i18n.js';
import { getCode, clearDiagnostics, pushDiagnosticFromError, scrollToLine } from './editor.js';

// ── Mermaid initialization ──────────────────────────────────────────
const NORMAL_FONT = "system-ui, -apple-system, sans-serif";

export function initMermaid() {
  const hdFont = getHandDrawnFontFamily();
  const hdSize = getHandDrawnFontSizePx();
  mermaid.initialize({
    startOnLoad: false,
    theme: state.currentTheme,
    look: state.handDrawn ? 'handDrawn' : 'classic',
    securityLevel: 'loose',
    handDrawnSeed: resolveHandDrawnSeed(),
    themeVariables: {
      fontFamily: state.handDrawn ? hdFont : NORMAL_FONT,
      fontSize: state.handDrawn ? hdSize : '14px',
    },
  });
  dom.preview.style.fontFamily = state.handDrawn ? hdFont : '';
}

export async function renderDiagram() {
  const code = getCode().trim();
  if (!code) {
    dom.preview.innerHTML = '<p class="placeholder">' + STRINGS[state.currentLang].placeholderMain + '</p>';
    setRenderStatus('', '');
    clearDiagnostics();
    return;
  }
  setRenderStatus('rendering', STRINGS[state.currentLang].renderingStatus);

  const noHandDrawn = /^\s*(classDiagram|stateDiagram|erDiagram|gantt|pie|mindmap|timeline|xychart|architecture|block-beta|gitGraph)/i.test(code);
  if (dom.handDrawnBtn) {
    if (state.handDrawn && noHandDrawn) {
      dom.handDrawnBtn.title = '此图类型不支持手绘风格 / Not supported for this diagram type';
      dom.handDrawnBtn.style.opacity = '0.5';
    } else {
      dom.handDrawnBtn.title = '手绘风格 (Hand-drawn style)';
      dom.handDrawnBtn.style.opacity = '';
    }
  }

  const hdFont = getHandDrawnFontFamily();
  const hdSize = getHandDrawnFontSizePx();
  mermaid.initialize({
    startOnLoad: false,
    theme: state.currentTheme,
    look: (state.handDrawn && !noHandDrawn) ? 'handDrawn' : 'classic',
    securityLevel: 'loose',
    handDrawnSeed: resolveHandDrawnSeed(),
    themeVariables: {
      fontFamily: state.handDrawn ? hdFont : NORMAL_FONT,
      fontSize: state.handDrawn ? hdSize : '14px',
    },
  });

  if (state.handDrawn && !noHandDrawn) {
    const preset = HAND_FONTS[state.handDrawnFont] || HAND_FONTS.virgil;
    try { await document.fonts.load('16px ' + preset.label); } catch (e) {}
    try { await document.fonts.load('16px "Xiaolai SC"'); } catch (e) {}
  }

  try {
    await mermaid.parse(code);
  } catch (parseErr) {
    handleRenderError(parseErr, code);
    return;
  }

  try {
    state.renderCounter++;
    const id = 'mermaid-diagram-' + state.renderCounter;
    const result = await mermaid.render(id, code);
    dom.preview.innerHTML = result.svg;
    setRenderStatus('ok', STRINGS[state.currentLang].renderOk);
    clearDiagnostics();
    setTimeout(() => { setRenderStatus('', ''); }, 1500);
  } catch (err) {
    handleRenderError(err, code);
  }
}

// ── Error handling ───────────────────────────────────────────────────

function extractErrorLine(err) {
  const msg = err.message || String(err);
  const lineMatch = msg.match(/line\s+(\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  if (err.hash && err.hash.line != null) return err.hash.line + 1;
  return null;
}

function getFriendlyHint(msg, lang) {
  const lower = msg.toLowerCase();
  if (lang === 'zh') {
    if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return '代码可能不完整，请检查是否有未闭合的括号或缺少 end 关键字';
    if (/unknown diagram type/i.test(msg)) return '未知的图表类型，支持的类型包括：graph, sequenceDiagram, classDiagram, gantt, pie, mindmap 等';
    if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return '箭头语法错误，常见格式：-->, ---, ===>, -.->，请检查连接线格式';
    if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return '存在未闭合的引号、括号或代码块';
    if (/participant/i.test(msg)) return '时序图参与者声明有误，格式：participant 名称';
    if (/subgraph/i.test(msg)) return 'subgraph 块语法有误，确保每个 subgraph 都有对应的 end';
    return '请检查语法是否正确，可参考示例下拉菜单中的模板';
  }
  if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return 'Code appears incomplete. Check for unclosed brackets or missing "end" keywords.';
  if (/unknown diagram type/i.test(msg)) return 'Unknown diagram type. Supported types: graph, sequenceDiagram, classDiagram, gantt, pie, mindmap, etc.';
  if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return 'Arrow syntax error. Common formats: -->, ---, ===>, -.->';
  if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return 'Unterminated string, bracket, or code block detected.';
  if (/participant/i.test(msg)) return 'Participant declaration error. Format: participant Name';
  if (/subgraph/i.test(msg)) return 'Subgraph syntax error. Each subgraph needs a matching "end".';
  return 'Check your syntax. See Help for example templates.';
}

function handleRenderError(err, code) {
  const msg = err.message || String(err);
  const errLine = extractErrorLine(err);
  const s = STRINGS[state.currentLang];
  const lineHint = errLine
    ? '<button class="error-banner__line error-banner__goto" data-line="' + errLine + '">' + s.errorLine.replace('{n}', errLine) + '</button>'
    : '';
  const friendlyHint = getFriendlyHint(msg, state.currentLang);
  dom.preview.innerHTML =
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
      '<div class="error-banner__hint">' + escapeHtml(friendlyHint) + '</div>' +
      '<div class="error-banner__tip">' + s.errorTip + '</div>' +
    '</div>';

  const gotoBtn = dom.preview.querySelector('.error-banner__goto');
  if (gotoBtn) {
    gotoBtn.addEventListener('click', () => {
      scrollToLine(parseInt(gotoBtn.getAttribute('data-line'), 10));
    });
  }

  setRenderStatus('error', s.renderError);
  pushDiagnosticFromError(msg, err);
}

// ── SVG font inlining ───────────────────────────────────────────────
const fontDataCache = {};

async function fetchFontAsBase64(url) {
  if (fontDataCache[url]) return fontDataCache[url];
  try {
    const resp = await fetch(url, { mode: 'cors', cache: 'force-cache' });
    if (!resp.ok) { console.warn('Font fetch failed:', url, resp.status); return null; }
    const buf = await resp.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary).replace(/\s/g, '');
    const mime = url.endsWith('.woff2') ? 'font/woff2'
      : url.endsWith('.woff') ? 'font/woff'
      : url.endsWith('.ttf') ? 'font/ttf' : 'font/truetype';
    const dataUri = 'data:' + mime + ';base64,' + b64;
    fontDataCache[url] = dataUri;
    return dataUri;
  } catch (e) {
    console.warn('Font fetch error:', url, e.message);
    return null;
  }
}

async function buildInlineFontCss() {
  if (!state.handDrawn) return '';
  const preset = HAND_FONTS[state.handDrawnFont] || HAND_FONTS.virgil;
  const fontUrl = preset.url || 'https://cdn.jsdelivr.net/gh/excalidraw/virgil/Virgil.woff2';
  try {
    const dataUri = await fetchFontAsBase64(fontUrl);
    if (!dataUri) return '';
    return "@font-face { font-family: '" + preset.label + "'; src: url('" + dataUri + "') format('woff2'); font-display: swap; }";
  } catch (e) { return ''; }
}

export async function inlineFontsIntoSvg(svgEl) {
  const clone = svgEl.cloneNode(true);
  const images = clone.querySelectorAll('image');
  for (let i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);

  const styleEls = clone.querySelectorAll('style');
  for (const s of styleEls) {
    s.textContent = s.textContent.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, '');
  }

  if (state.handDrawn) {
    const fontCss = await buildInlineFontCss();
    if (fontCss) {
      const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = fontCss;
      clone.insertBefore(styleEl, clone.firstChild);
    }
  }
  return clone;
}

// ── SVG to PNG conversion ───────────────────────────────────────────
export function svgToPngBlob(svgEl, scale) {
  scale = scale || 4;
  return new Promise((resolve, reject) => {
    inlineFontsIntoSvg(svgEl).then(cloned => {
      const images = cloned.querySelectorAll('image');
      for (let i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);

      const styleEls = cloned.querySelectorAll('style');
      styleEls.forEach(el => {
        el.textContent = el.textContent.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, '');
      });

      const svgData = new XMLSerializer().serializeToString(cloned);
      const bbox = svgEl.getBoundingClientRect();
      const width = bbox.width || 800;
      const height = bbox.height || 600;
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        const bg = getExportBgColor();
        if (bg !== 'transparent') {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        try {
          canvas.toBlob(blob => {
            blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'));
          }, 'image/png');
        } catch (e) {
          console.warn('Canvas toBlob failed (tainted), using fallback');
          try {
            const dataURL = canvas.toDataURL('image/png');
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let j = 0; j < byteString.length; j++) ia[j] = byteString.charCodeAt(j);
            resolve(new Blob([ab], { type: mimeString }));
          } catch (fallbackErr) { reject(fallbackErr); }
        }
      };
      img.onerror = e => { URL.revokeObjectURL(url); console.error('Image load error', e); reject(new Error('Failed to load SVG')); };
      img.src = url;
    }).catch(reject);
  });
}
