// Typings for md-AST as defined in this specification: https://github.com/syntax-tree/mdast
export as namespace MdAST;

export type Nodes
    = Literal
    | Root
    | Paragraph
    | Heading
    | ThematicBreak
    | Blockquote
    | List
    | ListItem
    | Table
    | TableRow
    | TableCell
    | HTML
    | Code
    | YAML
    | Definition
    | FootnoteDefinition
    | Text
    | Emphasis
    | Strong
    | Delete
    | InlineCode
    | Break
    | Link
    | Image
    | LinkReference
    | ImageReference
    | Footnote
    | FootnoteReference
;
/**
 * Parent represents a node in mdast containing other nodes (said to be children).
 */
interface Parent extends Unist2.Parent {
    children: Content[];
}

/**
 * Literal represents a node in mdast containing a value.
 */
interface Literal extends Unist2.Literal {
    value: string;
}

/**
 * Root (Parent) represents a document.
 * Root can be used as the root of a tree, never as a child. Its content model is not
 * limited to top-level content, but can contain any content with the restriction that
 * all content must be of the same category.
 */
export interface Root extends Parent {
    type: "root";
}

/**
 * Paragraph represents a unit of discourse dealing with a particular point or idea.
 * Paragraph can be used where block content is expected. Its content model is phrasing content.
 */
export interface Paragraph extends Parent {
    type: "paragraph";
    children: PhrasingContent[];
}

/**
 * Heading (Parent) represents a heading of a section.
 * Heading can be used where block content is expected. Its content model is phrasing content.
 */
export interface Heading extends Parent {
    type: "heading";
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    children: PhrasingContent[];
}

/**
 * ThematicBreak (Node) represents a thematic break, such as a scene change in a story,
 *  a transition to another topic, or a new document.
 * ThematicBreak can be used where block content is expected. It has no content model.
 *
 * @link https://github.com/syntax-tree/mdast#thematicbreak
 */
export interface ThematicBreak extends Unist2.Node {
    type: "thematicBreak";
}

/**
 * Blockquote (Parent) represents a section quoted from somewhere else.
 * Blockquote can be used where block content is expected. Its content model is also block content.
 *
 * @link https://github.com/syntax-tree/mdast#blockquote
 */
export interface Blockquote extends Parent {
    type: "blockquote";
    children: BlockContent[];
}

/**
 * List (Parent) represents a list of items.
 *
 * List can be used where block content is expected. Its content model is list content.
 *
 * An ordered field can be present. It represents that the items have been intentionally ordered
 * (when true), or that the order of items is not important (when false or not present).
 *
 * If the ordered field is true, a start field can be present. It represents the starting number
 * of the node.
 *
 * A spread field can be present. It represents that any of its items is separated by a
 * blank line from its siblings (when true), or not (when false or not present).
 *
 * @link https://github.com/syntax-tree/mdast#list
 */
export interface List extends Parent {
    type: "list";
    ordered?: boolean;
    start?: number;
    spread?: boolean;
    children: ListContent[];
}

/**
 * ListItem (Parent) represents an item in a List.
 *
 * ListItem can be used where list content is expected. Its content model is block content.
 *
 * A checked field can be present. It represents whether the item is done (when true),
 * not done (when false), or indeterminate or not applicable (when null or not present).
 *
 * A spread field can be present. It represents that the item contains two or more children
 * separated by a blank line (when true), or not (when false or not present).
 *
 * @link https://github.com/syntax-tree/mdast#listitem
 */
export interface ListItem extends Parent {
    type: "listItem";
    checked?: boolean;
    spread?: boolean;
    children: BlockContent[];
}

/**
 * Table represents two-dimensional data.
 *
 * Table can be used where block content is expected. Its content model is table content.
 *
 * The head of the node represents the labels of the columns.
 *
 * An align field can be present. If present, it must be a list of alignTypes. It represents
 * how cells in columns are aligned.
 *
 * @link https://github.com/syntax-tree/mdast#table
 */
export interface Table extends Parent {
    type: "table";
    align?: alignType[];
    children: TableContent[];
}
/**
 * TableRow represents a row of cells in a table.
 *
 * TableRow can be used where table content is expected. Its content model is row content.
 *
 * If the node is a head, it represents the labels of the columns for its parent Table.
 *
 * @link https://github.com/syntax-tree/mdast#tablerow
 */
