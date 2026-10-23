import { basicSetup, EditorView } from 'codemirror';
import { Compartment } from '@codemirror/state';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { openSearchPanel } from '@codemirror/search';

function languageExtension(key) {
  return /^PY/i.test(key) ? python() : cpp();
}

window.CodeProEditor = {
  mount({ parent, textarea, status, onRun, onSave, language }) {
    const languageSlot = new Compartment();
    let silent = false;
    const view = new EditorView({
      doc: textarea.value,
      extensions: [
        basicSetup,
        oneDark,
        languageSlot.of(languageExtension(language)),
        keymap.of([
          indentWithTab,
          { key: 'Mod-Enter', run: () => { onRun(); return true; } },
          { key: 'Mod-s', run: () => { onSave(); return true; } }
        ]),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            textarea.value = update.state.doc.toString();
            if (!silent) textarea.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (update.docChanged || update.selectionSet) {
            const head = update.state.selection.main.head;
            const line = update.state.doc.lineAt(head);
            status.textContent = `Dòng ${line.number}, cột ${head - line.from + 1}`;
          }
        })
      ],
      parent
    });
    textarea.hidden = true;
    status.textContent = 'Dòng 1, cột 1';
    return {
      getValue: () => view.state.doc.toString(),
      setValue(value) {
        const text = String(value ?? '');
        if (view.state.doc.toString() === text) return;
        silent = true;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text }, selection: { anchor: 0 } });
        silent = false;
        view.scrollDOM.scrollTop = 0;
        view.requestMeasure();
      },
      setLanguage(key) { view.dispatch({ effects: languageSlot.reconfigure(languageExtension(key)) }); },
      refresh: () => view.requestMeasure(),
      search: () => { view.focus(); openSearchPanel(view); },
      focus: () => view.focus()
    };
  }
};
