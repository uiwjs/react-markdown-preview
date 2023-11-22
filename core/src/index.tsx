import React from 'react';
import MarkdownPreview, { type MarkdownPreviewProps, type MarkdownPreviewRef } from './preview';
import rehypePrism from 'rehype-prism-plus';
import { PluggableList } from 'unified';
import rehypeRewrite from 'rehype-rewrite';
import rehypeAttrs from 'rehype-attr';
import rehypeRaw from 'rehype-raw';
import { reservedMeta } from './plugins/reservedMeta';
import { retrieveMeta } from './plugins/retrieveMeta';
import { rehypeRewriteHandle, defaultRehypePlugins } from './rehypePlugins';

export * from './preview';

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const rehypePlugins: PluggableList = [
    reservedMeta,
    rehypeRaw,
    retrieveMeta,
    [rehypePrism, { ignoreMissing: true }],
    ...defaultRehypePlugins,
    [rehypeRewrite, { rewrite: rehypeRewriteHandle(props.disableCopy ?? false, props.rehypeRewrite) }],
    [rehypeAttrs, { properties: 'attr' }],
    ...(props.rehypePlugins || []),
  ];
  return <MarkdownPreview {...props} rehypePlugins={rehypePlugins} ref={ref} />;
});
