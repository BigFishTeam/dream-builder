import './index.scss';
import React from 'react';
import cn from 'classnames';
import { BEM } from '../../common/utils/bem';

const Header: React.FC<{}> = function() {
  return (
    <div className={cn([BEM('header', 'wrapper')])}>
      <div className={BEM('header', 'left')}>
        <a>项目(P)</a>
        <a>关于DBuilder(A)</a>
      </div>
      <div className={BEM('render', 'right')}></div>
    </div>
  );
};

export default Header;
