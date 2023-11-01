declare module '@uiw/react-markdown-preview/nohighlight' {
  import React from 'react';
  import { Options } from 'react-markdown';
  import { PluggableList } from 'unified';
  import { RehypeRewriteOptions } from 'rehype-rewrite';
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
  const _default: React.ForwardRefExoticComponent<MarkdownPreviewProps & React.RefAttributes<MarkdownPreviewRef>>;
  export default _default;
}
