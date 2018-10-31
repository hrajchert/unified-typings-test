// Type definitions for @mdx-js/mdx 0.16.0
// Project: https://github.com/mdx-js/mdx
// Definitions by: Hernán Rajchert <https://github.com/hrajchert>

declare module '@mdx-js/mdx' {
    export interface IMdxOptions {
        footnotes: boolean;
        mdPlugins: Array<unknown>;
        hastPlugins: Array<unknown>;
        compilers: Array<unknown>;
        blocks: Array<string>;
    }
    export default function compile (mdx: string, options?: IMdxOptions): Promise<string>;
    export function sync (mdx: string, options?: IMdxOptions): string;

    export interface CreateCompilerOptions {
        mdPlugins: Array<unknown>;
        blocks?: Array<string>;
        footnotes?: boolean;
        // compilers: Array<unknown>;
    }

    // TODO: Change AST type
    export function createMdxAstCompiler (options: CreateCompilerOptions): Unified.Processor<MdAST.Root>;
}