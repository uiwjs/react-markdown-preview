import React, { useImperativeHandle } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { Root, Element, ElementContent } from 'hast';
import gfm from 'remark-gfm';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeAttrs from 'rehype-attr';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import rehypeRewrite from 'rehype-rewrite';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';
import './styles/markdown.less';
import './styles/markdowncolor.less';

const rehypeRewriteHandle = (node: ElementContent, index: number | null, parent: Root | Element | null) => {
  if (node.type === 'element' && parent && parent.type === 'root' && /h(1|2|3|4|5|6)/.test(node.tagName)) {
    const child = node.children && (node.children[0] as Element);
    if (child && child.properties && child.properties.ariaHidden === 'true') {
      child.properties = { class: 'anchor', ...child.properties };
      child.children = [octiconLink];
    }
  }
  if (node.type === 'element' && node.tagName === 'pre') {
    const code = getCodeStr(node.children);
    node.children.unshift(copyElement(code));
  }
};

const getCodeStr = (data: ElementContent[] = [], code: string = '') => {
  data.forEach((node) => {
    if (node.type === 'text') {
      code += node.value;
    } else if (node.type === 'element' && node.children && Array.isArray(node.children)) {
      code += getCodeStr(node.children);
    }
  });
  return code;
};

export interface MarkdownPreviewProps extends Omit<Options, 'children'> {
  prefixCls?: string;
  className?: string;
  source?: string;
  style?: React.CSSProperties;
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
    warpperElement = {},
    ...other
  } = props;
  const mdp = React.createRef<HTMLDivElement>();
  useImperativeHandle(ref, () => ({ ...props, mdp }), [mdp, props]);
  const cls = `${prefixCls || ''} ${className || ''}`;
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...warpperElement} className={cls} style={style}>
      <ReactMarkdown
        {...other}
        rehypePlugins={[
          [rehypePrism, { ignoreMissing: true }],
          rehypeRaw,
          slug,
          headings,
          [rehypeRewrite, { rewrite: rehypeRewriteHandle }],
          [rehypeAttrs, { properties: 'attr' }],
          ...(other.rehypePlugins || []),
        ]}
        remarkPlugins={[...(other.remarkPlugins || []), gfm]}
        children={source || ''}
      />
    </div>
  );
});
