import MarkdownPreview from '@uiw/react-markdown-preview';
import MDStr from '@uiw/react-markdown-preview/README.md';
import CodeLayout from 'react-code-preview-layout';
import { Root, Element, RootContent } from 'hast';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';

const getBooleanValue = (param: Record<string, string>, field: string, defaultValue: boolean) => {
  if (Reflect.has(param, field)) {
    const newValue = Reflect.get(param, field);
    if (newValue === 'true') {
      return true;
    }
    if (newValue === 'false') {
      return false;
    }
  }
  return defaultValue;
};

export const Preview = () => {
  return (
    <MarkdownPreview
      className="App-markdown"
      source={MDStr.source}
      rehypeRewrite={(node: Root | RootContent, index: number, parent: Root | Element) => {
        if (node.type === 'element' && node.tagName === 'pre' && node.children[0].data?.meta) {
          const meta = node.children[0].data?.meta as string;
          if (isMeta(meta)) {
            node.tagName = 'div';
            if (!node.properties) {
              node.properties = {};
            }
            node.properties!['data-md'] = meta;
            node.properties!['data-meta'] = 'preview';
          }
        }
      }}
      components={{
        div: ({ node, ...props }) => {
          const { 'data-meta': meta, 'data-md': metaData } = props as any;
          if (meta === 'preview') {
            const line = node.position?.start.line;
            const metaId = getMetaId(meta) || String(line);
            const Child = MDStr.components[metaId];
            if (metaId && typeof Child === 'function') {
              const code = MDStr.data[metaId].value || '';
              const param = getURLParameters(metaData);
              return (
                <CodeLayout
                  disableCheckered={getBooleanValue(param, 'disableCheckered', true)}
                  disableToolbar={getBooleanValue(param, 'disableToolbar', false)}
                  disableCode={getBooleanValue(param, 'disableCode', false)}
                  disablePreview={getBooleanValue(param, 'disablePreview', false)}
                  bordered={getBooleanValue(param, 'bordered', true)}
                  copied={getBooleanValue(param, 'copied', true)}
                  background={param.background}
                  toolbar={param.title || '示例'}
                  codeProps={{ style: { padding: 0 } }}
                  style={{ padding: 0 }}
                  code={<pre {...(props as React.HTMLAttributes<HTMLPreElement>)} />}
                  text={code}
                >
                  <Child />
                </CodeLayout>
              );
            }
          }
          return <div {...props} />;
        },
      }}
    />
  );
};
