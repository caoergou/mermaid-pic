import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { linter, lintGutter, setDiagnostics } from "@codemirror/lint";
import { keymap } from "@codemirror/view";
import { mermaid as mermaidLang } from "codemirror-lang-mermaid";
import { oneDark } from "@codemirror/theme-one-dark";
import { state, dom } from './core.js';

let currentDiagnostics = [];

export function getCode() {
  return state.editorView ? state.editorView.state.doc.toString() : '';
}

export function clearDiagnostics() {
  if (!state.editorView) return;
  currentDiagnostics = [];
  state.editorView.dispatch(setDiagnostics(state.editorView.state, []));
}

export function pushDiagnosticFromError(msg) {
  if (!state.editorView) return;
  const lineMatch = msg.match(/line\s+(\d+)/i);
  let from = 0, to = 1;
  if (lineMatch) {
    const lineNum = parseInt(lineMatch[1], 10);
    try {
      const line = state.editorView.state.doc.line(lineNum);
      from = line.from;
      to = line.to || line.from + 1;
    } catch (e) { /* line out of range */ }
  } else {
    try {
      const firstLine = state.editorView.state.doc.line(1);
      from = firstLine.from;
      to = firstLine.to;
    } catch (e) {}
  }
  const diag = [{ from, to, severity: 'error', message: msg }];
  currentDiagnostics = diag;
  state.editorView.dispatch(setDiagnostics(state.editorView.state, diag));
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
