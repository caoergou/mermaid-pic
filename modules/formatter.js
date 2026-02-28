// ── Mermaid code formatter ───────────────────────────────────────────

const INDENT = '    ';

function detectDiagramType(code) {
  const first = code.trim().split('\n')[0].trim().toLowerCase();
  if (/^(graph|flowchart)\b/.test(first)) return 'flowchart';
  if (/^sequencediagram\b/.test(first)) return 'sequence';
  if (/^classdiagram\b/.test(first)) return 'class';
  if (/^statediagram/.test(first)) return 'state';
  if (/^erdiagram\b/.test(first)) return 'er';
  if (/^gantt\b/.test(first)) return 'gantt';
  if (/^pie\b/.test(first)) return 'pie';
  if (/^mindmap\b/.test(first)) return 'mindmap';
  if (/^gitgraph\b/.test(first)) return 'gitgraph';
  if (/^architecture/.test(first)) return 'architecture';
  if (/^block-beta\b/.test(first)) return 'block';
  if (/^timeline\b/.test(first)) return 'timeline';
  if (/^xychart/.test(first)) return 'xychart';
  return 'generic';
}

function trimTrailing(line) {
  return line.replace(/\s+$/, '');
}

function collapseBlankLines(lines) {
  const result = [];
  let lastBlank = false;
  for (const line of lines) {
    if (line.trim() === '') {
      if (!lastBlank) result.push('');
      lastBlank = true;
    } else {
      result.push(line);
      lastBlank = false;
    }
  }
  return result;
}

// ── Flowchart / graph formatter ─────────────────────────────────────

const FLOW_BLOCK_OPEN = /^\s*subgraph\b/i;
const FLOW_BLOCK_CLOSE = /^\s*end\s*$/i;

function formatFlowchart(code) {
  const lines = code.split('\n');
  const result = [];
  let depth = 1;

  for (let i = 0; i < lines.length; i++) {
    let line = trimTrailing(lines[i]);
    const stripped = line.trim();
    if (stripped === '') { result.push(''); continue; }

    if (i === 0) {
      result.push(stripped);
      continue;
    }

    if (FLOW_BLOCK_CLOSE.test(stripped)) {
      depth = Math.max(1, depth - 1);
    }

    const indented = INDENT.repeat(depth) + stripped;
    result.push(indented);

    if (FLOW_BLOCK_OPEN.test(stripped)) {
      depth++;
    }
  }
  return collapseBlankLines(result).join('\n');
}

// ── Sequence diagram formatter ──────────────────────────────────────

const SEQ_BLOCK_OPEN = /^\s*(loop|alt|else|opt|par|and|critical|break|rect|ref)\b/i;
const SEQ_BLOCK_CLOSE = /^\s*end\s*$/i;
const SEQ_DECLARATION = /^\s*(participant|actor)\b/i;

function formatSequence(code) {
  const lines = code.split('\n');
  const result = [];
  let depth = 1;

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (stripped === '') { result.push(''); continue; }

    if (i === 0) {
      result.push(stripped);
      continue;
    }

    if (SEQ_BLOCK_CLOSE.test(stripped)) {
      depth = Math.max(1, depth - 1);
    }

    if (/^\s*else\b/i.test(stripped)) {
      result.push(INDENT.repeat(Math.max(0, depth - 1)) + stripped);
    } else {
      result.push(INDENT.repeat(depth) + stripped);
    }

    if (SEQ_BLOCK_OPEN.test(stripped) && !SEQ_BLOCK_CLOSE.test(stripped)) {
      depth++;
    }
  }
  return collapseBlankLines(result).join('\n');
}

// ── Class diagram formatter ─────────────────────────────────────────

function formatClass(code) {
  const lines = code.split('\n');
  const result = [];
  let inBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (stripped === '') { result.push(''); continue; }

    if (i === 0) { result.push(stripped); continue; }

    if (/\{\s*$/.test(stripped)) {
      result.push(INDENT + stripped);
      inBlock = true;
      continue;
    }

    if (/^\s*\}/.test(stripped)) {
      result.push(INDENT + stripped);
      inBlock = false;
      continue;
    }

    result.push((inBlock ? INDENT + INDENT : INDENT) + stripped);
  }
  return collapseBlankLines(result).join('\n');
}

// ── State diagram formatter ─────────────────────────────────────────

const STATE_BLOCK_OPEN = /^\s*state\b.*\{/i;
const STATE_BLOCK_CLOSE = /^\s*\}/;

function formatState(code) {
  const lines = code.split('\n');
  const result = [];
  let depth = 1;

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (stripped === '') { result.push(''); continue; }

    if (i === 0) { result.push(stripped); continue; }

    if (STATE_BLOCK_CLOSE.test(stripped)) {
      depth = Math.max(1, depth - 1);
    }

    result.push(INDENT.repeat(depth) + stripped);

    if (STATE_BLOCK_OPEN.test(stripped)) {
      depth++;
    }
  }
  return collapseBlankLines(result).join('\n');
}

// ── Gantt / pie / timeline / xychart formatter ──────────────────────

function formatSectionBased(code) {
  const lines = code.split('\n');
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (stripped === '') { result.push(''); continue; }
    if (i === 0) { result.push(stripped); continue; }
    if (/^\s*(title|dateformat|axisformat|section|todaymarker)\b/i.test(stripped)) {
      result.push(INDENT + stripped);
    } else {
      result.push(INDENT + stripped);
    }
  }
  return collapseBlankLines(result).join('\n');
}

// ── Mindmap formatter (preserve relative indentation) ───────────────

function formatMindmap(code) {
  const lines = code.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    result.push(trimTrailing(lines[i]));
  }
  return collapseBlankLines(result).join('\n');
}

// ── Generic formatter (indent everything one level) ─────────────────

function formatGeneric(code) {
  const lines = code.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (stripped === '') { result.push(''); continue; }
    if (i === 0) { result.push(stripped); continue; }
    result.push(INDENT + stripped);
  }
  return collapseBlankLines(result).join('\n');
}

// ── Public API ──────────────────────────────────────────────────────

export function formatMermaidCode(code) {
  if (!code || !code.trim()) return code;

  const type = detectDiagramType(code);

  let formatted;
  switch (type) {
    case 'flowchart': formatted = formatFlowchart(code); break;
    case 'sequence':  formatted = formatSequence(code); break;
    case 'class':     formatted = formatClass(code); break;
    case 'state':     formatted = formatState(code); break;
    case 'er':        formatted = formatSectionBased(code); break;
    case 'gantt':     formatted = formatSectionBased(code); break;
    case 'pie':       formatted = formatSectionBased(code); break;
    case 'timeline':  formatted = formatSectionBased(code); break;
    case 'xychart':   formatted = formatSectionBased(code); break;
    case 'mindmap':   formatted = formatMindmap(code); break;
    default:          formatted = formatGeneric(code); break;
  }

  if (formatted && !formatted.endsWith('\n')) {
    formatted += '\n';
  }
  return formatted;
}
