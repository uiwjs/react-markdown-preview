import React, { useEffect, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import { loadLang } from './langs';
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
  lang: string[],
} & MarkdownPreviewProps;

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const { className, source, style, onScroll, onMouseOver, warpperElement = {}, ...other  } = props || {};
  const mdp = React.createRef<HTMLDivElement>();
  const loadedLang = React.useRef<string[]>(['markup']);
  useEffect(() => {
    highlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  async function highlight() {
    if (!mdp.current) return;
    const codes = mdp.current.getElementsByTagName('code') as unknown as HTMLElement[];
    for (const val of codes) {
      const tag = val.parentNode as HTMLElement;
      if (tag && tag.tagName === 'PRE' && /^language-/.test(val.className.trim())) {
        const lang = val.className.trim().replace(/^language-/, '');
        try {
          if (!loadedLang.current.includes(lang as never)) {
            loadedLang.current.push(lang);
            await loadLang(lang);
          }
          await Prism.highlightElement(val);
        } catch (error) { }
      }
    }
  }

  useImperativeHandle(ref, () => ({ ...props, lang: loadedLang.current, mdp }), [mdp, props]);

  const cls = `wmde-markdown wmde-markdown-color ${className || ''}`;
  return (
    <div ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...warpperElement} className={cls} style={style}>
      <ReactMarkdown
        {...other}
        plugins={[gfm,  ...(other.plugins || [])]}
        rehypePlugins={[rehypeRaw, ...(other.rehypePlugins || [])]}
      >
        {source || ''}
      </ReactMarkdown>
    </div>
  );
});
