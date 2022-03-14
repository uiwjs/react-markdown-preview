import React, { useImperativeHandle } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { Root, Element, ElementContent } from 'hast';
import { PluggableList } from 'unified';
import gfm from 'remark-gfm';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeAttrs from 'rehype-attr';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite, { getCodeString } from 'rehype-rewrite';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';
import './styles/markdown.less';

const rehypeRewriteHandle = (node: ElementContent, index: number | null, parent: Root | Element | null) => {
  if (node.type === 'element' && parent && parent.type === 'root' && /h(1|2|3|4|5|6)/.test(node.tagName)) {
    const child = node.children && (node.children[0] as Element);
    if (child && child.properties && child.properties.ariaHidden === 'true') {
      child.properties = { class: 'anchor', ...child.properties };
      child.children = [octiconLink];
    }
  }
  if (node.type === 'element' && node.tagName === 'pre') {
    const code = getCodeString(node.children);
    node.children.push(copyElement(code));
  }
};

export interface MarkdownPreviewProps extends Omit<Options, 'children'> {
  prefixCls?: string;
  className?: string;
  source?: string;
  style?: React.CSSProperties;
  pluginsFilter?: (type: 'rehype' | 'remark', plugin: PluggableList) => PluggableList;
  warpperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
    onScroll,
    onMouseOver,
    pluginsFilter,
    warpperElement = {},
    ...other
  } = props;
  const mdp = React.createRef<HTMLDivElement>();
  useImperativeHandle(ref, () => ({ ...props, mdp }), [mdp, props]);
  const cls = `${prefixCls || ''} ${className || ''}`;
  const rehypePlugins: PluggableList = [
    [rehypePrism, { ignoreMissing: true }],
    rehypeRaw,
    slug,
    headings,
    [rehypeRewrite, { rewrite: rehypeRewriteHandle }],
    [rehypeAttrs, { properties: 'attr' }],
    ...(other.rehypePlugins || []),
  ];
  const remarkPlugins = [...(other.remarkPlugins || []), gfm];
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...warpperElement} className={cls} style={style}>
      <ReactMarkdown
        {...other}
        rehypePlugins={pluginsFilter ? pluginsFilter('rehype', rehypePlugins) : rehypePlugins}
        remarkPlugins={pluginsFilter ? pluginsFilter('remark', remarkPlugins) : remarkPlugins}
        children={source || ''}
      />
    </div>
  );
});
