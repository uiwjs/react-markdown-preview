import React from 'react';
import MarkdownPreview, { type MarkdownPreviewProps, type MarkdownPreviewRef } from './preview';
import { PluggableList } from 'unified';
import rehypeRewrite from 'rehype-rewrite';
import { reservedMeta } from './plugins/reservedMeta';
import rehypeAttrs from 'rehype-attr';
import { rehypeRewriteHandle, defaultRehypePlugins } from './rehypePlugins';

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const rehypePlugins: PluggableList = [
    reservedMeta,
    ...defaultRehypePlugins,
    [rehypeRewrite, { rewrite: rehypeRewriteHandle(props.disableCopy ?? false, props.rehypeRewrite) }],
    [rehypeAttrs, { properties: 'attr' }],
    ...(props.rehypePlugins || []),
  ];
  return <MarkdownPreview {...props} rehypePlugins={rehypePlugins} ref={ref} />;
});
