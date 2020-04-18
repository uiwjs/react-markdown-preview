/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
