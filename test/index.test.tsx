import React, { useEffect, useRef } from 'react';
import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import MarkdownPreview, { MarkdownPreviewRef } from '../src';

it('Should output a TestRenderer', async () => {
  const component = TestRenderer.create(<MarkdownPreview source="## Hello World!" />);
  let tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.disabled).toBeFalsy();
    expect(tree.props.onScroll).toBeUndefined();
    expect(tree.props.style).toBeUndefined();
    expect(tree.props.onMouseOver).toBeUndefined();
    expect(tree.props.className).toEqual('wmde-markdown wmde-markdown-color ');
  }
});

it('Test case prefixCls props', async () => {
  const component = TestRenderer.create(<MarkdownPreview prefixCls="" source="" />);
  let tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.disabled).toBeFalsy();
    expect(tree.props.onScroll).toBeUndefined();
    expect(tree.props.style).toBeUndefined();
    expect(tree.props.onMouseOver).toBeUndefined();
    expect(tree.props.className).toEqual(' ');
  }
});

it('MarkdownPreview anchor', async () => {
  const source = `### MarkdownPreview`;
  render(<MarkdownPreview source={source} />);
  const octicon = document.querySelector('.octicon-link');
  expect(Object.keys(octicon as any).length).toEqual(2);
  Object.keys(octicon as any).forEach((elm) => {
    const fiberNode = (octicon as any)[elm];
    expect(typeof fiberNode).toEqual('object');
    if (fiberNode['className']) {
      expect(fiberNode.className).toEqual('octicon octicon-link');
      expect(fiberNode.width).toEqual('16');
      expect(fiberNode.height).toEqual('16');
      expect(fiberNode['aria-hidden']).toEqual('true');
    }
  });
});

it('MarkdownPreview Ref', async () => {
  const source = `### MarkdownPreview`;
  function Demo() {
    const ref = useRef<MarkdownPreviewRef>(null);
    useEffect(() => {
      if (ref.current) {
        expect(Object.keys(ref.current)).toEqual([ 'source', 'mdp' ]);
      }
    });
    return (
      <MarkdownPreview ref={ref} source={source} />
    );
  }
  render(<Demo />);
});