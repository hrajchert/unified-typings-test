// Type definitions for remark 10.0.0
// Project: https://github.com/remarkjs/remark/tree/master/packages/remark
// Definitions by: Hernán Rajchert <https://github.com/hrajchert>

declare module 'remark' {
    const processor: Unified.Processor<MdAST.Root>;
    export = processor;
}