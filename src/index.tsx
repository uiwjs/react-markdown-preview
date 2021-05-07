import React, { useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrism from '@mapbox/rehype-prism';
import './styles/markdown.less';
import './styles/markdowncolor.less';

export type MarkdownPreviewProps = {
  className?: string;
  source?: string;
  style?: React.CSSProperties;
  warpperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & Omit<ReactMarkdown.ReactMarkdownOptions, 'children'>;

export type MarkdownPreviewRef = {
  mdp: React.RefObject<HTMLDivElement>;
} & MarkdownPreviewProps;

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const { className, source, style, onScroll, onMouseOver, warpperElement = {}, ...other  } = props || {};
  const mdp = React.createRef<HTMLDivElement>();
  useImperativeHandle(ref, () => ({ ...props, mdp }), [mdp, props]);

  const cls = `wmde-markdown wmde-markdown-color ${className || ''}`;
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...warpperElement} className={cls} style={style}>
      <ReactMarkdown
        {...other}
        plugins={[gfm,  ...(other.plugins || [])]}
        rehypePlugins={[[rehypePrism, {ignoreMissing: true }], rehypeRaw, ...(other.rehypePlugins || [])]}
        children={source || ''}
      />
    </div>
  );
});
