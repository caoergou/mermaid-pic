import { state, dom, updateEditorStatus } from './core.js';

export const STRINGS = {
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
    editorStatusTpl(lines, chars) { return lines + ' 行 · ' + chars + ' 字符'; },
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
      { title: '实时预览', body: '图表实时渲染在这里。上方可切换主题和背景，下方可缩放和平移。' },
      { title: '菜单栏', body: '所有功能都在这里：文件（导出/分享）、编辑（手绘风格）、视图（主题/模式）、帮助（示例/快捷键）。' },
      { title: '命令面板', body: '按 Ctrl+K 快速搜索并执行任意操作，包括导出、切换主题、加载示例等。' },
    ],
    shortcutCopyPng: '复制 PNG',
    shortcutDlSvg: '下载 SVG',
    shortcutDlPng: '下载 PNG',
    shortcutCmdPalette: '命令面板',
    errorSyntax: '语法错误',
    errorLine: '第 {n} 行',
    errorTip: '修复代码后将自动重新渲染',
    errorDismiss: '关闭',
    placeholderMain: '在左侧输入 Mermaid 代码，图表将实时显示在这里',
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
    editorStatusTpl(lines, chars) { return lines + ' lines · ' + chars + ' chars'; },
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
      { title: 'Live Preview', body: 'The diagram renders here in real time. Switch themes and backgrounds above, zoom and pan below.' },
      { title: 'Menu Bar', body: 'All features live here: File (export/share), Edit (hand-drawn), View (themes/mode), Help (examples/shortcuts).' },
      { title: 'Command Palette', body: 'Press Ctrl+K to quickly search and run any action — export, switch themes, load examples, and more.' },
    ],
    shortcutCopyPng: 'Copy PNG',
    shortcutDlSvg: 'Download SVG',
    shortcutDlPng: 'Download PNG',
    shortcutCmdPalette: 'Command Palette',
    errorSyntax: 'Syntax Error',
    errorLine: 'Line {n}',
    errorTip: 'Fix the code above and it will re-render automatically',
    errorDismiss: 'Dismiss',
    placeholderMain: 'Type Mermaid code on the left, the diagram renders here in real time',
  },
};

export function applyI18n() {
  const s = STRINGS[state.currentLang];
  document.querySelectorAll('[data-i18n="editor"]').forEach(el => { el.textContent = s.editorPanel; });
  document.querySelectorAll('[data-i18n="preview"]').forEach(el => { el.textContent = s.previewPanel; });
  document.getElementById('modal-title').textContent = s.modalTitle;
  document.querySelector('.help-section h3').textContent = s.modalPickExample;
  document.querySelectorAll('.help-section h3')[1].textContent = s.modalShortcuts;
  document.getElementById('btn-restart-tour').textContent = s.modalRestartTour;
  document.getElementById('modal-ok').textContent = s.modalClose;
  const tds = document.querySelectorAll('.help-table td:first-child');
  const keys = ['shortcutCopyPng', 'shortcutDlSvg', 'shortcutDlPng', 'shortcutCmdPalette'];
  tds.forEach((td, i) => { if (keys[i]) td.textContent = s[keys[i]]; });
  updateEditorStatus();
}
