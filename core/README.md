<!--rehype:ignore:start-->
React Markdown Preview
===
<!--rehype:ignore:end-->

[![Build and Deploy](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml/badge.svg)](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@uiw/react-markdown-preview/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@uiw/react-markdown-preview)
[![Downloads](https://img.shields.io/npm/dm/@uiw/react-markdown-preview.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![Coverage Status](https://uiwjs.github.io/react-markdown-preview/badge.svg)](https://uiwjs.github.io/react-markdown-preview/coverage/lcov-report/)
[![npm version](https://img.shields.io/npm/v/@uiw/react-markdown-preview.svg)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![npm unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-markdown-preview/file/README.md)
[![Repo Dependents](https://badgen.net/github/dependents-repo/uiwjs/react-markdown-preview)](https://github.com/uiwjs/react-markdown-preview/network/dependents)

React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style. The current [document website](https://uiwjs.github.io/react-markdown-preview/) is converted using this react component.

## Features

- 🌒 Support dark-mode/night-mode. `@v4`
- 🙆🏼‍♂️ GitHub style: The markdown content is rendered as close to the way it's rendered on GitHub as possible.
- 🏋🏾‍♂️ Support [GFM](https://github.github.com/gfm/) (autolink literals, footnotes, strikethrough, tables, tasklists).
- 🍭 Support automatic code block highlight.
- 🐝 Support for defining styles via comment.
- ⛳️ Support for [GFM footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)

## Quick Start

```bash
$ npm install @uiw/react-markdown-preview --save
```

## Usage Example

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)

```jsx mdx:preview&checkered=0
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
## MarkdownPreview

> todo: React component preview markdown text.
`;

export default function Demo() {
  return (
    <MarkdownPreview source={source} />
  )
}
```

## Disable Header links

```jsx mdx:preview&checkered=0
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
## MarkdownPreview

## Header 2

### Header 3
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  );
}
```

## highlight line

syntax: <code>```jsx {1,4-5}</code>

```jsx mdx:preview
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
\`\`\`js {2}
function () {
  console.log('hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello')
}
\`\`\`
\`\`\`js {2}
function () {
  console.log('hello ')
}
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  );
}
```

## Show Line Numbers

syntax: <code>```jsx showLineNumbers {1,4-5}</code>

```jsx mdx:preview?background=#fff
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
\`\`\`js showLineNumbers
function () {
  console.log('hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello')
}
\`\`\`
\`\`\`js showLineNumbers {2}
function () {
  console.log('hello ')
}
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  );
}
```

## Code Highlight

```jsx mdx:preview
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
\`\`\`js
function () {
  console.log('hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello')
}
\`\`\`
\`\`\`js
function () {
  console.log('hello ')
}
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview source={source} />
  );
}
```

## Remove Code Highlight

The following example can help you _exclude code highlighting code_<!--rehype:style=color: #333;background-color: rgb(196 255 122 / 86%);--> from being included in the bundle. `@uiw/react-markdown-preview/nohighlight`<!--rehype:style=color: #e24444;--> component does not contain the `rehype-prism-plus` code highlighting package, `showLineNumbers` and `highlight line` functions will no longer work. ([#586](https://github.com/uiwjs/react-md-editor/issues/586))

```jsx mdx:preview
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview/nohighlight';

const source = `
\`\`\`js showLineNumbers
function () {
  console.log('hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello')
}
\`\`\`
\`\`\`js showLineNumbers {2}
function () {
  console.log('hello ')
}
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  );
}
```

## Ignore

Ignore content display via HTML comments, Shown in GitHub readme, excluded in HTML.

```jsx mdx:preview?background=#fff
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
<!--rehype:ignore:start-->
Content ignored
<!--rehype:ignore:end-->
Some content is ignored, please check the source code
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  );
}
```

```md
<!--rehype:ignore:start-->Ignored content<!--rehype:ignore:end-->
```

## Support Custom Mermaid Preview

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-markdown-preview-https-github-com-uiwjs-react-markdown-preview-issues-238-lw6vr5?fontsize=14&hidenavigation=1&theme=dark)

```jsx mdx:preview?background=#fff
import React, { useState, useRef, useEffect, Fragment, useCallback } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getCodeString } from 'rehype-rewrite';
import mermaid from "mermaid";

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`);
  const [container, setContainer] = useState(null);
  const isMermaid = className && /^language-mermaid/.test(className.toLocaleLowerCase());
  const code = props.node && props.node.children ? getCodeString(props.node.children) : children[0] || '';

  const reRender = async () => {
    if (container && isMermaid) {
      try {
        const str = await mermaid.render(demoid.current, code);
        container.innerHTML = str.svg;
      } catch (error) {
        container.innerHTML = error;
      }
    }
  }

  useEffect(() => {
    reRender()
  }, [container, isMermaid, code, demoid]);

  const refElement = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  if (isMermaid) {
    return (
      <Fragment>
        <code id={demoid.current} style={{ display: "none" }} />
        <code ref={refElement} data-name="mermaid" />
      </Fragment>
    );
  }
  return <code>{children}</code>;
};

const source = `
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      components={{
        code: Code
      }}
    />
  );
}
```

### Options Props

```typescript
import { ReactMarkdownProps } from 'react-markdown';
import { RehypeRewriteOptions } from 'rehype-rewrite';

type MarkdownPreviewProps = {
  prefixCls?: string;
  className?: string;
  source?: string;
  disableCopy?: boolean;
  style?: React.CSSProperties;
  pluginsFilter?: (type: 'rehype' | 'remark', plugin: PluggableList) => PluggableList;
  wrapperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    'data-color-mode'?: 'light' | 'dark';
  };
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  rehypeRewrite?: RehypeRewriteOptions['rewrite'];
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
- `skipHtml` (`boolean`, default: ~~`false`~~ -> [`true`](https://github.com/uiwjs/react-markdown-preview/issues/205) )\
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
- `remarkPlugins`<!--rehype:style=color: red;background-color: #ffeb3b;--> (`Array.<Plugin>`, default: `[]`)\
    List of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options
- `rehypePlugins`<!--rehype:style=color: red;background-color: #ffeb3b;--> (`Array.<Plugin>`, default: `[]`)\
    List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options

## Markdown Features

### Supports for CSS Style

Use HTML comments [`<!--rehype:xxx-->`](https://github.com/jaywcjlove/rehype-attr)<!--rehype:style=color: red;--> to let Markdown support style customization.

```markdown
## Title
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

Markdown Supports **Style**<!--rehype:style=color: red;-->
```

### Support for [GFM footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)

```markdown
Here is a simple footnote[^1]. With some additional text after it.

[^1]: My reference.
```

### Ignore content display

```markdown
# Hello World

<!--rehype:ignore:start-->Hello World<!--rehype:ignore:end-->

Good!
```

Output:

```html
<h1>Hello World</h1>

<p>Good!</p>
```

## Support dark-mode/night-mode

By default, the [`dark-mode`](https://github.com/jaywcjlove/dark-mode/) is automatically switched according to the system. If you need to switch manually, just set the `data-color-mode="dark"` parameter for body. 

```html
<html data-color-mode="dark">
```

```js
document.documentElement.setAttribute('data-color-mode', 'dark')
document.documentElement.setAttribute('data-color-mode', 'light')
```

Inherit custom color variables by adding [`.wmde-markdown-var`](https://github.com/uiwjs/react-markdown-preview/blob/a53be1e93fb1c2327649c4a6b084adb80679affa/src/styles/markdown.less#L1-L193) selector.

```jsx
const Demo = () => {
  return (
    <div>
      <div className="wmde-markdown-var"> </div>
      <MarkdownPreview source="Hello World!" />
    </div>
  )
}
```

Set the `light` theme.

```diff
<MarkdownPreview
  source="Hello World!"
  wrapperElement={{
+    "data-color-mode": "light"
  }}
/>
```

## Development

Runs the project in development mode.  

```bash
# Step 1, run first,
# listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
# listen to the component compile and output the .css file
npm run start
# Step 2, development mode, listen to compile preview website instance
npm run doc
```

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Alternatives

If you need more features-rich Markdown Editor, you can use [@uiwjs/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor)

- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-textarea-code-editor](https://github.com/uiwjs/react-textarea-code-editor): A simple code editor with syntax highlighting.
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React. @codemirror
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-markdown-preview/graphs/contributors">
  <img src="https://uiwjs.github.io/react-markdown-preview/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
