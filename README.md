# Unified.js Typings Test
This repo is here to help me create and test the types of the library/ecosystem [unified.js](https://github.com/unifiedjs/unified) that I will eventually publish on Definitely Typed to be accesible under the `@types/xxx` package.

This is a work in progress but I have already modeled the following libraries of the ecosystem with various degrees of completeness:

* **unified:** The main Library. (mostly typed, but I want to try more generics magic)
* **mdast:** The AST for markdown. (could add more docs)
* **mdx:** Library to include react components in markdown. (still some unknowns)
* **remark-parse:** Plugin that reads markdown.
* **unist-util-visit:** Helper function to traverse the nodes. (Only main use covered)


The `types` folder contains the current types definitions and the `tests` folder contains working example of the library.

I'm trying in various degrees to use generics and conditial types to infer correctly the type of the resulting AST from the plugins being used. I would like to also add inference for the processor options.

Check out inside the test folder for the `markdown-basics.ts` and see how little types I have to write in the program and how many guarantees we have ;)

![](unified.gif)

