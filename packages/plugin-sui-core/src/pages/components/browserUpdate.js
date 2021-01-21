import React, { Component } from 'react';
import BrowserUpdateMd from '../../docs/components/browserUpdate.md';

class BrowserUpdate extends Component {
  render() {
    console.log('BrowserUpdateMd:', typeof BrowserUpdateMd);
    return <div dangerouslySetInnerHTML={{ __html: BrowserUpdateMd }} />;
  }
}

export default BrowserUpdate;
