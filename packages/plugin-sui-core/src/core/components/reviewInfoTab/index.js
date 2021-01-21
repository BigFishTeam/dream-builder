import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Tag, Row, Col } from 'antd';
import './style/reviewInfoTab.less';

const { CheckableTag } = Tag;

/**
 * 普通信息展示tags
 * @param props
 * @returns {*}
 * @constructor
 */
const InfoTag = props => (
  <div className={'infotag'} style={{ display: 'inline-block' }}>
    <span>{props.keyword}:</span>
    <span>{props.value}</span>
  </div>
);

/**
 * 可编辑（点选）Tags
 * @param props
 * @returns {*}
 * @constructor
 */
const InfoTagWithEditableTags = props => {
  const [selectedTags, setST] = useState([]);

  const tagClickHandler = tagName => {
    if (selectedTags.indexOf(tagName) === -1) {
      const tempST = selectedTags;
      tempST.push(tagName);
      setST([...tempST]);
    } else {
      const tempST = selectedTags;
      const index = selectedTags.indexOf(tagName);
      tempST.splice(index, 1);
      setST([...tempST]);
    }
  };

  const handleClick = e => {
    if (props.onClick && typeof props.onClick === 'function') {
      props.onClick(e, selectedTags, props.tags);
    }
  };

  return (
    <div className={'infotag-editable'} style={{ display: 'inline-block' }}>
      <span>{props.keyword}:</span>
      <div style={{ display: 'inline-block' }}>
        {props.tags.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={() => {
              tagClickHandler(tag);
            }}
          >
            {tag}
          </CheckableTag>
        ))}
        <span alt="123">
          <Icon
            type="edit"
            style={{
              cursor: 'pointer'
            }}
            onClick={e => handleClick(e)}
          />
        </span>
      </div>
    </div>
  );
};

export default class ReviewInfoTab extends React.Component {
  render() {
    const infosArray = [];
    this.props.infos.map((info, index) => {
      const aimIndex = Math.floor(index / 3);
      if (!infosArray[aimIndex]) {
        infosArray[aimIndex] = [];
      }

      // 占位使用
      if (info.type === 'block') {
        return infosArray[aimIndex].push(<Col span={8} />);
      }
      // 是否为可编辑模块
      infosArray[aimIndex].push(
        info.type === 'edit' ? (
          <Col span={8}>
            <InfoTagWithEditableTags
              tags={info.tags}
              keyword={info.keyword}
              onClick={info.onClick ? info.onClick : () => {}}
            />
          </Col>
        ) : (
          <Col span={8}>
            <InfoTag keyword={info.keyword} value={info.value} />
          </Col>
        )
      );
      return infosArray[aimIndex];
    });

    return (
      <Card
        title={this.props.title}
        headStyle={{
          color: '#32a982',
          background: 'white'
        }}
      >
        {infosArray.map((infos, index) => (
          <Row key={`review_${index}`}>{infos.map(info => info)}</Row>
        ))}
        <Row>
          <Col span={24}>{this.props.children}</Col>
        </Row>
      </Card>
    );
  }
}

ReviewInfoTab.propTypes = {
  title: PropTypes.string,
  infos: PropTypes.array,
  content: PropTypes.elementType || PropTypes.string,
  onClick: PropTypes.func
};

ReviewInfoTab.defaultProps = {
  title: '',
  infos: [],
  content: null
};
