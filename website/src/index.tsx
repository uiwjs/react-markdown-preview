import { createRoot } from 'react-dom/client';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-markdown-preview/README.md';
import { Footer, Example } from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title={
      <a href="https://github.com/uiwjs/react-markdown-preview" target="_blank" rel="noopener noreferrer">
        React Markdown Preview
      </a>
    }
    description="React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub
          Markdown style."
    version={`v${VERSION}`}
  >
    <MarkdownPreviewExample.Github href="https://github.com/uiwjs/react-markdown-preview" />
    <MarkdownPreviewExample.Example>
      <Example />
    </MarkdownPreviewExample.Example>
    <Footer />
  </MarkdownPreviewExample>,
);
