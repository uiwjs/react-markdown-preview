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
              const disablePreview = getBooleanValue(param, 'disablePreview', false);
              return (
                <CodeLayout bordered={getBooleanValue(param, 'bordered', true)} style={{ marginBottom: '16px' }}>
                  {!disablePreview && (
                    <CodeLayout.Preview style={{ background: param.background }}>
                      <Child />
                    </CodeLayout.Preview>
                  )}
                  <CodeLayout.Toolbar copied={getBooleanValue(param, 'copied', true)} text={code}>
                    {param.title || 'Example'}
                  </CodeLayout.Toolbar>
                  <CodeLayout.Code style={{ padding: 0 }}>
                    <pre {...(props as React.HTMLAttributes<HTMLPreElement>)} />
                  </CodeLayout.Code>
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
