import type { PluggableList } from 'unified';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypeIgnore from 'rehype-ignore';
import { getCodeString, type RehypeRewriteOptions } from 'rehype-rewrite';
import type { Root, Element, RootContent } from 'hast';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';

export const rehypeRewriteHandle =
  (disableCopy: boolean, rewrite?: RehypeRewriteOptions['rewrite']) =>
  (node: Root | RootContent, index: number | null, parent: Root | Element | null) => {
    if (node.type === 'element' && parent && parent.type === 'root' && /h(1|2|3|4|5|6)/.test(node.tagName)) {
      const child = node.children && (node.children[0] as Element);
      if (child && child.properties && child.properties.ariaHidden === 'true') {
        child.properties = { class: 'anchor', ...child.properties };
        child.children = [octiconLink];
      }
    }
    if (node.type === 'element' && node.tagName === 'pre' && !disableCopy) {
      const code = getCodeString(node.children);
      node.children.push(copyElement(code));
    }
    rewrite && rewrite(node, index === null ? undefined : index, parent === null ? undefined : parent);
  };

export const defaultRehypePlugins: PluggableList = [slug, headings, rehypeIgnore];
