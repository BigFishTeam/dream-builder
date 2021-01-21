/*
 * @Date: 2020-07-30 16:56:55
 * @Description: file content
 */

// 浏览器类型及版本
function getBrowserInfo() {
  const browserInformation = navigator.userAgent;
  // Edge浏览器
  if (browserInformation.match(/Edge/i)) {
    if (browserInformation.match(/Edge/i)[0] === 'Edge') {
      return `Edge/${browserInformation.split('Edge')[1]}`;
    }
  }
  // 百度浏览器
  else if (browserInformation.match(/BIDUBrowser/i)) {
    if (browserInformation.match(/BIDUBrowser/i) === 'BIDUBrowser') {
      return `BIDUBrowser/${browserInformation.split('BIDUBrowser')[1]}`;
    }
  }
  // UC浏览器
  else if (browserInformation.match(/UBrowser/i)) {
    if (browserInformation.match(/UBrowser/i) === 'UBrowser') {
      return `UBrowser/${browserInformation.split('UBrowser')[1]}`;
    }
  }
  // QQ浏览器
  else if (browserInformation.match(/QQBrowser/i)) {
    if (browserInformation.match(/QQBrowser/i) === 'QQBrowser') {
      return `QQBrowser/${browserInformation.split('QQBrowser')[1]}`;
    }
  }
  // 搜狗浏览器
  else if (browserInformation.match(/MetaSr/i)) {
    if (browserInformation.match(/MetaSr/i) === 'MetaSr') {
      return `MetaSr/${browserInformation.split('MetaSr')[1]}`;
    }
  }
  // 遨游浏览器
  else if (browserInformation.match(/Maxthon/i)) {
    if (browserInformation.match(/Maxthon/i) === 'Maxthon') {
      return `Maxthon/${browserInformation.split('Maxthon')[1]}`;
    }
  }
  // Opera
  else if (browserInformation.match(/OPR/i)) {
    if (browserInformation.match(/OPR/i) === 'OPR') {
      return `Opera/${browserInformation.split('OPR')[1]}`;
    }
  }
  // Firefox
  else if (browserInformation.match(/Firefox/i)) {
    if (browserInformation.match(/Firefox/i) === 'Firefox') {
      return `Firefox/${browserInformation.split('Firefox')[1]}`;
    }
  }
  // Chrome
  else if (browserInformation.match(/Chrome/i)) {
    if (browserInformation.match(/Chrome/i) === 'Chrome') {
      return `Chrome/${
        browserInformation.split('Chrome')[1].split('Safari')[0]
      }`;
    }
  }
  // Safari
  else if (browserInformation.match(/Safari/i)) {
    if (browserInformation.match(/Safari/i) === 'Safari') {
      return `Safari/${browserInformation.split('Version')[1]}`;
    }
  }
  // IE
  else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    // 判断除IE11浏览器
    if (
      browserInformation.toLowerCase().indexOf('compatible') > -1 &&
      browserInformation.toLowerCase().indexOf('msie' > -1)
    ) {
      const reIE = new RegExp('msie (\\d+\\.\\d+);');
      reIE.test(browserInformation.toLowerCase());
      const fIEVersion = parseFloat(RegExp.$1);
      if (fIEVersion) {
        return `IE/${fIEVersion}`;
      }
    }
    if (
      browserInformation.toLowerCase().indexOf('trident') > -1 &&
      browserInformation.toLowerCase().indexOf('rv:11.0') > -1
    ) {
      return 'IE/11';
    }
  } else {
    return '未定义浏览器/';
  }
}
const browser = getBrowserInfo(); // 取到完整信息
const browserName = browser.split('/')[0]; // 取得浏览器名
const browserVersion = parseInt(`${browser}`.replace(/[^0-9.]/gi, '')); // 根据正则将所有非数字全部去掉，剩下版本
if (browserName !== 'Chrome' || Number(browserVersion) < 60) {
  alert('本项目仅支持Chrome浏览器60版本以上使用');
}
