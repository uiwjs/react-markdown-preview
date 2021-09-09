import React, { useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Github from '@uiw/react-shields/esm/github';
import Npm from '@uiw/react-shields/esm/npm';
import logo from './logo.svg';
import './App.css';
import MarkdownPreview, { MarkdownPreviewRef } from '../';
import MDStr from '../README.md';

let val = 1;

const App = () => {
  const [value, setValue] = useState('');
  const ref = React.createRef<MarkdownPreviewRef>();
  return (
    <div className="App">
      <GitHubCorners zIndex={9999} fixed target="__blank" href="https://github.com/uiwjs/react-markdown-preview" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://github.com/uiwjs/react-markdown-preview" target="_blank" rel="noopener noreferrer">
          React Markdown Preview
        </a>
        <p>
          React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style.
        </p>
      </header>
      <div className="App-editor">
        <button onClick={() => setValue('# Markdown ' + val++)}>set value</button>
        
        <textarea
          placeholder="Please enter the Markdown code!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MarkdownPreview ref={ref} className="App-editor-preview" source={value} />
      </div>
      <MarkdownPreview className="App-markdown" source={MDStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      <div className="App-footer">
        <Github user="uiwjs" repo="react-markdown-preview">
          <Github.Social type="forks" href="https://github.com/uiwjs/react-markdown-preview" />
          <Github.Social type="stars" href="https://github.com/uiwjs/react-markdown-preview/stargazers" />
          <Github.Social type="watchers" href="https://github.com/uiwjs/react-markdown-preview/watchers" />
        </Github>
        <Npm.Version scope="@uiw" packageName="react-markdown-preview" href="https://www.npmjs.com/package/@uiw/react-markdown-preview" />
      </div>
    </div>
  );
}

export default App;