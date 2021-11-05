import React from 'react';
import cn from 'classnames';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import Render from '../../render';
import PageView from '../../components/pageView';

const Content: React.FC<{}> = function() {
  return (
    <div className={cn([BEM('content', 'wrapper')])}>
      <div>
        <PageView />
      </div>
      <Render />
    </div>
  );
};

export default Content;
