import React, { useImperativeHandle } from 'react';
import ReactMarkdown, { type UrlTransform } from 'react-markdown';
import { type PluggableList } from 'unified';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';
import { remarkAlert } from 'remark-github-blockquote-alert';
import { useCopied } from './plugins/useCopied';
import { type MarkdownPreviewProps, type MarkdownPreviewRef } from './Props';
import './styles/markdown.less';

/**
 * https://github.com/uiwjs/react-md-editor/issues/607
 */
const defaultUrlTransform: UrlTransform = (url) => url;

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const {
    prefixCls = 'wmde-markdown wmde-markdown-color',
    className,
    source,
    style,
    disableCopy = false,
    skipHtml = true,
    onScroll,
    onMouseOver,
    pluginsFilter,
    rehypeRewrite: rewrite,
    wrapperElement = {},
    warpperElement = {},
    urlTransform,
    ...other
  } = props;
  const mdp = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ ...props, mdp }), [mdp, props]);
  const cls = `${prefixCls || ''} ${className || ''}`;
  useCopied(mdp);
  const rehypePlugins: PluggableList = [...(other.rehypePlugins || [])];
  const customProps: MarkdownPreviewProps = {
    allowElement: (element, index, parent) => {
      if (other.allowElement) {
        return other.allowElement(element, index, parent);
      }
      return /^[A-Za-z0-9]+$/.test(element.tagName);
    },
  };
  if (skipHtml) {
    rehypePlugins.push(raw);
  }
  const remarkPlugins = [remarkAlert, ...(other.remarkPlugins || []), gfm];
  const wrapperProps = { ...warpperElement, ...wrapperElement };
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...wrapperProps} className={cls} style={style}>
      <ReactMarkdown
        {...customProps}
        {...other}
        skipHtml={skipHtml}
        urlTransform={urlTransform || defaultUrlTransform}
        rehypePlugins={pluginsFilter ? pluginsFilter('rehype', rehypePlugins) : rehypePlugins}
        remarkPlugins={pluginsFilter ? pluginsFilter('remark', remarkPlugins) : remarkPlugins}
        children={source || ''}
      />
    </div>
  );
});
