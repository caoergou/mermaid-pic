import { dom } from '../dom.js';
import { pz, MIN_SCALE, MAX_SCALE } from '../store.js';

// ── 缩放和平移逻辑 ──────────────────────────────────────────────────────

/**
 * 应用当前的变换（缩放和平移）到预览元素
 */
export function applyTransform() {
  dom.preview.style.transform = 'translate(' + pz.tx + 'px,' + pz.ty + 'px) scale(' + pz.scale + ')';
  dom.zoomLabel.textContent = Math.round(pz.scale * 100) + '%';
}

/**
 * 缩放到指定比例，并以指定点为中心（默认为视口中心）
 * @param {number} newScale - 新的缩放比例
 * @param {number} [cx] - 中心点 X 坐标
 * @param {number} [cy] - 中心点 Y 坐标
 */
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

/**
 * 重置视图到初始状态
 */
export function resetView() {
  pz.scale = 1; pz.tx = 0; pz.ty = 0;
  applyTransform();
}

const ZOOM_STEP = 1.25;

/**
 * 绑定预览区缩放按钮、拖拽平移与滚轮缩放
 */
export function initZoom() {
  applyTransform();

  if (dom.btnZoomIn) dom.btnZoomIn.addEventListener('click', () => zoomTo(pz.scale * ZOOM_STEP));
  if (dom.btnZoomOut) dom.btnZoomOut.addEventListener('click', () => zoomTo(pz.scale / ZOOM_STEP));
  if (dom.btnZoomReset) dom.btnZoomReset.addEventListener('click', resetView);

  const vp = dom.previewViewport;
  if (!vp) return;

  vp.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.floating-zoom')) return;
    pz.dragging = true;
    pz.startX = e.clientX;
    pz.startY = e.clientY;
    pz.startTx = pz.tx;
    pz.startTy = pz.ty;
    vp.setPointerCapture(e.pointerId);
  });

  vp.addEventListener('pointermove', e => {
    if (!pz.dragging) return;
    pz.tx = pz.startTx + (e.clientX - pz.startX);
    pz.ty = pz.startTy + (e.clientY - pz.startY);
    applyTransform();
  });

  vp.addEventListener('pointerup', e => {
    if (e.button !== 0) return;
    pz.dragging = false;
    vp.releasePointerCapture(e.pointerId);
  });
  vp.addEventListener('pointercancel', () => {
    pz.dragging = false;
  });

  vp.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = vp.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY > 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
    zoomTo(pz.scale * factor, cx, cy);
  }, { passive: false });
}
