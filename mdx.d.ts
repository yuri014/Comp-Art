declare module '*.mdx' {
  const MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}

/// <reference types="@mdx-js/loader" />
