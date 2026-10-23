import { marked } from 'marked';
import createDOMPurify from 'dompurify';

const purifier = createDOMPurify(window);
const proseInsideMath = /\b(?:và|của|trong|một|cho|hãy|tính|dòng|giá trị|món|trọng lượng)\b/iu;

function typesetText(node, katex) {
  const source = node.nodeValue;
  if (!source.includes('$')) return;
  const math = /(?<!\\)(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g;
  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let found = false;
  for (const match of source.matchAll(math)) {
    found = true;
    const token = match[0];
    const displayMode = token.startsWith('$$');
    const expression = token.slice(displayMode ? 2 : 1, displayMode ? -2 : -1).trim();
    fragment.append(document.createTextNode(source.slice(cursor, match.index)));
    if (!expression || (proseInsideMath.test(expression) && !/\\text\s*\{/.test(expression))) {
      fragment.append(document.createTextNode(token));
    } else {
      const span = document.createElement('span');
      span.className = displayMode ? 'math-display' : 'math-inline';
      try { katex.render(expression, span, { throwOnError: true, trust: false, displayMode }); fragment.append(span); }
      catch { fragment.append(document.createTextNode(token)); }
    }
    cursor = match.index + token.length;
  }
  if (!found) return;
  fragment.append(document.createTextNode(source.slice(cursor)));
  node.replaceWith(fragment);
}

window.CodeProStatement = {
  render(value, box, katex) {
    const markdown = String(value || '').trim() || 'Đề bài chưa có nội dung.';
    box.innerHTML = purifier.sanitize(marked.parse(markdown, { gfm: true, breaks: false }));
    if (!katex) return;
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement?.closest('pre, code, kbd, samp, a')) textNodes.push(node);
    }
    for (const node of textNodes) typesetText(node, katex);
  }
};
