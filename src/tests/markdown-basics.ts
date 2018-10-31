import markdown = require('remark-parse');
import unified = require('unified');
import visit = require('unist-util-visit');
const remark2rehype = require('remark-rehype');
const doc = require('rehype-document');
const format = require('rehype-format');
const html = require('rehype-stringify');
const report = require('vfile-reporter');


unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(html)
    .process('$ Hello world!', function (err, file) {
        console.log(`cwd = ${file.cwd}`);
        console.error(report(err || file));
        console.log('file = ', String(file));
    });


const u = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(html);

const ast = u.parse('# Hello world!');

visit(ast, 'heading', node => {
    const value = node.children.map(
        child => isText(child) ? child.value : ''
    ).join(' ');

    console.log(`heading of depth ${node.depth} with value ${value}`);
});

function isText (node: MdAST.Nodes): node is MdAST.Text {
    return node.type === 'text';
}
