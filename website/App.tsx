import React from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Github from '@uiw/react-shields/lib/esm/github';
import Npm from '@uiw/react-shields/lib/esm/npm';
import logo from './logo.svg';
import './App.css';
import MarkdownPreview from '../';
import MDStr from '../README.md';

const App: React.FC = () => {
  return (
    <div className="App">
      <GitHubCorners target="__blank" href="https://github.com/uiwjs/react-markdown-preview" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://github.com/uiwjs/react-markdown-preview" target="_blank" rel="noopener noreferrer">
          React Markdown Preview
        </a>
        <p>
          React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style.
        </p>
      </header>
      <MarkdownPreview className="App-markdown" source={MDStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      <div className="App-footer">
        <Github user="uiwjs" repo="react-markdown-preview">
          <Github.Social type="forks" href="https://github.com/uiwjs/react-markdown-preview" />
          <Github.Social type="stars" href="https://github.com/uiwjs/react-markdown-preview/stargazers" />
          <Github.Social type="watchers" href="https://github.com/uiwjs/react-markdown-preview/watchers" />
        </Github>
        <Npm.Version scope="@uiw" packageName="react-shields" />
      </div>
    </div>
  );
}

export default App;
