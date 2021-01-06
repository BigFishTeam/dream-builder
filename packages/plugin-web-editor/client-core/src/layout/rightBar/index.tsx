import React from 'react';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import MaterialConfiger from '../../components/materialConfiger';

const RightBar: React.FC<{}> = function() {
  return (
    <div className={BEM('rightBar', 'wrapper')}>
      <div>
        <MaterialConfiger />
      </div>
    </div>
  );
};

export default RightBar;
