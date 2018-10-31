// Type definitions for unified 1.4.0
// Project: https://github.com/syntax-tree/unist-util-visit
// Definitions by: Hernán Rajchert <https://github.com/hrajchert>

declare module 'unist-util-visit' {
    function visit<AST extends Unist2.Node, K extends string>  (
        tree: AST,
        key: K,
        cb: (node: Unified.SelectNode<Unified.ExpandAST<AST>, K>) => void
      ): void;
    // SKIP = "skip"
    // EXIT = false;
    // CONTINUE = true
    export = visit;
}