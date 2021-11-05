import React from 'react';
import { useHistory } from 'react-router-dom';
import { BEM } from '../../common/utils/bem';
import './index.scss';
import { Button } from 'antd';

export default () => {
  const history = useHistory();

  return (
    <div className={BEM('home', 'wrapper')}>
      <div
        style={{
          marginLeft: '100px',
          paddingTop: '100px',
          fontSize: '40px',
        }}>
        <div id={'scene'}>
          <img className={BEM('home', 'img1')} data-depth="0.2" src={require('../../imgs/view.png')} />
          <img className={BEM('home', 'img2')} data-depth="0.8" src={require('../../imgs/star_filled.png')} />
        </div>
        <div
          style={{
            marginTop: '20px',
            marginBottom: '20px',
          }}>
          <h1>Dream Builder</h1>
          <h2>后台搭建系统</h2>
          <p>可视化后台搭建系统，have fun</p>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              history.push('/login');
            }}>
            尝试一下
          </Button>
        </div>
        <div id={'scene2'}>
          <img className={BEM('home', 'img2')} data-depth="0.4" src={require('../../imgs/box.png')} />
          <img className={BEM('home', 'img1')} data-depth="0.6" src={require('../../imgs/picture.png')} />
        </div>
      </div>
    </div>
  );
};
