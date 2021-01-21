/**
 * @file imgCropper.js
 * @date 2019-11-21 19.55.26
 */

import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Button, Icon } from 'antd';
import 'cropperjs/dist/cropper.css';
import './style/imgCropper.less';

class ImgCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      cropperArea: null
    };
  }

  cropImage = () => {
    const data = this.cropper.getData();
    const boxData = this.cropper.getCropBoxData();
    const cropperArea = {
      xmin: data.x,
      xmax: data.x + data.width,
      ymin: data.y,
      ymax: data.y + data.height,
      cropperX: boxData.left,
      cropperY: boxData.top,
      cropperWidth: boxData.width,
      cropperHeight: boxData.height
    };
    console.log('cropperArea:', cropperArea);
    this.setState({
      preview: this.cropper.getCroppedCanvas().toDataURL(),
      cropperArea
    });
  };

  setDragMode = mode => {
    this.cropper.setDragMode(mode);
  };

  zoom = value => {
    this.cropper.zoom(value);
  };

  move = (x, y) => {
    this.cropper.move(x, y);
  };

  crop = () => {
    this.cropper.crop();
  };

  clear = () => {
    this.cropper.clear();
  };

  render() {
    return (
      <div className="imgCropper-wrapper">
        <div className="imgCropper-left">
          <Cropper
            style={{ height: 500, width: '100%' }}
            // aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.props.src}
            crop={this.cropImage}
            // autoCrop={false}
            // autoCropArea={1}
            ref={cropper => {
              this.cropper = cropper;
            }}
          />
        </div>
        <div className="imgCropper-right">
          <div className="imgCropper-preview">
            <img width="100%" height="100%" src={this.state.preview} alt="" />
          </div>
          <div className="imgCropper-action">
            <Button.Group className="action-btn-group">
              <Button type="primary" onClick={() => this.setDragMode('move')}>
                <Icon type="drag" />
              </Button>
              <Button type="primary" onClick={() => this.setDragMode('crop')}>
                <Icon type="scan" />
              </Button>
            </Button.Group>
            <Button.Group className="action-btn-group">
              <Button type="primary" onClick={() => this.zoom(0.1)}>
                <Icon type="zoom-in" />
              </Button>
              <Button type="primary" onClick={() => this.zoom(-0.1)}>
                <Icon type="zoom-out" />
              </Button>
            </Button.Group>
            <Button.Group className="action-btn-group">
              <Button type="primary" onClick={() => this.move(0, -10)}>
                <Icon type="up" />
              </Button>
              <Button type="primary" onClick={() => this.move(0, 10)}>
                <Icon type="down" />
              </Button>
              <Button type="primary" onClick={() => this.move(-10, 0)}>
                <Icon type="left" />
              </Button>
              <Button type="primary" onClick={() => this.move(10, 0)}>
                <Icon type="right" />
              </Button>
            </Button.Group>
            <Button.Group className="action-btn-group">
              <Button type="primary" onClick={() => this.crop()}>
                <Icon type="check" />
              </Button>
              <Button type="primary" onClick={() => this.clear()}>
                <Icon type="close" />
              </Button>
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }
}
export default ImgCropper;
