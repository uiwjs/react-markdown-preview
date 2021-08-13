React Markdown Preview
===
<!--dividing-->

[![Downloads](https://img.shields.io/npm/dm/@uiw/react-markdown-preview.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![Issues](https://img.shields.io/github/issues/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/issues)
[![Forks](https://img.shields.io/github/forks/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/network)
[![Stars](https://img.shields.io/github/stars/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/stargazers)
[![Release](https://img.shields.io/github/release/uiwjs/react-markdown-preview)](https://github.com/uiwjs/react-markdown-preview/releases)
[![npm version](https://img.shields.io/npm/v/@uiw/react-markdown-preview.svg)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![npm unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-markdown-preview/file/README.md)

React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style. The current [document website](https://uiwjs.github.io/react-markdown-preview/) is converted using this react component.

## Quick Start

```bash
$ npm install @uiw/react-markdown-preview --save
```

## Usage Example

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)

```js
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
## MarkdownPreview

> todo: React component preview markdown text.
`;

function Demo() {
  return (
    <MarkdownPreview source={source} />
  )
}
```

### Options Props

```typescript
import { ReactMarkdownProps } from 'react-markdown';

type MarkdownPreviewProps = {
  className?: string;
  source?: string;
  style?: React.CSSProperties;
  warpperElement?: HTMLDivElement;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & ReactMarkdownProps;
```

- `source` (`string`, default: `''`)\
    Markdown to parse
- `className` (`string?`)\
    Wrap the markdown in a `div` with this class name

This [`ReactMarkdownProps`](https://github.com/remarkjs/react-markdown/tree/02bac837bf141cdb8face360fb88be6fa33ab194#props) details. [Upgrade `react-markdown` v6](https://github.com/remarkjs/react-markdown/blob/15b4757082cf3f32a25eba0b8ea30baf751a8b40/changelog.md#600---2021-04-15)



- `children` (`string`, default: `''`)\
    Markdown to parse
- `className` (`string?`)\
    Wrap the markdown in a `div` with this class name
- `skipHtml` (`boolean`, default: `false`)\
    Ignore HTML in Markdown completely
- `sourcePos` (`boolean`, default: `false`)\
    Pass a prop to all components with a serialized position
    (`data-sourcepos="3:1-3:13"`)
- `rawSourcePos` (`boolean`, default: `false`)\
    Pass a prop to all components with their [position][]
    (`sourcePosition: {start: {line: 3, column: 1}, end:…}`)
- `includeElementIndex` (`boolean`, default: `false`)\
    Pass the `index` (number of elements before it) and `siblingCount` (number
    of elements in parent) as props to all components
- `allowedElements` (`Array.<string>`, default: `undefined`)\
    Tag names to allow (can’t combine w/ `disallowedElements`).
    By default all elements are allowed
- `disallowedElements` (`Array.<string>`, default: `undefined`)\
    Tag names to disallow (can’t combine w/ `allowedElements`).
    By default no elements are disallowed
- `allowElement` (`(element, index, parent) => boolean?`, optional)\
    Function called to check if an element is allowed (when truthy) or not.
    `allowedElements` / `disallowedElements` is used first!
- `unwrapDisallowed` (`boolean`, default: `false`)\
    Extract (unwrap) the children of not allowed elements.
    By default, when `strong` is not allowed, it and it’s children is dropped,
    but with `unwrapDisallowed` the element itself is dropped but the children
    used
- `linkTarget` (`string` or `(href, children, title) => string`, optional)\
    Target to use on links (such as `_blank` for `<a target="_blank"…`)
- `transformLinkUri` (`(href, children, title) => string`, default:
    [`./uri-transformer.js`](https://github.com/remarkjs/react-markdown/blob/02bac837bf141cdb8face360fb88be6fa33ab194/lib/uri-transformer.js), optional)\
    URL to use for links.
    The default allows only `http`, `https`, `mailto`, and `tel`, and is
    exported from this module as `uriTransformer`.
    Pass `null` to allow all URLs.
    See [security][]
- `transformImageUri` (`(src, alt, title) => string`, default:
    [`./uri-transformer.js`](https://github.com/remarkjs/react-markdown/blob/02bac837bf141cdb8face360fb88be6fa33ab194/lib/uri-transformer.js), optional)\
    Same as `transformLinkUri` but for images
- `components` (`Object.<string, Component>`, default: `{}`)\
    Object mapping tag names to React components
- `remarkPlugins` (`Array.<Plugin>`, default: `[]`)\
    List of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options
- `rehypePlugins` (`Array.<Plugin>`, default: `[]`)\
    List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options


## Development

Runs the project in development mode.  

```bash
# Step 1, run first,
# listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# listen to the component compile and output the .css file
npm run css:watch
# Step 2, development mode, listen to compile preview website instance
npm start
```

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!


### Related

If you need more features-rich Markdown Editor, you can use [@uiwjs/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor)

- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React. @codemirror
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.
- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.

## License

Licensed under the MIT License.
