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

let val = 1;

export const Example = () => {
  const [value, setValue] = useState('');
  return (
    <EditorWrapper>
      <button onClick={() => setValue('# Markdown ' + val++)}>set value</button>
      <textarea
        placeholder="Please enter the Markdown code!"
        value={value}
        spellCheck="false"
        onChange={(e) => setValue(e.target.value)}
      />
      <MarkdownPreview className="editor-preview" source={value} />
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
