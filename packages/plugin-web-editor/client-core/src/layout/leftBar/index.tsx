import React from 'react';
import cn from 'classnames';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import MaterialTools from '../../components/materialTools';
import RenderTree from '../../components/renderTree';

const LeftBar: React.FC<{}> = function() {
  return (
    <div className={cn([BEM('leftBar', 'wrapper')])}>
      <MaterialTools />
      <RenderTree />
    </div>
  );
};

export default LeftBar;
