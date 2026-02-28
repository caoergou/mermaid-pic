import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { linter, lintGutter, setDiagnostics } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mermaid as mermaidLang } from "codemirror-lang-mermaid";
import { oneDark } from "@codemirror/theme-one-dark";
import { state, dom } from './core.js';
import { formatMermaidCode } from './formatter.js';

let currentDiagnostics = [];
let lintTimer = null;

export function getCode() {
  return state.editorView ? state.editorView.state.doc.toString() : '';
}

export function clearDiagnostics() {
  if (!state.editorView) return;
  currentDiagnostics = [];
  state.editorView.dispatch(setDiagnostics(state.editorView.state, []));
}

function extractLineFromError(err) {
  const msg = err.message || String(err);
  const lineMatch = msg.match(/line\s+(\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  if (err.hash && err.hash.line != null) return err.hash.line + 1;
  return null;
}

export function pushDiagnosticFromError(msg, errObj) {
  if (!state.editorView) return;
  const lineNum = errObj ? extractLineFromError(errObj) : null;
  const lineMatchFallback = typeof msg === 'string' ? msg.match(/line\s+(\d+)/i) : null;
  const line = lineNum || (lineMatchFallback ? parseInt(lineMatchFallback[1], 10) : null);
  let from = 0, to = 1;
  if (line) {
    try {
      const docLine = state.editorView.state.doc.line(line);
      from = docLine.from;
      to = docLine.to || docLine.from + 1;
    } catch (e) { /* line out of range */ }
  } else {
    try {
      const firstLine = state.editorView.state.doc.line(1);
      from = firstLine.from;
      to = firstLine.to;
    } catch (e) {}
  }
  const diag = [{ from, to, severity: 'error', message: typeof msg === 'string' ? msg : String(msg) }];
  currentDiagnostics = diag;
  state.editorView.dispatch(setDiagnostics(state.editorView.state, diag));
}

export function scrollToLine(lineNum) {
  if (!state.editorView) return;
  try {
    const line = state.editorView.state.doc.line(lineNum);
    state.editorView.dispatch({
      selection: { anchor: line.from, head: line.to },
      scrollIntoView: true,
    });
    state.editorView.focus();
  } catch (e) { /* line out of range */ }
}

export function scheduleLint() {
  clearTimeout(lintTimer);
  lintTimer = setTimeout(async () => {
    if (typeof mermaid === 'undefined') return;
    const code = getCode().trim();
    if (!code) { clearDiagnostics(); return; }
    try {
      await mermaid.parse(code);
      clearDiagnostics();
    } catch (err) {
      const msg = err.message || String(err);
      pushDiagnosticFromError(msg, err);
    }
  }, 200);
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

/**
 * @param {string} initialCode
 * @param {(doc: string) => void} onDocChange - called on every document change
 */
export function createEditor(initialCode, onDocChange) {
  const extensions = [
    basicSetup,
    mermaidLang(),
    oneDark,
    buildEditorTheme(true),
    lintGutter(),
    linter(() => currentDiagnostics, { delay: 0 }),
    keymap.of([{
      key: 'Tab',
      run(view) {
        view.dispatch(view.state.replaceSelection('  '));
        return true;
      }
    }]),
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        onDocChange(update.state.doc.toString());
      }
    }),
  ];

  state.editorView = new EditorView({
    state: EditorState.create({ doc: initialCode, extensions }),
    parent: dom.editorContainer,
  });
}

export function formatCode() {
  if (!state.editorView) return;
  const code = state.editorView.state.doc.toString();
  const formatted = formatMermaidCode(code);
  if (formatted === code) return;
  const cursor = state.editorView.state.selection.main.head;
  state.editorView.dispatch({
    changes: { from: 0, to: state.editorView.state.doc.length, insert: formatted },
    selection: { anchor: Math.min(cursor, formatted.length) },
  });
}
