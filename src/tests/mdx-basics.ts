import { createMdxAstCompiler } from '@mdx-js/mdx';
import { readFileSync } from 'fs';
import { join } from 'path';

import visit = require('unist-util-visit');

const indexString = readFileSync(join(process.cwd(), 'docs/index.mdx')).toString();

const compiler = createMdxAstCompiler({
    // footnotes: boolean;
    mdPlugins: [],
    // hastPlugins: Array<unknown>;
    blocks: ['[a-z\\.]+(\\.){0,1}[a-z\\.]']
});

const tree = compiler.parse(indexString);

console.log('Parsed tree', tree);

compiler.run(tree).then(newAst => {
    console.log(newAst);
});

visit(tree, 'paragraph', node => {
    console.log(`paragraph ${node.children}`);
});



