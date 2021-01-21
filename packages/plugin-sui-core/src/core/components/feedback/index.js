/**
 * @file index.js
 * @date 2019-05-23 15.59.58
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Form, Button, Radio, Input, Upload, Modal } from 'antd';
import './style/feedback.less';

const { TextArea } = Input;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackType: this.props.showFeedbackType
        ? this.props.defaultSelectedType
        : '',
      message: '',
      showForm: false,
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
    this.feedback = React.createRef();
  }

  // 反馈类型改变回调
  onChangeFbTypes = e => {
    console.log('type:', e.target.value);
    this.setState({
      feedbackType: e.target.value
    });
  };

  // 描述文本改变回调
  onChangeMessage = e => {
    console.log('value:', e.target.value);
    this.setState({
      message: e.target.value
    });
  };

  // toggle反馈表单显示
  toggleForm = () => {
    if (this.state.showForm) {
      this.closeForm();
    } else {
      this.activateForm();
    }
  };

  // 关闭表单
  closeForm = () => {
    this.setState(
      {
        showForm: false
      },
      () => {
        this.props.onClose();
      }
    );
    document.removeEventListener('click', this.handleClickOutside);
  };

  // 打开表单
  activateForm = () => {
    this.setState(
      ({ showForm }) => ({
        showForm: !showForm
      }),
      this.props.onOpen
    );
    document.addEventListener('click', this.handleClickOutside);
  };

  // 点击form外部事件
  handleClickOutside = event => {
    if (event.defaultPrevented) return;

    if (
      this.feedback &&
      this.feedback.current &&
      !this.feedback.current.contains(event.target)
    ) {
      this.closeForm();
    }
  };

  // 获取文件base64
  getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  // 关闭预览图片
  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
    document.addEventListener('click', this.handleClickOutside);
  };

  // 预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
    document.removeEventListener('click', this.handleClickOutside);
  };

  // 上传图片列表变化回调
  handleChangeFiles = info => {
    this.setState({ fileList: info.fileList });
    console.log('fileList:', info.fileList);
  };

  // 提交
  handleSubmit = () => {
    const imgUrls = this.state.fileList.length
      ? this.state.fileList.map(item => item.response.url)
      : [];
    const data = {
      feedbackType: this.state.feedbackType,
      message: this.state.message,
      imgUrls
    };
    // 添加自定义提交数据
    console.log('submit:', Object.assign({}, data, this.props.submitData));
    this.props.onSubmit(Object.assign({}, data, this.props.submitData));
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {
      title,
      icon,
      feedbackTypes,
      defaultSelectedType,
      showFeedbackType,
      maxMessageLen,
      maxImageNum
    } = this.props;

    // 上传截图按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传截图</div>
      </div>
    );

    // 反馈类型单选项
    const feedbackTypesRadios =
      feedbackTypes &&
      feedbackTypes.map(typeItem => (
        <Radio.Button key={typeItem.value} value={typeItem.value}>
          {typeItem.label}
        </Radio.Button>
      ));

    return (
      <div className="sui-fb-wrapper" ref={this.feedback}>
        {this.state.showForm ? (
          <div className="sui-fb-form">
            <div className="sui-fb-form-header">{title}</div>
            <div className="sui-fb-form-content">
              <Form onSubmit={this.handleSubmit}>
                {showFeedbackType ? (
                  <Form.Item label="反馈类型">
                    <Radio.Group
                      defaultValue={defaultSelectedType}
                      onChange={this.onChangeFbTypes}
                    >
                      {feedbackTypesRadios}
                    </Radio.Group>
                  </Form.Item>
                ) : null}
                <Form.Item label="描述">
                  <TextArea
                    rows={6}
                    placeholder="请输入你的反馈..."
                    onChange={this.onChangeMessage}
                    style={{ resize: 'none' }}
                    maxLength={maxMessageLen}
                  />
                </Form.Item>
                <Form.Item label="截图上传">
                  <Upload
                    action={this.props.imgUploadUrl}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChangeFiles}
                  >
                    {fileList.length >= maxImageNum ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancelPreview}
                  >
                    <img
                      alt="example"
                      style={{ width: '100%' }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : null}
        <div
          className="sui-fb-trigger"
          aria-hidden="true"
          onClick={this.toggleForm}
        >
          {icon()}
          <span className="sui-fb-trigger-text">{title}</span>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  title: PropTypes.string, // 标题
  icon: PropTypes.func, // 小图标
  showIcon: PropTypes.bool, // 是否显示小图标
  feedbackTypes: PropTypes.arrayOf(
    // 反馈类型
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  showFeedbackType: PropTypes.bool, // 是否显示反馈类型
  defaultSelectedType: PropTypes.string, // 默认选中反馈类型
  onClose: PropTypes.func, // 关闭反馈栏回调
  onOpen: PropTypes.func, // 打开反馈栏回调
  imgUploadUrl: PropTypes.string, // 截图上传接口url
  maxMessageLen: PropTypes.number, // message最大长度限制
  maxImageNum: PropTypes.number, // 最多上传图片数量
  onSubmit: PropTypes.func.isRequired, // 提交回调
  submitData: PropTypes.object.isRequired // 自定义提交数据，如：提交人rtx、时间戳、紧急度，平台名称等
};

Feedback.defaultProps = {
  title: '反馈',
  icon: () => <Icon type="mail" />,
  showIcon: true,
  feedbackTypes: [
    { value: 'bug', label: 'BUG' },
    { value: 'improvement', label: '改进' },
    { value: 'feature', label: '需求' }
  ],
  showFeedbackType: true,
  defaultSelectedType: 'bug',
  onClose: () => {},
  onOpen: () => {},
  imgUploadUrl: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  maxMessageLen: 200,
  maxImageNum: 3,
  onSubmit: () => {},
  submitData: {}
};

export default Feedback;
