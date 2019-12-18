import { get, update } from '@reshuffle/db';
const editorPrefix = 'editor';

/**
 * Get html, css, js fields from data that was sent from GrapesJs
 */
/* @expose */
export async function getHtmlFields() {
  try {
    const { html, css, js } = await get(editorPrefix);
    return { html: html, css: css, js: js };
  } catch (err) {
    console.log('error on getHtmlFields backend', err);
  }
}

/**
 * Override html, css, js fields of data that was sent from GrapesJs
 */
/* @expose */
export async function saveHtmlFields(data) {
  const { html, css, js } = data;
  return update(editorPrefix, editor => {
    const result = { ...editor };
    result.html = html;
    result.css = css;
    result.js = js;
    return result;
  });
}

/**
 * Store Grapesjs editor data
 *
 * Grapesjs editor object sample:
 * {
 *  html: "<header class=..."
 *  components: "[{"tagName":"header","status":"hovered","content":"
 *  assets: "[{"type":"image","src":"https://images.unsplash.com/photo-1487266659293-c4762f375955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80","unitDim":"px","height":0,"width":0},{"type":"image","src":"https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60","unitDim":"px","height":0,"width":0}]"
 *  css: "* { box-sizing: border-box; } body {margin: 0;}.ca"
 *  styles: "[{"selectors":[{"name":"ivisj","label":"ivisj","ty"
 *  js: ""  //added by reshuffle, this is not GrapesJS field
 * }
 */
/* @expose */
export async function storeEditor(data) {
  await update(editorPrefix, () => {
    return data;
  });
}

/**
 * Load Grapesjs editor object
 */
/* @expose */
export async function loadEditor() {
  await get(editorPrefix);
}



