<!--rehype:ignore:start-->
React Markdown Preview
===
<!--rehype:ignore:end-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build and Deploy](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml/badge.svg)](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml)
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
- ⛳️ Support for [Github Alert](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

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
    <MarkdownPreview source={source} style={{ padding: 16 }} />
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
      style={{ padding: 16 }}
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
      style={{ padding: 16 }}
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
      style={{ padding: 16 }}
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
    <MarkdownPreview source={source} style={{ padding: 16 }} />
  );
}
```

## Remove Code Highlight

The following example can help you _exclude code highlighting code_<!--rehype:style=color: #333;background-color: rgb(196 255 122 / 86%);--> from being included in the bundle. `@uiw/react-markdown-preview/nohighlight`<!--rehype:style=color: #e24444;--> component does not contain the `rehype-prism-plus` code highlighting package, `showLineNumbers` and `highlight line` functions will no longer work. ([#586](https://github.com/uiwjs/react-md-editor/issues/586))

```jsx mdx:preview
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview/nohighlight';

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
    <MarkdownPreview
      source={source}
      style={{ padding: 16 }}
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
      style={{ padding: 16 }}
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

## Support Custom KaTeX Preview

KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web, We perform math rendering through [`KaTeX`](https://github.com/KaTeX/KaTeX).

```bash
npm install katex
```

```jsx mdx:preview?background=#fff
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getCodeString } from 'rehype-rewrite';
import katex from 'katex';
import 'katex/dist/katex.css';

const source = `This is to display the 
\`\$\$\c = \\pm\\sqrt{a^2 + b^2}\$\$\`
 in one line

\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
`;

export default function Demo() {
  const [value, setValue] = React.useState(source);
  return (
    <MarkdownPreview
      source={source}
      style={{ padding: 16 }}
      components={{
        code: ({ children = [], className, ...props }) => {
          if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
            const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
              throwOnError: false,
            });
            return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: 'transparent' }} />;
          }
          const code = props.node && props.node.children ? getCodeString(props.node.children) : children;
          if (
            typeof code === 'string' &&
            typeof className === 'string' &&
            /^language-katex/.test(className.toLocaleLowerCase())
          ) {
            const html = katex.renderToString(code, {
              throwOnError: false,
            });
            return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          return <code className={String(className)}>{children}</code>;
        },
      }}
    />
  );
}
```

## Support Custom Mermaid Preview

Using [mermaid](https://github.com/mermaid-js/mermaid) to generation of diagram and flowchart from text in a similar manner as markdown

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
const source = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;
// const source = `
// \`\`\`mermaid
// graph TD;
//     A-->B;
//     A-->C;
//     B-->D;
//     C-->D;
// \`\`\`
// `;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      style={{ padding: 16 }}
      components={{
        code: Code
      }}
    />
  );
}
```

## Security

Please note markdown needs to be sanitized if you do not completely trust your authors. Otherwise, your app is vulnerable to XSS. This can be achieved by adding [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) as a plugin.

```jsx mdx:preview&checkered=0
import React from 'react';
import rehypeSanitize from "rehype-sanitize";
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
## MarkdownPreview

**Hello world!!!** <IFRAME SRC=\"javascript:javascript:alert(window.origin);\"></IFRAME>

<!-- test --> 123

<!-- test --> 456 <!-- test -->
`;

const rehypePlugins = [rehypeSanitize];
export default function Demo() {
  return (
    <MarkdownPreview source={source} rehypePlugins={rehypePlugins} style={{ padding: 16 }} />
  )
}
```

## Options Props

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

