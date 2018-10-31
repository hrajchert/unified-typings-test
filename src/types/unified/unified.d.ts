export as namespace Unified;

import vfile = require("vfile");

export type PreserveAST = Unist2.Node & '_preserveAST';

export type Plugin<AST extends Unist2.Node = PreserveAST> = (...args: unknown[]) => unknown;
export type PluginWithOptions = [Plugin, unknown];
export type Plugins = Array<Plugin | PluginWithOptions | Preset>;
export type Preset = {
    plugins: Plugins;
    settings?: unknown;
} | {
    settings: unknown
};

// /**
//  * Creates a new unfrozen processor which is configured to function the same as its ancestor.
//  * But when the descendant processor is configured in the future it does not affect the
//  * ancestral processor.
//  */
interface CompilerInstance {
    compile: () => string;
}

interface CompilerConstructor {
    new (): CompilerInstance;
}

type Compiler = (node: Unist2.Node, file: vfile.VFile<string>) => string | CompilerConstructor;

type ProcessCallback = (err: Error | null, file: vfile.VFile<string>) => void;

type RunCb<AST extends Unist2.Node> = (err: Error | null, node: AST, file: vfile.VFile<string> ) => void;

type ContinuateAST <NewAST extends Unist2.Node, PrevAST extends Unist2.Node>
    = NewAST extends Unified.PreserveAST ? PrevAST : NewAST;

export interface Processor<AST extends Unist2.Node = Unist2.Node> {
    (): Processor;
    /**
     * Configure the processor to use a plugin and optionally configure that plugin with options.
     * @remarks use cannot be called on frozen processors. Invoke the processor first to create a new unfrozen processor.
     */
    use: {
        <TransformedAST extends Unist2.Node = Unified.PreserveAST>(plugin: Unified.Plugin<TransformedAST>, options?: unknown): Processor<ContinuateAST<TransformedAST, AST>>;
        (list: Unified.Plugins, options?: unknown): Processor<AST>;
        (preset: Unified.Preset, options?: unknown): Processor<AST>;
    }
    /**
     * Parse text to a syntax tree.
     * @remarks
     * parse freezes the processor if not already frozen.
     * parse does not apply transformers from the run phase to the syntax tree.
     */
    parse: (doc: vfile.VFile<string> | string) => AST;

    /**
     * Compile a syntax tree to text.
     *
     * @returns String representation of the syntax tree file.
     *
     * @remarks
     * stringify freezes the processor if not already frozen.
     *
     * stringify does not apply transformers from the run phase to the syntax tree.
     */
    stringify: (node: AST, file?: vfile.VFile<string>) => string;

    /**
     * Function handling the compilation of syntax tree to a text.
     * Used in the stringify phase in the process and invoked with a Node and
     * VFile representation of the document to stringify.
     */
    Compiler?: Compiler;

    /**
     * Transform a syntax tree by applying plugins to it.
     *
     * @remarks
     * run freezes the processor if not already frozen.
     */
    run: {
        (node: AST, file: vfile.VFile<string>, cb: RunCb<AST>): void;
        (node: AST, cb: RunCb<AST>): void;
        (node: AST, file: vfile.VFile<string>): Promise<AST>;
        (node: AST): Promise<AST>;
    }

    /**
     * Transform a syntax tree by applying plugins to it.
     *
     * If asynchronous plugins are configured an error is thrown.
     * @remarks
     * runSync freezes the processor if not already frozen.
     */
    runSync: (node: AST, file?: vfile.VFile<string>) => AST;

    /**
     * Process the given representation of a file as configured on the processor.
     * The process invokes parse, run, and stringify internally.
     *
     * @remarks
     * process freezes the processor if not already frozen.
     */
    process: {
        (fileOrValue: vfile.VFile<string> | string): Promise<vfile.VFile<string>>;
        (fileOrValue: vfile.VFile<string> | string, cb: ProcessCallback): void;
    }

    /**
     * Process the given representation of a file as configured on the processor.
     * The process invokes parse, run, and stringify internally.
     *
     * If asynchronous plugins are configured an error is thrown.
     *
     * @remarks
     * processSync freezes the processor if not already frozen.
     */
    processSync: (fileOrValue: vfile.VFile<string> | string) => vfile.VFile<string>

    /**
     * Get or set information in an in-memory key-value store accessible to all phases of
     * the process. An example is a list of HTML elements which are self-closing,
     * which is needed when parsing, transforming, and compiling HTML.
     *
     * @remarks
     * Setting information with data cannot occur on frozen processors.
     * Invoke the processor first to create a new unfrozen processor.
     */
    data: {
        (key: string, value: unknown): Processor<AST>;
        (key: string): unknown;
    }

    /**
     * Freeze a processor. Frozen processors are meant to be extended and not to be
     * configured or processed directly.
     *
     * Once a processor is frozen it cannot be unfrozen. New processors functioning
     * just like it can be created by invoking the processor.
     *
     * It’s possible to freeze processors explicitly, by calling .freeze(), but .parse(),
     * .run(), .stringify(), and .process() call .freeze() to freeze a processor too.
     *
     * @returns The processor on which freeze is invoked.
     */
    freeze: () => Processor<AST>;
}


// Type helpers
type SelectNode <AST extends Unist2.Node, K extends string>
    = AST extends {type: K} ? AST : never
;

type ExpandAST <AST extends Unist2.Node>
    = AST extends Unist2.Parent ? AST | ExpandListAST<AST['children']> : AST
;

type ExpandListAST <List> = List extends Array<infer AST> ? AST : never;