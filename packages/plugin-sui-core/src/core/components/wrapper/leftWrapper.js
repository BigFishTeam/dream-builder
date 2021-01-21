/**
 * Created by zenli on 2018/10/10.
 * 左边栏
 */
import React, { Component } from 'react';
import classNames from 'classnames';

import './style/leftWrapper.less';

import InterationContext from './context/interaction.context';
const { CollapsedContext } = InterationContext;
const { ScrollContext } = InterationContext;
class LeftWrapper extends Component {
  state = {};

  render() {
    const { children } = this.props;
    return (
      <CollapsedContext.Consumer>
        {({ collapsed = false }) => (
          <ScrollContext.Consumer>
            {({ allowScroll = true }) => (
              <div
                className={classNames('sui-left-wrapper', {
                  'sui-left-wrapper-collapsed': collapsed,
                  'sui-left-wrapper-collapsedScroll': collapsed && !allowScroll
                })}
                style={allowScroll ? { height: 'calc(100% - 10px)' } : null}
              >
                {React.Children.map(children, child =>
                  React.cloneElement(child, {
                    collapsed
                  })
                )}
              </div>
            )}
          </ScrollContext.Consumer>
        )}
      </CollapsedContext.Consumer>
    );
  }
}

LeftWrapper.propTypes = {};

LeftWrapper.defaultProps = {};

export default LeftWrapper;