This [`ReactMarkdownProps`](https://github.com/remarkjs/react-markdown/tree/02bac837bf141cdb8face360fb88be6fa33ab194#props) details. [Upgrade `react-markdown` v9](https://github.com/remarkjs/react-markdown/tree/a27d335fc5419db4a2811e7f589d6467218346de?tab=readme-ov-file#options)

- `children` (`string`, default: `''`)\
    Markdown to parse
- `className` (`string?`)\
    Wrap the markdown in a `div` with this class name
- `skipHtml` (`boolean`, default: ~~`false`~~ -> [`true`](https://github.com/uiwjs/react-markdown-preview/issues/205) )\
    Ignore HTML in Markdown completely
- `allowElement` (`(element, index, parent) => boolean?`, optional)\
    Function called to check if an element is allowed (when truthy) or not.
    `allowedElements` / `disallowedElements` is used first!
- `remarkPlugins`<!--rehype:style=color: red;background-color: #ffeb3b;--> (`Array.<Plugin>`, default: `[]`)\
    List of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options
- `rehypePlugins`<!--rehype:style=color: red;background-color: #ffeb3b;--> (`Array.<Plugin>`, default: `[]`)\
    List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use.
    See the next section for examples on how to pass options

> [!NOTE]
>
> [Upgrade `react-markdown` ~~v8~~ to v9](https://github.com/remarkjs/react-markdown/blob/a27d335fc5419db4a2811e7f589d6467218346de/changelog.md?plain=1#L5-L144)

### Add `urlTransform`

The `transformImageUri` and `transformLinkUri` were removed.
Having two functions is a bit much, particularly because there are more URLs
you might want to change (or which might be unsafe so *we* make them safe).
And their name and APIs were a bit weird.
You can use the new `urlTransform` prop instead to change all your URLs.

### Remove `linkTarget`

The `linkTarget` option was removed; you should likely not set targets.
If you want to, use
[`rehype-external-links`](https://github.com/rehypejs/rehype-external-links).

### Remove `includeElementIndex`

The `includeElementIndex` option was removed, so `index` is never passed to
components.
Write a plugin to pass `index`:

<details>
<summary>Show example of plugin</summary>

```jsx
import {visit} from 'unist-util-visit'

function rehypePluginAddingIndex() {
  /**
   * @param {import('hast').Root} tree
   * @returns {undefined}
   */
  return function (tree) {
    visit(tree, function (node, index) {
      if (node.type === 'element' && typeof index === 'number') {
        node.properties.index = index
      }
    })
  }
}
```

</details>

### Remove `rawSourcePos`

The `rawSourcePos` option was removed, so `sourcePos` is never passed to
components.
All components are passed `node`, so you can get `node.position` from them.

### Remove `sourcePos`

The `sourcePos` option was removed, so `data-sourcepos` is never passed to
elements.
Write a plugin to pass `index`:

<details>
<summary>Show example of plugin</summary>

```jsx
import {stringifyPosition} from 'unist-util-stringify-position'
import {visit} from 'unist-util-visit'

function rehypePluginAddingIndex() {
  /**
   * @param {import('hast').Root} tree
   * @returns {undefined}
   */
  return function (tree) {
    visit(tree, function (node) {
      if (node.type === 'element') {
        node.properties.dataSourcepos = stringifyPosition(node.position)
      }
    })
  }
}
```

</details>

### Remove extra props passed to certain components

When overwriting components, these props are no longer passed:

*   `inline` on `code`
    — create a plugin or use `pre` for the block
*   `level` on `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
    — check `node.tagName` instead
*   `checked` on `li`
    — check `task-list-item` class or check `props.children`
*   `index` on `li`
    — create a plugin
*   `ordered` on `li`
    — create a plugin or check the parent
*   `depth` on `ol`, `ul`
    — create a plugin
*   `ordered` on `ol`, `ul`
    — check `node.tagName` instead
*   `isHeader` on `td`, `th`
    — check `node.tagName` instead
*   `isHeader` on `tr`
    — create a plugin or check children


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

### Support for Github Alerts

```jsx mdx:preview&checkered=0
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `> 
> 
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.


`;

export default function Demo() {
  return (
    <MarkdownPreview source={source} style={{ padding: 16 }} />
  )
}
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
