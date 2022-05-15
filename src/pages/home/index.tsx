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
          <br></br>
          <h2>中后台可视化搭建系统</h2>
          <br></br>
          <p>基于React组件与模版快速搭建页面</p>
          <br></br>
          <Button
            type="primary"
            size="large"
            style={{
              marginRight: 20,
            }}
            onClick={() => {
              history.push('/project');
            }}>
            快速开始
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              window.open('https://github.com/BigFishTeam/dream-builder/blob/main/src/docs/start.md');
            }}>
            查看文档
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
