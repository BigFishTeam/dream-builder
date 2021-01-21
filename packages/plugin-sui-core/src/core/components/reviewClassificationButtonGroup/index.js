import React from 'react';
import { Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';

export default class ReviewClassificationButtonGroup extends React.Component {
  state = {
    remarkBarOpen: false,
    state: 'normal',
    harmfulType: '',
    showColor: '',
    selected: '',
    selectedHarmfulType: this.props.harmfulType[0].title,
    remark: ''
  };

  normalChange = info => {
    this.setState(
      {
        remarkBarOpen: false,
        state: 'normal',
        selected: this.props.normal.title,
        selectedHarmfulType: this.props.harmfulType[0].title
      },
      () => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
          this.props.onChange(info);
        }
        this.handleHarmfulTypeChange(this.props.harmfulType[0]);
      }
    );
  };

  harmfulChange = info => {
    const changedHarmfulType =
      this.state.selectedHarmfulType !== this.props.harmfulType[0].title
        ? this.state.selectedHarmfulType
        : this.props.harmfulType[1].title;
    const index =
      this.state.selectedHarmfulType !== this.props.harmfulType[0].title
        ? null
        : 1;
    this.setState(
      {
        remarkBarOpen: true,
        state: 'harmful',
        selected: info.title,
        selectedHarmfulType: changedHarmfulType
      },
      () => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
          this.props.onChange(info);
        }
        if (index === 1) {
          this.handleHarmfulTypeChange(this.props.harmfulType[1]);
        }
      }
    );
  };

  handleHarmfulTypeChange = info => {
    if (
      this.props.onHarmfulTypeChange &&
      typeof this.props.onHarmfulTypeChange === 'function'
    ) {
      this.props.onHarmfulTypeChange(info);
    }
  };

  harmfulTypeChange = info => {
    if (info.title !== this.props.harmfulType[0].title) {
      if (this.state.state !== 'harmful') {
        this.setState({
          remarkBarOpen: true,
          state: 'harmful',
          selected: this.props.harmful[0].title
        });
      }
    } else {
      this.setState({
        remarkBarOpen: false,
        state: 'normal',
        selected: this.props.normal.title
      });
    }
    this.setState(
      {
        selectedHarmfulType: info.title
      },
      () => {
        this.handleHarmfulTypeChange(info);
      }
    );
  };

  getRemark = () => this.state.remark;

  clearRemark = cb => {
    this.setState(
      {
        remark: ''
      },
      () => {
        if (cb && typeof cb === 'function') {
          cb();
        }
      }
    );
  };

  handleInput = e => {
    this.setState(
      {
        remark: e.target.value
      },
      () => {
        if (
          this.props.onRemarkChange &&
          typeof this.props.onRemarkChange === 'function'
        ) {
          this.props.onRemarkChange(this.state.remark);
        }
      }
    );
  };

  render() {
    return (
      <Row>
        <Row>
          <Col span={24}>
            {this.props.withNormalButton ? (
              <Button
                onClick={this.normalChange.bind(this, this.props.normal)}
                style={{
                  marginRight: '20px'
                }}
                type={this.state.state === 'normal' ? 'primary' : null}
              >
                {this.props.normal && this.props.normal.title
                  ? this.props.normal.title
                  : '正常'}
              </Button>
            ) : null}
            {this.props.harmful.map((ele, index) => (
              <Button
                key={`review_harmful_${index}}`}
                onClick={this.harmfulChange.bind(this, ele)}
                style={{
                  background:
                    this.state.selected === ele.title ? ele.color : null,
                  color: this.state.selected === ele.title ? 'white' : 'black'
                }}
              >
                {ele.title}
              </Button>
            ))}
          </Col>
        </Row>
        {this.props.withRemarkBar && this.state.remarkBarOpen ? (
          <Row
            style={{
              marginTop: '10px'
            }}
          >
            <Col span={5}>
              <span>备注：</span>
              <Input
                placeholder={'请填写备注，最少20字'}
                value={this.state.remark}
                onChange={e => {
                  this.handleInput(e);
                }}
              />
            </Col>
          </Row>
        ) : null}
        {this.props.withHarmfulTypeBar ? (
          <Row style={{ marginTop: '10px' }}>
            {this.props.harmfulType.map((type, index) => (
              <Button
                key={`review_harmfultype_button_${index}}`}
                onClick={() => {
                  this.harmfulTypeChange(type);
                }}
                type={
                  this.state.selectedHarmfulType === type.title
                    ? 'primary'
                    : null
                }
              >
                {type.title}
              </Button>
            ))}
          </Row>
        ) : null}
      </Row>
    );
  }
}

ReviewClassificationButtonGroup.propTypes = {
  normal: PropTypes.string,
  harmful: PropTypes.array,
  harmfulType: PropTypes.array,
  withRemarkBar: PropTypes.bool,
  withHarmfulTypeBar: PropTypes.bool,
  withNormalButton: PropTypes.bool,
  onChange: PropTypes.func,
  onRemarkChange: PropTypes.func,
  onHarmfulTypeChange: PropTypes.func
};

ReviewClassificationButtonGroup.defaultProps = {
  harmful: [
    {
      title: '色情',
      info: {},
      color: 'red'
    },
    {
      title: '政治',
      info: {},
      color: 'green'
    }
  ],
  harmfulType: [
    {
      title: '无害'
    },
    {
      title: '视频有害'
    },
    {
      title: '文字有害'
    },
    {
      title: '都有害'
    }
  ],
  withRemarkBar: false,
  withHarmfulTypeBar: false,
  withNormalButton: false,
  onHarmfulTypeChange: info => {
    console.log(info);
  }
};
