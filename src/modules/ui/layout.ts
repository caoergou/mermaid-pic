import { dom as domEls } from '../dom';

/**
 * 初始化可拖动分割线逻辑
 */
export function initLayout() {
  const editorPanel = document.querySelector('.panel--editor');
  const editorLayout = document.querySelector('.editor-layout');

  domEls.divider.addEventListener('pointerdown', e => {
    e.preventDefault();
    domEls.divider.classList.add('divider--active');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = getComputedStyle(domEls.divider).cursor;
    const onDrag = ev => {
      const rect = editorLayout.getBoundingClientRect();
      const isVertical = getComputedStyle(editorLayout).flexDirection === 'column';
      const pct = isVertical
        ? ((ev.clientY - rect.top) / rect.height) * 100
        : ((ev.clientX - rect.left) / rect.width) * 100;
      (editorPanel as HTMLElement).style.flexBasis = Math.min(Math.max(pct, 20), 80) + '%';
    };
    document.addEventListener('pointermove', onDrag);
    document.addEventListener('pointerup', () => {
      domEls.divider.classList.remove('divider--active');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.removeEventListener('pointermove', onDrag);
    }, { once: true });
  });
}
