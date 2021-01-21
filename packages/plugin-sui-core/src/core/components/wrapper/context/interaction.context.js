/**
 * Created by zenli on 2018/10/11.
 * 剥离单独的context对象
 * 管理pageWrapper的交互动画状态
 */
import React from 'react';

const CollapsedContext = React.createContext({
  collapsed: false,
  toggleCollapsed: () => {}
});

const ScrollContext = React.createContext({
  allowScroll: true
});

const InterationContext = {
  CollapsedContext,
  ScrollContext
};

export default InterationContext;
