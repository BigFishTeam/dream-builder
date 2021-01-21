/**
 * Created by zenli on 2018/7/30.
 *
 * 点播播放器错误码详情文案JSON
 * 地址：http://tapd.oa.com/fly/markdown_wikis/#1010146281006571195
 * 播放器后台详细错误码地址：http://tapd.oa.com/qqvideo_prj/markdown_wikis/view/#1010114481007144561
 *
 */

const errorCode = {
  platform: {
    // 平台
    60: 'Flash播放器',
    61: 'PC H5播放器',
    62: 'MAC H5播放器'
  },
  module: {
    // 模块
    '001': '播放器模块',
    101: 'getvinfo/getinfo',
    102: 'getvkey/getkey',
    200: '播放器错误',
    215: '广告错误(215)' // 广告平台问题
  },
  moduleInfo: {
    // 模块说明
    10: {
      info: '播放器错误',
      duty: 'fontend'
    },
    11: {
      info: '系统播放错误',
      duty: 'cnd'
    },
    13: {
      info: '播放器错误',
      duty: 'afterend'
    },
    14: {
      info: '播放器错误',
      duty: 'afterend'
    }
  },
  errorCode: {
    // 错误码
    10001: '皮肤加载失败',
    10002: '核心库加载失败',
    // 播放器后台问题
    14001: 'CGI失败(404、500等)',
    14002: 'CGI跨域失败',
    14003: 'CGI超时错误',
    14004: 'CGI有返回但是无法解析',
    // 播放器后台问题
    13030: 'CGI内部错误',
    13040: '未知错误',
    13041: '服务解包失败',
    13042: '服务打包失败',
    13050: 'CGI初始化失败',
    13060: 'filename与vid format不对应',
    13061: 'vid不合法',
    13062: '文件状态不合法',
    13064: '访问付费服务出错',
    13067: '文件格式出错',
    13069: '没有可播格式',
    13074: '分片号超出范围',
    13076: '动态码率格式错误',
    13080: 'IP版权限制',
    13083: '未付费',
    13084.1: 'cgi访问视频type限制(通常是第三方鉴权 未传鉴权ID，或者播放的视频类型不在许可范围内)',
    13085: 'Ckey校验失败',
    13087: 'vids数量过多',
    13090: '广告type不合法',
    13091: '1080P未付费',
    13092: '视频禁止下载',
    13094: '多IP付费打击（付费）',
    13100: '站外限制播放',
    // 架构平台部存储问题
    11100: 'H5 视频取回过程被用户终止',
    11101: 'H5 当视频下载时发生错误',
    11102: 'H5 当视频解码时发生错误',
    11103: 'H5 不支持该音频/视频',
    11104: 'H5 视频链接请求超时(卡顿重试后10s触发)',
    11105: 'H5 m3u8加载错误',
    11106: 'H5 m3u8加载超时',
    11107: 'H5 m3u8解析失败',
    11108: 'H5 ts文件加载错误',
    11109: 'H5 ts文件加载超时',
    11110: 'H5 ts文件解析失败',
    11200: 'Flash mp4跨域错误',
    11201: 'Flash mp4连接服务器错误',
    11202: 'Flash mp4连接服务器关闭',
    11203: 'Flash mp4无法找到可播放流',
    11204: 'Flash 加载视频文件超时',
    11205: 'Flash HLS m3u8下载跨域错误',
    11206: 'Flash HLS m3u8下载网络错误',
    11207: 'Flash HLS m3u8解析错误',
    11208: 'Flash HLS ts文件下载跨域错误',
    11209: 'Flash HLS ts文件下载网络错误',
    11210: 'Flash HLS ts文件解析错误'
  },
  duty: {
    fontend: '可能是播放器问题，请联系：aprilcai 或 miropeng',
    afterend: '可能是播放器后台问题，请联系：willqqsun 或 kerwindu',
    cnd: '可能是视频存储问题，请联系：rodyli 或 johnlu'
  },
  analyCode(code) {
    // '60101.11202'
    const platformId = code.split('.')[0].slice(0, 2);
    const moduleId = code.split('.')[0].slice(2);
    const moduleInfoId = code.split('.')[1].slice(0, 2);
    const errorCodeInfoId = code.split('.')[1];
    const dutyId = this.moduleInfo[moduleInfoId].duty;
    const text = `错误码：${code}；播放器：${this.platform[platformId]}；出错模块：${this.module[moduleId]}（说明：${this.moduleInfo[moduleInfoId].info}）；错误码说明：${this.errorCode[errorCodeInfoId]}；责任方：${this.duty[dutyId]}；`;
    return text;
  }
};

export default errorCode;
