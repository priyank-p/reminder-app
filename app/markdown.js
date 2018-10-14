const marked = require('marked');

const renderer = new marked.Renderer();
const _renderer = {
  link: renderer.link
};

function escape(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\(/g, '&lpar;')
    .replace(/\)/g, '&qpar;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

renderer.link = (href, title, text) => {
  href = escape(href);
  text = escape(text);

  let html = _renderer.link.call(marked, href, title, text);
  html = html
    .replace('>', ' rel="noopener noreferer">');
  return html;
};

marked.setOptions({
  sanitize: true,
  renderer
});

module.exports = marked;