export interface TableRow extends Parent {
    type: "tableRow";
    children: RowContent[];
}

/**
 * TableCell represents a header cell in a Table, if its parent is a head, or a data cell otherwise.
 *
 * TableCell can be used where row content is expected. Its content model is phrasing content.
 *
 * @link https://github.com/syntax-tree/mdast#tablecell
 */

export interface TableCell extends Parent {
    type: "tableCell";
    children: PhrasingContent[];
}

/**
 * HTML (Literal) represents a fragment of raw HTML.
 *
 * HTML can be used where block or phrasing content is expected.
 * Its content is represented by its value field.
 *
 * @link https://github.com/syntax-tree/mdast#html
 */
export interface HTML extends Literal {
    type: "html";
}

/**
 * Code represents a block of preformatted text, such as ASCII art or computer code.
 *
 * Code can be used where block content is expected. Its content is represented by its value field.
 *
 * This node relates to the phrasing content concept InlineCode.
 *
 * A lang field can be present. It represents the language of computer code being marked up.
 *
 * If the lang field is present, a meta field can be present. It represents custom information
 * relating to the node.
 *
 * @link https://github.com/syntax-tree/mdast#code
 */
export interface Code extends Literal {
    type: "code";
    lang?: string;
    meta?: string;
}

/**
 * YAML (Literal) represents a collection of metadata for the document in the YAML data
 * serialisation language.
 *
 * YAML can be used where frontmatter content is expected. Its content is represented by its
 * value field.
 *
 * @link https://github.com/syntax-tree/mdast#yaml
 */
export interface YAML extends Literal {
    type: "yaml"
}

/**
 * @link https://github.com/syntax-tree/mdast#definition
 */
export interface Definition extends Unist2.Node, Association, Resource {
    type: "definition";
  }

/**
 * @link https://github.com/syntax-tree/mdast#footnotedefinition
 */
export interface FootnoteDefinition extends Parent, Association {
    type: "footnoteDefinition";
    children: BlockContent[];
}

/**
 * Text (Literal) represents everything that is just text.
 *
 * Text can be used where phrasing content is expected. Its content is represented by its value field.
 *
 * @link https://github.com/syntax-tree/mdast#text
 */
export interface Text extends Literal {
    type: "text";
}

/**
 * Emphasis (Parent) represents stress emphasis of its contents.
 *
 * Emphasis can be used where phrasing content is expected.
 * Its content model is also phrasing content.
 *
 * @link https://github.com/syntax-tree/mdast#emphasis
 */
export interface Emphasis extends Parent {
    type: "emphasis";
    children: PhrasingContent[];
}

/**
 * Strong (Parent) represents strong importance, seriousness, or urgency for its contents.
 *
 * Strong can be used where phrasing content is expected. Its content model is also phrasing content.
 *
 * @link https://github.com/syntax-tree/mdast#strong
 */
export interface Strong extends Parent {
    type: "strong";
    children: PhrasingContent[];
}

/**
 * Delete (Parent) represents contents that are no longer accurate or no longer relevant.
 *
 * Delete can be used where phrasing content is expected. Its content model is also phrasing content.
 *
 * @link https://github.com/syntax-tree/mdast#delete
 */
export interface Delete extends Parent {
    type: "delete";
    children: PhrasingContent[];
}

/**
 * InlineCode (Literal) represents a fragment of computer code, such as a file name,
 * computer program, or anything a computer could parse.
 *
 * InlineCode can be used where phrasing content is expected. Its content is represented by
 * its value field.
 *
 * This node relates to the block content concept Code.
 *
 * @link https://github.com/syntax-tree/mdast#inlinecode
 */
export interface InlineCode extends Literal {
    type: "inlineCode";
}

/**
 * Break (Node) represents a line break, such as in poems or addresses.
 *
 * Break can be used where phrasing content is expected. It has no content model.
 *
 * @link https://github.com/syntax-tree/mdast#break
 */
export interface Break extends Unist2.Node {
    type: "break";
}

