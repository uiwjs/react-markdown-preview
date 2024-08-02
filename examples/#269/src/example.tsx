import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
## MarkdownPreview

\`\`\`bash
$ npm install @uiw/react-markdown-preview --save
\`\`\`
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      rehypePlugins={[
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              svg: ['className', 'hidden', 'viewBox', 'fill', 'height', 'width'],
              path: ['fill-rule', 'd'],
              div: ['className', 'class', 'data-code', ...(defaultSchema.attributes?.div || [])],
            },
            tagNames: [...(defaultSchema.tagNames || []), 'svg', 'path', 'div'],
          },
        ],
      ]}
      style={{ padding: 16 }}
    />
  );
}
