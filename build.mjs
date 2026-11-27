// Build the Caldera Guidelines page.
//   npm install   (once)
//   npm run build
// Reads guides.json (each guide: id, ru/en titles, ru/en Markdown files relative
// to this folder), renders Markdown to HTML split by "## " sections, embeds it
// into template.html and writes index.html. Republish index.html to the same
// artifact URL afterwards (see README.md).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const here = dirname(fileURLToPath(import.meta.url));
const read = p => readFileSync(resolve(here, p), 'utf8');

function splitSections(md) {
  const out = [[]];
  let fence = false;
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) fence = !fence;
    if (!fence && /^## /.test(line)) out.push([]);
    out[out.length - 1].push(line);
  }
  return out
    .map(lines => lines.join('\n').replace(/\n-{3,}\s*$/, '').trim())
    .filter(Boolean)
    .map(s => ({ md: s, html: marked.parse(s, { gfm: true }) }));
}

const guides = JSON.parse(read('guides.json')).map(g => ({
  id: g.id,
  title: g.title,
  docs: Object.fromEntries(
    Object.entries(g.files).map(([lang, file]) => {
      const md = read(file);
      return [lang, { md, sections: splitSections(md) }];
    })
  ),
}));

const data = JSON.stringify(guides).replace(/</g, '\\u003c');
const html = read('template.html').replace('__GUIDES_JSON__', () => data);
writeFileSync(resolve(here, 'index.html'), html);
console.log(`index.html: ${guides.length} guide(s), ${Math.round(html.length / 1024)} KB`);