/**
 * Link (Parent) represents a hyperlink.
 *
 * Link can be used where phrasing content is expected. Its content model is static phrasing content.
 * @link https://github.com/syntax-tree/mdast#link
 */
export interface Link extends Parent, Resource {
    type: "link"
    children: StaticPhrasingContent[];
}
/**
 * @link https://github.com/syntax-tree/mdast#image
 */
export interface Image extends Unist2.Node, Resource, Alternative {
    type: "image";
}

/**
 * @link https://github.com/syntax-tree/mdast#linkreference
 */

export interface LinkReference extends Parent, Reference {
    type: "linkReference"
    children: [StaticPhrasingContent]
  }
/**
 * @link https://github.com/syntax-tree/mdast#imagereference
 */
export interface ImageReference extends Unist2.Node, Reference, Alternative {
    type: "imageReference"
  }


/**
 * Footnote (Parent) represents content relating to the document that is outside its flow.
 *
 * Footnote can be used where phrasing content is expected. Its content model is also phrasing content.
 *
 * @link https://github.com/syntax-tree/mdast#footnote
 */
export interface Footnote extends Parent {
    type: "footnote";
    children: PhrasingContent[];
}

/**
 * @link https://github.com/syntax-tree/mdast#footnotereference
 */
export interface FootnoteReference extends Unist2.Node, Association {
    type: "footnoteReference";
  }
//-------------------------
//       MIXINS
//-------------------------

/**
 * Resource represents a reference to resource.
 *
 * A url field must be present. It represents a URL to the referenced resource.
 *
 * A title field can be present. It represents advisory information for the resource,
 * such as would be appropriate for a tooltip.
 */
interface Resource {
    url: string;
    title?: string;
}

/**
 * Association represents an internal relation from one node to another.
 *
 * An identifier field must be present. It can match an identifier field on another node.
 *
 * A label field can be present. It represents the original value of the normalised identifier field.
 *
 * Whether the value of identifier is expected to be a unique identifier or not depends
 * on the type of node including the Association. An example of this is that identifier
 * on Definition should be a unique identifier, whereas multiple LinkReferences can have
 * the same identifier and be associated with one definition.
 *
 * @link https://github.com/syntax-tree/mdast#association
 */
interface Association {
    identifier: string;
    label?: string;
}

/**
 * Reference represents a marker that is associated to another node.
 *
 * A referenceType field must be present. Its value must be a referenceType.
 * It represents the explicitness of the reference.
 *
 * @link https://github.com/syntax-tree/mdast#reference
 */
interface Reference extends Association {
    referenceType: string;
}


/**
 * Alternative represents a node with a fallback
 *
 * An alt field should be present. It represents equivalent content for environments that
 * cannot represent the node as intended.
 *
 * @link https://github.com/syntax-tree/mdast#alternative
 */
interface Alternative {
    alt?: string;
}

// ----------
// Enumeration
// ----------

/**
 * @link https://github.com/syntax-tree/mdast#aligntype
 */
type alignType
    = "left"
    | "right"
    | "center"
    | null
;

/**
 * @link https://github.com/syntax-tree/mdast#referencetype
 */
type referenceType
    = "shortcut"
    | "collapsed"
    | "full"
;

// ----------
// CONTENT
// ----------
type Content
    = TopLevelContent
    | ListContent
    | TableContent
    | RowContent
    | PhrasingContent
;

type TopLevelContent
    = BlockContent
    | FrontmatterContent
    | DefinitionContent
;

/**
 * Block content represent the sections of document.
 */
type BlockContent
    = Paragraph
    | Heading
    | ThematicBreak
    | Blockquote
    | List
    | Table
    | HTML
    | Code
;

type FrontmatterContent = YAML;

type DefinitionContent = Definition | FootnoteDefinition;

/**
 * List content represent the items in a list.
 */
type ListContent = ListItem;

type TableContent = TableRow;

type RowContent = TableCell;
/**
 * Phrasing content represent the text in a document, and its markup.
 */
type PhrasingContent
    = StaticPhrasingContent
    | Link
    | LinkReference
;

type StaticPhrasingContent
    = Text
    | Emphasis
    | Strong
    | Delete
    | HTML
    | InlineCode
    | Break
    | Image
    | ImageReference
    | Footnote
    | FootnoteReference
;
