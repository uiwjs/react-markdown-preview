React Markdown Preview
===
<!--dividing-->

[![](https://img.shields.io/github/issues/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/issues)
[![](https://img.shields.io/github/forks/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/network)
[![](https://img.shields.io/github/stars/uiwjs/react-markdown-preview.svg)](https://github.com/uiwjs/react-markdown-preview/stargazers)
[![](https://img.shields.io/github/release/uiwjs/react-markdown-preview)](https://github.com/uiwjs/react-markdown-preview/releases)
[![](https://img.shields.io/npm/v/@uiw/react-markdown-preview.svg)](https://www.npmjs.com/package/@uiw/react-markdown-preview)

React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style. The current [document website](https://uiwjs.github.io/react-markdown-preview/) is converted using this react component.

## Quick Start

```bash
$ npm install @uiw/react-markdown-preview --save
```

## Usage Example

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
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & ReactMarkdownProps;
```

This [`ReactMarkdownProps`](https://github.com/remarkjs/react-markdown/blob/22bb78747d768181cb9ea8711b5e13c3768921d8/index.d.ts#L32-L84) details.

- `source` (`string`, default: `''`)\
    Markdown to parse
- `className` (`string?`)\
    Wrap the markdown in a `div` with this class name
- `allowDangerousHtml` (`boolean`, default: `false`)\
    This project is safe by default and escapes HTML.
    Use `allowDangerousHtml: true` to allow dangerous html instead.
    See [security](https://github.com/remarkjs/react-markdown/tree/22bb78747d768181cb9ea8711b5e13c3768921d8#security)
- `skipHtml` (`boolean`, default: `false`)\
    Ignore HTML in Markdown
- `sourcePos` (`boolean`, default: `false`)\
    Pass a prop to all renderers with a serialized position
    (`data-sourcepos="3:1-3:13"`)
- `rawSourcePos` (`boolean`, default: `false`)\
    Pass a prop to all renderers with their [position](https://github.com/syntax-tree/unist#position)
    (`sourcePosition: {start: {line: 3, column: 1}, end:…}`)
- `includeNodeIndex` (`boolean`, default: `false`)\
    Pass [`index`](https://github.com/syntax-tree/unist#index) and `parentChildCount` in props to all renderers
- `allowedTypes` (`Array.<string>`, default: list of all types)\
    Node types to allow (can’t combine w/ `disallowedTypes`).
    All types are available at `ReactMarkdown.types`
- `disallowedTypes` (`Array.<string>`, default: `[]`)\
    Node types to disallow (can’t combine w/ `allowedTypes`)
- `allowNode` (`(node, index, parent) => boolean?`, optional)\
    Function called to check if a node is allowed (when truthy) or not.
    `allowedTypes` / `disallowedTypes` is used first!
- `unwrapDisallowed` (`boolean`, default: `false`)\
    Extract (unwrap) the children of not allowed nodes.
    By default, when `strong` is not allowed, it and it’s content is dropped,
    but with `unwrapDisallowed` the node itself is dropped but the content used
- `linkTarget` (`string` or `(url, text, title) => string`, optional)\
    Target to use on links (such as `_blank` for `<a target="_blank"…`)
- `transformLinkUri` (`(uri) => string`, default:
    [`./uri-transformer.js`][uri], optional)\
    URL to use for links.
    The default allows only `http`, `https`, `mailto`, and `tel`, and is
    available at `ReactMarkdown.uriTransformer`.
    Pass `null` to allow all URLs.
    See [security](https://github.com/remarkjs/react-markdown/tree/22bb78747d768181cb9ea8711b5e13c3768921d8#security)
- `transformImageUri` (`(uri) => string`, default:
    [`./uri-transformer.js`][uri], optional)\
    Same as `transformLinkUri` but for images
- `renderers` (`Object.<Component>`, default: `{}`)\
    Object mapping node types to React components.
    Merged with the default renderers (available at `ReactMarkdown.renderers`).
    Which props are passed varies based on the node
- `plugins` (`Array.<Plugin>`, default: `[]`)\
    List of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options

See [Options Props](https://github.com/remarkjs/react-markdown/tree/22bb78747d768181cb9ea8711b5e13c3768921d8#props) for more details.

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
npm run ts:watch
# Step 2, listen for compilation output type .d.ts file
npm run types:watch
# Step 3, development mode, listen to compile preview website instance
npm run doc:dev
```

Builds the app for production to the build folder.

```bash
npm run released
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## License

Licensed under the MIT License.
