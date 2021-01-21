import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import './style/reviewImgGroup.less';

class ReviewImgGroup extends React.Component {
  state = {
    visible: false,
    bigImgUrl: ''
  };

  /**
   * hover时的handler
   * @param info
   */
  hoverHandler = info => {
    this.checkEvent(info, 'hover');
  };

  hoverHandlerEnd = info => {
    if (info === 'bigImg') {
      this.setState({
        visible: false
      });
    }
  };

  /**
   * 单击handler
   * @param info
   */
  clickHandler = info => {
    this.checkEvent(info, 'click');
  };

  /**
   * 双击handler
   * @param info
   */
  dbclickHandler = info => {
    this.checkEvent(info, 'dbclick');
  };

  /**
   * 内置方法，用来检查是否参数不全，并进行参数修补
   * @param info
   * @param eventName
   */
  checkEvent = (info, eventName) => {
    if (!info.events) {
      info.events = {};
    }
    if (!info.events[eventName]) {
      info[eventName] = () => {};
    }
    if (typeof info.events[eventName] === 'string') {
      this.callInnerFunction(info.events[eventName], info);
    }
    if (typeof info.events[eventName] === 'function') {
      info.events[eventName](info);
    }
  };

  /**
   * 内置方法，用于调用内置的功能方法
   * @param funcName
   * @param info
   */
  callInnerFunction = (funcName, info) => {
    switch (funcName) {
      case 'bigImg':
        this.showBigImage(info);
        break;
      case 'sidePage':
        this.openSidePage(info);
        break;
      default:
        return;
    }
  };

  /**
   * 内置方法，用来展示大图
   * @param info
   */
  showBigImage = info => {
    this.setState({
      bigImgUrl: info.burl || info.url,
      visible: true
    });
  };

  /**
   * 内置方法，用来开启副屏
   * @param info
   */
  openSidePage = info => {
    window.open(info.sidePageUrl);
  };

  render() {
    const wrapperWidth =
      this.props.imgWidth * this.props.col + this.props.col * 10;
    return (
      <div
        className={'reviewImgGroup-wrapper'}
        style={{
          width: `${wrapperWidth}px`
        }}
      >
        {this.props.imgs.map((imgData, index) => (
          <div key={`img_${index}`}>
            <img
              src={imgData.url}
              alt={imgData.alt}
              style={{
                width: this.props.imgWidth,
                height: this.props.imgHeight,
                margin: '5px'
              }}
              aria-hidden="true"
              onMouseEnter={this.hoverHandler.bind(this, imgData)}
              onMouseLeave={this.hoverHandlerEnd.bind(this, imgData)}
              onClick={this.clickHandler.bind(this, imgData)}
              onDoubleClick={this.dbclickHandler.bind(this, imgData)}
            />
            {imgData.footerInfo ? <span>{imgData.footerInfo}</span> : null}
          </div>
        ))}
        <Modal
          visible={this.state.visible}
          mask={true}
          maskClosable={true}
          footer={null}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          closable={true}
          width={'800px'}
          bodyStyle={{
            textAlign: 'center',
            width: '800px'
          }}
        >
          <img
            style={{
              width: '100%'
            }}
            alt={'大图'}
            src={this.state.bigImgUrl}
          />
        </Modal>
      </div>
    );
  }
}

ReviewImgGroup.propTypes = {
  col: PropTypes.number,
  imgs: PropTypes.array,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number
};

ReviewImgGroup.defaultProps = {
  imgs: [],
  imgWidth: 50,
  imgHeight: 50,
  col: 5
};

export default ReviewImgGroup;
