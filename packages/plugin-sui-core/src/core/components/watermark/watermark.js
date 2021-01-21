/*
 * @Date: 2019-02-28 15:18:26
 * @Last Modified time: 2019-03-01 11:31:38
 */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  WATERMARK_DEFAULT_PROPS,
  getDataUrl,
  getCanvas,
  getStyle,
  resetStyle,
  propertyMutations
} from './generateWatermark';

const propTypes = {
  /** 水印文字 */
  text: PropTypes.string,
  /** 文字对齐方式 */
  textAlign: PropTypes.oneOf(['start', 'end', 'left', 'right', 'center']),
  /** 文字基线样式 */
  textBaseline: PropTypes.oneOf([
    'top',
    'hanging',
    'middle',
    'alphabetic',
    'ideographic',
    'bottom'
  ]),
  /** 字体种类大小等 */
  font: PropTypes.string,
  /** 文字填充样式 */
  fillStyle: PropTypes.string,
  /** 边距 */
  padding: PropTypes.number,
  /** 旋转角度 */
  rotation: PropTypes.number,
  /** z-index */
  zIndex: PropTypes.number,
  /** 人为操作DOM回调 */
  onOperated: PropTypes.func
};
// 使用PureComponent避免重复计算水印
class Watermark extends (PureComponent || Component) {
  el = React.createRef();
  observer = null;
  dataUrl = '';

  componentDidMount() {
    // 获取水印dom元素
    const currentNode = this.el.current;
    if (currentNode) {
      // 获取水印dom元素父级元素
      const parentNode = currentNode.parentElement;
      if (parentNode) {
        // 父级元素位置更改为relative
        if (!parentNode.style.position) parentNode.style.position = 'relative';
        // 设置水印dom监听器
        this.observer = new MutationObserver(mutationList => {
          mutationList.forEach(mutation => {
            // 获取与水印dom相关的mutation
            if (mutation.type === 'childList') {
              let el = null;
              // 元素被删除时需要重新加入
              mutation.removedNodes.forEach(node => {
                if (this.el.current === node) {
                  el = node;
                }
              });
              if (el !== null) {
                parentNode.appendChild(el); // TODO: 这里推断貌似有点问题
                this.props.onOperated &&
                  this.props.onOperated({
                    mutationRecord: mutation,
                    type: 'removed'
                  });
              }
            } else if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'style' &&
              this.el.current === mutation.target
            ) {
              // 获取样式变动
              // 详情参见propertyMutations方法说明
              const ms = propertyMutations(
                this.el.current,
                getStyle(this.dataUrl, this.props.zIndex)
              );
              if (ms.length) {
                this.props.onOperated &&
                  this.props.onOperated({
                    mutationRecord: mutation,
                    type: 'styleChanged'
                  });
              }
              // 如果是inline样式变了就重置样式
              resetStyle(
                this.el.current,
                getStyle(this.dataUrl, this.props.zIndex)
              );
            }
          });
        });
        this.observer.observe(parentNode, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    }
  }

  componentDidUpdate() {
    // 第一次触发是didMount中的setState
    // 每次更新的时候需要react设置过的样式覆盖设置为带important的样式
    const el = this.el.current;
    if (el) {
      resetStyle(el, getStyle(this.dataUrl, this.props.zIndex));
    }
  }

  componentWillUnmount() {
    // 消除side-effect
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  render() {
    const dataUrl = getDataUrl(getCanvas(this.props));
    this.dataUrl = dataUrl;
    return (
      <div ref={this.el} style={getStyle(this.dataUrl, this.props.zIndex)} />
    );
  }
}

Watermark.propTypes = propTypes;
Watermark.defaultProps = WATERMARK_DEFAULT_PROPS;
export default Watermark;
