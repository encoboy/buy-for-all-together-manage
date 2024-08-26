import { KeepAlive } from '@umijs/max';
import React from 'react';

function WrapperKeepAlive(Component: any) {
  return class Wrap extends React.Component {
    //---------
    // 强化操作
    //---------
    render() {
      return (
        <KeepAlive
          id={Component.name}
          name={Component.name}
          when={() => {
            return true;
          }}
        >
          <Component />
        </KeepAlive>
      );
    }
  };
}

export default WrapperKeepAlive;
