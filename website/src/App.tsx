import Github from '@uiw/react-shields/esm/github';
import Npm from '@uiw/react-shields/esm/npm';
import styled from 'styled-components';

const Footer = styled.footer`
  text-align: center;
  padding-top: 30px;
`;

const App = () => {
  return (
    <Footer>
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
    </Footer>
  );
};

export default App;
