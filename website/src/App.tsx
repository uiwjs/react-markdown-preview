import Github from '@uiw/react-shields/github';
import Npm from '@uiw/react-shields/npm';
import { useState } from 'react';
import styled from 'styled-components';
import MarkdownPreview from '@uiw/react-markdown-preview';

const EditorWrapper = styled.div`
  padding-bottom: 10px;
  margin: 0 auto;
  width: 100%;
  textarea {
    width: 100%;
    min-height: 120px;
    min-width: 100%;
    padding: 5px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .editor-preview {
    border: 1px solid var(--color-border-default);
    border-radius: 5px;
    margin-top: 10px;
    min-height: 60px;
    padding: 16px;
  }
`;

const code = `
![Open-Source Software][1]
![Fallback][2]

[1]: https://jaywcjlove.github.io/sb/ico/min-oss.svg "Open Source Software"
[2]: data:image/jpeg;base64,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
`;

let val = 1;

export const Example = () => {
  const [value, setValue] = useState(code);
  return (
    <EditorWrapper>
      <button onClick={() => setValue('# Markdown ' + val++)}>set value</button>
      <textarea
        placeholder="Please enter the Markdown code!"
        value={value}
        spellCheck="false"
        onChange={(e) => setValue(e.target.value)}
      />
      <MarkdownPreview
        urlTransform={(url) => {
          return url;
        }}
        className="editor-preview"
        source={value}
      />
    </EditorWrapper>
  );
};

const FooterWrapper = styled.footer`
  text-align: center;
  padding-top: 30px;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <Github user="uiwjs" repo="react-markdown-preview">
        <Github.Social type="forks" href="https://github.com/uiwjs/react-markdown-preview" />
        <Github.Social type="stars" href="https://github.com/uiwjs/react-markdown-preview/stargazers" />
        <Github.Social type="watchers" href="https://github.com/uiwjs/react-markdown-preview/watchers" />
      </Github>
      <Npm.Version
        scope="@uiw"
        packageName="react-markdown-preview"
        href="https://www.npmjs.com/package/@uiw/react-markdown-preview"
      />
    </FooterWrapper>
  );
};
