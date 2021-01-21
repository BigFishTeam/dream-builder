/*
 * @Date: 2019-04-22 14:26:15
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:13:43
 */

import React, { Component } from 'react';

class IconBuild extends Component {
  render() {
    return (
      <form
        action="http://sui.webdev.com/api/utils/icon"
        encType="multipart/form-data"
        method="post"
      >
        <input type="file" name="file" />
        <button type="submit">上传</button>
      </form>
    );
  }
}

export default IconBuild;
