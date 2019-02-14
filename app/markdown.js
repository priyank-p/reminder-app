const marked = require('marked');

const renderer = new marked.Renderer();
const _renderer = {
  link: renderer.link // save the original link method for later use
};

function escapeText(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\(/g, '&lpar;')
    .replace(/\)/g, '&qpar;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

renderer.link = (href, title, text) => {
  href = escapeText(href);
  text = escapeText(text);

  let html = _renderer.link.call(marked, href, title, text);
  html = html
    .replace('>', ' rel="noopener noreferer" target="_blank">');
  return html;
};

marked.setOptions({
  sanitize: true,
  renderer
});

module.exports = marked;
