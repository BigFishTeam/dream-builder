import React from 'react';

type AnyComponent<P = any> =
  | (new (props: P) => React.Component)
  | ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);

export const StyleHOC = (Component: AnyComponent): AnyComponent => {
  class HOC extends React.Component {
    render() {
      return <Component />;
    }
  }
  return HOC;
};
