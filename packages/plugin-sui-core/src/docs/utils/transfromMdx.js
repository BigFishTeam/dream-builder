import React, { Component } from 'react';

// mdx 转 jsx
const getJsxComponent = mdxFileName => {
  const Jsx = React.lazy(() =>
    import(`!babel-loader!mdx-loader!../${mdxFileName}.mdx`)
  );
  return class jsxComponent extends Component {
    render() {
      return (
        <div className="doc">
          <React.Suspense fallback={() => {}}>
            <Jsx />
          </React.Suspense>
        </div>
      );
    }
  };
};

export default getJsxComponent;
