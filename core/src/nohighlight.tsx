import React from 'react';
import MarkdownPreview from './preview';
import { PluggableList } from 'unified';
import rehypeRewrite from 'rehype-rewrite';
import { reservedMeta } from './plugins/reservedMeta';
import { retrieveMeta } from './plugins/retrieveMeta';
import rehypeAttrs from 'rehype-attr';
import rehypeRaw from 'rehype-raw';
import { rehypeRewriteHandle, defaultRehypePlugins } from './rehypePlugins';
import type { MarkdownPreviewProps, MarkdownPreviewRef } from './Props';

export * from './Props';

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const rehypePlugins: PluggableList = [
    reservedMeta,
    rehypeRaw,
    retrieveMeta,
    ...defaultRehypePlugins,
    [rehypeRewrite, { rewrite: rehypeRewriteHandle(props.disableCopy ?? false, props.rehypeRewrite) }],
    [rehypeAttrs, { properties: 'attr' }],
    ...(props.rehypePlugins || []),
  ];
  return <MarkdownPreview {...props} rehypePlugins={rehypePlugins} ref={ref} />;
});
