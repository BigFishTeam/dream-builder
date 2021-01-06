import React, { useEffect } from 'react';
// @ts-ignore
import Parallax from 'parallax-js';
import { useHistory } from 'react-router-dom';
import { BEM } from '../../common/utils/bem';
import './index.scss';
import { Button } from 'antd';

export default () => {
  useEffect(() => {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
    const scene2 = document.getElementById('scene2');
    const parallaxInstance2 = new Parallax(scene2);
  }, []);

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
          <h1 style={{ marginBottom: '20px' }}>Dream Builder</h1>
          <h2 style={{ marginBottom: '20px' }}>中后台可视化搭建系统</h2>
          <p style={{ marginBottom: '20px', fontSize: '24px' }}>插件化集成、不绑定任何组件库与框架、强大的页面编排能力</p>
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
