import { Plugin } from 'unified';
import { Root, RootContent, Element } from 'hast';
import { visit } from 'unist-util-visit';

export interface ReservedMetaOptions {}

export const reservedMeta: Plugin<[ReservedMetaOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, (node: Root | RootContent | Element) => {
      if (node.type === 'element' && node.tagName === 'code' && node.properties && node.properties.meta) {
        node.properties = { ...node.properties, 'data-meta': String(node.properties.meta) };
      }
      if (node.type === 'element' && node.tagName === 'code' && node.data && node.data.meta) {
        node.properties = { ...node.properties, 'data-meta': String(node.data.meta) };
      }
    });
  };
};
