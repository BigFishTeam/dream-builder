/*
 * @Author: zenli
 * @Date: 2018-12-24 20:28:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-10-14 14:24:37
 * 说明：点播播放器的react封装（对错误码进行了统一处理），只负责创建播放器，对外抛出创建完毕的player对象
 *      合并处理两种错误情况：资源加载失败、播放器error事件
 * api文档：http://tvp.oa.com/txp/v3/src/jsapi/apis.html
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

import playerErrorCode from './videoErrorCode';
import './style/videoPlayer.less';

const propTypes = {
  /** 播放器的配置参数 api文档：http://tvp.oa.com/txp/v3/src/jsapi/apis.html */
  config: PropTypes.object.isRequired,
  /** 播放器JS资源cdn地址,有内网oa版和外网版本，默认内网txp_oa版本 */
  url: PropTypes.string,
  /** 对象初始化后的回调，返回创建的点播播放器对象player，此时不是ready阶段; 参数：(player)=>{} */
  onInit: PropTypes.func,
  /** 组件出错的回调，返回两种结果：加载失败loadError/播放错误playError 参数：(errorType, errorMessage)=>{} */
  onError: PropTypes.func,
  /** 是否直接将错误信息展示到挂载播放器的dom节点下 */
  showErrorMessage: PropTypes.bool
};
const defaultProps = {
  url: 'http://vm.gtimg.cn/tencentvideo/txp_oa/js/txplayer.js', // 审核使用版本
  showErrorMessage: true
};
class VideoPlayer extends Component {
  state = {};
  player = null;
  createPlayer = () => {
    const {
      config,
      onError,
      onInit,
      showErrorMessage,
      plugins = []
    } = this.props;

    const extendPluginsList = plugins.map(item => item.name);

    if (window.Txplayer) {
      this.player = new window.Txplayer(
        Object.assign({
          extendPluginsMap: {
            vod: {
              html5hd: extendPluginsList,
              chromehls: extendPluginsList,
              safarihls: extendPluginsList
            }
          }
        }),
        config
      );
      // 创建完毕，即对外抛出player，业务方自行处理player的ready事件
      if (onInit) {
        onInit(this.player);
      }
      this.player.on('error', err => {
        let msg = '';
        if (err.errCode) {
          msg = `vid：${config.vid}；${playerErrorCode.analyCode(err.errCode)}`;
        } else {
          msg = `vid：${config.vid}；err.code:${err.code},err.msg:${err.msg}；`;
        }
        if (err.flowId) {
          msg += `流水ID：${err.flowId}；`;
        }
        if (showErrorMessage) {
          const ele = document.createElement('div');
          ele.innerText = msg;
          ele.style =
            'text-align: left;top: 0px;color: red;padding: 5px;position:absolute;z-index: 1000;';
          document.getElementById(config.containerId).appendChild(ele);
        }
        onError('playError', msg);
      });
    } else {
      if (onError) onError('createError', '未找到播放器对象window.Txplayer！');
    }
  };
  onScriptCreate = () => {};
  onScriptError = () => {
    const { onError } = this.props;
    // 加载失败
    if (onError) onError('loadError', '播放器资源加载失败');
  };
  onScriptLoad = () => {
    this.createPlayer();
  };

  componentDidMount() {
    if (window.Txplayer) {
      this.createPlayer();
    }
  }
  componentWillUnmount() {
    this.player && this.player.destory && this.player.destory();
    this.player = null;
  }
  render() {
    const { url } = this.props;
    return !window.Txplayer ? (
      <Script
        url={url}
        onCreate={this.onScriptCreate}
        onError={this.onScriptError}
        onLoad={this.onScriptLoad}
      />
    ) : (
      ''
    );
  }
}

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
export default VideoPlayer;
