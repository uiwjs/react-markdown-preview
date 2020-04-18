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

interface IMarkdownPreviewProps extends Omit<ReactMarkdownProps, 'className'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
```

This [`ReactMarkdownProps`](https://github.com/rexxars/react-markdown/blob/2d991aa1097e95064f0209fc6d3a15b6300c07c7/index.d.ts#L76-L95) details.

- `source` or `children` - _string_ The Markdown source to parse (**required**)
- `className` - _string_ Class name of the container element. If none is passed, a container will not be rendered.
- `escapeHtml` - _boolean_ Setting to `false` will cause HTML to be rendered (see notes below about proper HTML support). Be aware that setting this to `false` might cause security issues if the
  input is user-generated. Use at your own risk. (default: `true`).
- `skipHtml` - _boolean_ Setting to `true` will skip inlined and blocks of HTML (default: `false`).
- `sourcePos` - _boolean_ Setting to `true` will add `data-sourcepos` attributes to all elements,
  indicating where in the markdown source they were rendered from (default: `false`).
- `rawSourcePos` - _boolean_ Setting to `true` will pass a `sourcePosition` property to all renderers with structured source position information (default: `false`).
- `includeNodeIndex` - _boolean_ Setting to `true` will pass `index` and `parentChildCount` props to all renderers (default: `false`).
- `allowedTypes` - _array_ Defines which types of nodes should be allowed (rendered). (default: all
  types).
- `disallowedTypes` - _array_ Defines which types of nodes should be disallowed (not rendered).
  (default: none).
- `unwrapDisallowed` - _boolean_ Setting to `true` will try to extract/unwrap the children of
  disallowed nodes. For instance, if disallowing `Strong`, the default behaviour is to simply skip
  the text within the strong altogether, while the behaviour some might want is to simply have the
  text returned without the strong wrapping it. (default: `false`)
- `allowNode` - _function_ Function execute if in order to determine if the node should be allowed.
  Ran prior to checking `allowedTypes`/`disallowedTypes`. Returning a truthy value will allow the
  node to be included. Note that if this function returns `true` and the type is not in
  `allowedTypes` (or specified as a `disallowedType`), it won't be included. The function will
  receive three arguments argument (`node`, `index`, `parent`), where `node` contains different
  properties depending on the node type.
- `linkTarget` - _function|string_ Sets the default target attribute for links. If a function is
  provided, it will be called with `url`, `text`, and `title` and should return a string
  (e.g. `_blank` for a new tab). Default is `undefined` (no target attribute).
- `transformLinkUri` - _function|null_ Function that gets called for each encountered link with a
  single argument - `uri`. The returned value is used in place of the original. The default link URI
  transformer acts as an XSS-filter, neutralizing things like `javascript:`, `vbscript:` and `file:`
  protocols. If you specify a custom function, this default filter won't be called, but you can
  access it as `require('react-markdown').uriTransformer`. If you want to disable the default
  transformer, pass `null` to this option.
- `transformImageUri` - _function|null_ Function that gets called for each encountered image with a
  single argument - `uri`. The returned value is used in place of the original.
- `renderers` - _object_ An object where the keys represent the node type and the value is a React
  component. The object is merged with the default renderers. The props passed to the component
  varies based on the type of node.

See [Options Props](https://github.com/rexxars/react-markdown/tree/2d991aa1097e95064f0209fc6d3a15b6300c07c7#options) for more details.

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
