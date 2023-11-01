import React, { useImperativeHandle } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { PluggableList } from 'unified';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';
import { type RehypeRewriteOptions } from 'rehype-rewrite';
import { useCopied } from './plugins/useCopied';
import './styles/markdown.less';

export * from './preview';

export interface MarkdownPreviewProps extends Omit<Options, 'children'> {
  prefixCls?: string;
  className?: string;
  source?: string;
  disableCopy?: boolean;
  style?: React.CSSProperties;
  pluginsFilter?: (type: 'rehype' | 'remark', plugin: PluggableList) => PluggableList;
  wrapperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    'data-color-mode'?: 'light' | 'dark';
  };
  /**
   * Please use wrapperElement, Will be removed in v5 release.
   * @deprecated
   */
  warpperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    'data-color-mode'?: 'light' | 'dark';
  };
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  rehypeRewrite?: RehypeRewriteOptions['rewrite'];
}

export interface MarkdownPreviewRef extends MarkdownPreviewProps {
  mdp: React.RefObject<HTMLDivElement>;
}

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
  const remarkPlugins = [...(other.remarkPlugins || []), gfm];
  const wrapperProps = { ...warpperElement, ...wrapperElement };
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...wrapperProps} className={cls} style={style}>
      <ReactMarkdown
        {...customProps}
        {...other}
        skipHtml={skipHtml}
        rehypePlugins={pluginsFilter ? pluginsFilter('rehype', rehypePlugins) : rehypePlugins}
        remarkPlugins={pluginsFilter ? pluginsFilter('remark', remarkPlugins) : remarkPlugins}
        children={source || ''}
      />
    </div>
  );
});
