import { Plugin } from 'unified';
import { Root, RootContent } from 'hast';
import { visit } from 'unist-util-visit';

export interface RetrieveMetaOptions {}

export const retrieveMeta: Plugin<[RetrieveMetaOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, (node: Root | RootContent) => {
      if (node.type === 'element' && node.tagName === 'code' && node.properties && node.properties['dataMeta']) {
        if (!node.data) {
          node.data = {};
        }
        node.data.meta = node.properties['dataMeta'];
        delete node.properties['dataMeta'];
      }
    });
  };
};
