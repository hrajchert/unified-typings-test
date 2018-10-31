// Type definitions for remark-parse 6.0.1
// Project: https://github.com/remarkjs/remark/tree/master/packages/remark-parse
// Definitions by: Hernán Rajchert <https://github.com/hrajchert>

declare module 'remark-parse' {
    const plugin: Unified.Plugin<MdAST.Root>;
    export = plugin;
}