/*
 * @Date: 2019-02-28 15:18:17
 * @Last Modified time: 2019-02-28 19:49:08
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  WATERMARK_DEFAULT_OPTIONS,
  getMergedWatermarkOptions,
  getWatermarkedImage
} from './generateWatermark';

const propTypes = {
  /** 水印参数 */
  watermarkOptions: PropTypes.shape({
    text: PropTypes.string,
    textAlign: PropTypes.oneOf(['start', 'end', 'left', 'right', 'center']),
    textBaseline: PropTypes.oneOf([
      'top',
      'hanging',
      'middle',
      'alphabetic',
      'ideographic',
      'bottom'
    ]),
    font: PropTypes.string,
    fillStyle: PropTypes.string,
    padding: PropTypes.number,
    rotation: PropTypes.number
  }).isRequired
};
class WatermarkImg extends Component {
  dataUrl = '';

  componentDidMount() {
    if (this.props.src) {
      getWatermarkedImage(
        this.props.src,
        getMergedWatermarkOptions(this.props.watermarkOptions),
        (error, dataUrl) => {
          if (!error) {
            this.dataUrl = dataUrl;
            this.forceUpdate();
          }
        }
      );
    }
  }

  shouldComponentUpdate(nextProps) {
    /**
     * 水印图获取用到了img标签的onload，是异步行为
     * 所以在shouldComponentUpdate进行渲染拦截
     * 并通过forceUpdate触发强制渲染
     *
     * TODO:频繁触发计算会有性能问题，还会有回调时序问题，这里需要改进
     */
    if (nextProps.src) {
      getWatermarkedImage(
        nextProps.src,
        getMergedWatermarkOptions(nextProps.watermarkOptions),
        (error, dataUrl) => {
          if (!error) {
            this.dataUrl = dataUrl;
            this.forceUpdate();
          } else {
            console.error(error);
          }
        }
      );
    }
    return false;
  }

  render() {
    // 删除原生img不支持的属性
    const newProps = { ...this.props };
    delete newProps.watermarkOptions;
    return this.dataUrl ? (
      <img {...newProps} src={this.dataUrl} alt={this.props.alt} />
    ) : null;
  }
}

WatermarkImg.propTypes = propTypes;
WatermarkImg.defaultProps = { watermarkOptions: WATERMARK_DEFAULT_OPTIONS };
export default WatermarkImg;
