/*
 * @Date: 2018-11-09 17:21:29
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:11:22
 */

import RightWrapper from './rightWrapper';
import PageWrapper from './pageWrapper';
import LeftWrapper from './leftWrapper';
// 无边距的content
// 适用于占用面积大的核心业务
// 包括不限于：审核类相关业务
import Content from './content';
// 窄边距的content
// 适用于占用面积少的小业务
// 包括不限于：表单类图表类查询、签到签出、个人中心等
import NarrowContent from './narrowContent';
import Header from './header';

const Wrapper = {
  RightWrapper,
  PageWrapper,
  LeftWrapper,
  Content,
  NarrowContent,
  Header
};

export default Wrapper;
