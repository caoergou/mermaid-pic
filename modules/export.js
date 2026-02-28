import { state, dom, showToast, btnSuccess, downloadFile } from './core.js';
import { STRINGS } from './i18n.js';
import { getCode } from './editor.js';
import { inlineFontsIntoSvg, svgToPngBlob } from './render.js';

// ── Copy / Download ─────────────────────────────────────────────────
export async function copyPng() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  const blob = await svgToPngBlob(svgEl);
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  showToast(STRINGS[state.currentLang].toastCopiedPng);
  btnSuccess(dom.btnCopyPng);
}

export async function downloadSvg() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  const cloned = await inlineFontsIntoSvg(svgEl);
  const blob = new Blob([new XMLSerializer().serializeToString(cloned)], { type: 'image/svg+xml' });
  downloadFile(blob, 'diagram.svg');
  showToast(STRINGS[state.currentLang].toastDownloadSvg);
}

export async function downloadPng() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  downloadFile(await svgToPngBlob(svgEl), 'diagram.png');
  showToast(STRINGS[state.currentLang].toastDownloadPng);
}

// ── URL encoding (pako compression + base64) ────────────────────────
export function encodeCode(code) {
  const bytes = new TextEncoder().encode(code);
  const compressed = pako.deflate(bytes);
  let binary = '';
  for (let i = 0; i < compressed.length; i++) binary += String.fromCharCode(compressed[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeCode(encoded) {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4 !== 0) encoded += '=';
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  try {
    return new TextDecoder().decode(pako.inflate(bytes));
  } catch (e) {
    return new TextDecoder().decode(bytes);
  }
}

export function getQueryCode() {
  try {
    const param = new URLSearchParams(location.search).get('code');
    if (!param) return null;
    return decodeCode(param);
  } catch (e) { return null; }
}

export function getHashCode() {
  try {
    const hash = location.hash.slice(1);
    if (!hash) return null;
    return decodeCode(hash);
  } catch (e) { return null; }
}

export function updateHash(code) {
  const encoded = encodeCode(code);
  window.history.replaceState(null, '', '#' + encoded);
  try { localStorage.setItem('mermaid-editor-code', code); } catch (e) {}
}

export async function copyShareLink() {
  updateHash(getCode());
  await navigator.clipboard.writeText(location.href);
  showToast(STRINGS[state.currentLang].toastLinkCopied);
  btnSuccess(dom.btnShare);
}

export async function copyEmbedCode() {
  const encoded = encodeCode(getCode());
  const embedUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + 'embed.html#' + encoded;
  const embedCode = '<iframe src="' + embedUrl + '" width="100%" height="600" frameborder="0" style="border: none;" title="Mermaid Diagram"></iframe>';
  await navigator.clipboard.writeText(embedCode);
  showToast(STRINGS[state.currentLang].toastEmbedCopied);
  btnSuccess(dom.btnShare);
}
