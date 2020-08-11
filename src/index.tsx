import React, { Component } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import allowNode from './allowNode';
import { loadLang } from './langs';
import './styles/markdown.less';
import './styles/markdowncolor.less';

export type {
  ReactMarkdownProps,
  MarkdownAbstractSyntaxTree,
  NodeType,
  RemarkParseOptions,
  Position,
  Point,
  AlignType,
  ReferenceType,
  LinkTargetResolver,
  Renderers,
} from 'react-markdown';

export interface IMarkdownPreviewProps extends Omit<ReactMarkdownProps, 'className'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface IMarkdownPreviewState {
  value?: string;
}

export default class MarkdownPreview extends Component<IMarkdownPreviewProps, IMarkdownPreviewState> {
  public mdp = React.createRef<HTMLDivElement>();
  public loadedLang: string[] = ['markup'];
  public static defaultProps: IMarkdownPreviewProps = {
    renderers: {},
  }
  public constructor(props: IMarkdownPreviewProps) {
    super(props);
    this.state = {
      value: '' || props.source,
    };
  }
  componentDidMount() {
    this.highlight();
  }
  componentDidUpdate(prevProps: IMarkdownPreviewProps) {
    if (this.props.source !== prevProps.source) {
      this.setState({ value: this.props.source }, () => {
        this.highlight();
      });
    }
  }
  public renderHTML(mdStr?: string) {
    this.setState({ value: mdStr }, () => {
      this.highlight();
    });
  }
  public async highlight() {
    if (!this.mdp.current) return;
    const codes = this.mdp.current.getElementsByTagName('code') as unknown as HTMLElement[];
    for (const value of codes) {
      const tag = value.parentNode as HTMLElement;
      if (tag && tag.tagName === 'PRE' && /^language-/.test(value.className.trim())) {
        const lang = value.className.trim().replace(/^language-/, '');
        try {
          if (!this.loadedLang.includes(lang as never)) {
            this.loadedLang.push(lang);
            await loadLang(lang);
          }
          await Prism.highlightElement(value);
        } catch (error) { }
      }
    }
  }
  render() {
    const { className, style, onScroll, onMouseOver, ...other } = this.props;
    const cls = `wmde-markdown wmde-markdown-color ${className || ''}`;
    return (
      <div ref={this.mdp} onScroll={onScroll} style={style} onMouseOver={onMouseOver} className={cls} >
        <ReactMarkdown escapeHtml={false} allowNode={allowNode} {...other} source={this.state.value} />
      </div>
    );
  }
}