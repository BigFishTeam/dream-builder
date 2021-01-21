/*
 * @Date: 2019-02-28 15:18:03
 * @Last Modified time: 2019-03-01 11:31:11
 */

/**
 * 获取角度的弧度值
 * @param {number} arch
 */
const getRadian = arch => (Math.PI / 180) * arch;

/**
 * 计算文本长度
 * @param param0
 */
const measureText = ({ ctx, text, font }) => {
  ctx.font = font;
  return ctx.measureText(text);
};

export const WATERMARK_DEFAULT_OPTIONS = {
  textAlign: 'center',
  textBaseline: 'middle',
  font: '20px microsoft yahei',
  fillStyle: 'rgba(184, 184, 184, 0.6)',
  text: '请勿外传',
  padding: 20,
  rotation: 30
};

export const WATERMARK_DEFAULT_PROPS = {
  ...WATERMARK_DEFAULT_OPTIONS,
  zIndex: 9999
};

export function getMergedWatermarkOptions(watermarkOptions) {
  return Object.assign({ ...WATERMARK_DEFAULT_PROPS }, watermarkOptions || {});
}

export function getDataUrl(canvas) {
  if (canvas) {
    return canvas.toDataURL();
  }
  return '';
}

export function getCanvas({
  textAlign,
  textBaseline,
  font,
  fillStyle,
  text,
  padding,
  rotation
}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 获取字的高度
    const textHeight = parseFloat(font);
    // 获取字的宽度
    const textLength = measureText({ ctx, text, font }).width;
    // 计算最小高度
    const minHeight =
      Math.abs(textLength * Math.sin(getRadian(rotation))) +
      Math.abs(textHeight * Math.cos(getRadian(rotation)));
    // 计算最小宽度
    const minWidth =
      Math.abs(textLength * Math.cos(getRadian(rotation))) +
      Math.abs(textHeight * Math.sin(getRadian(rotation)));

    // 真实宽度选择使用最小宽(高)度+padding
    const realWidth = minWidth + padding * 2;
    const realHeight = minHeight + padding * 2;

    canvas.setAttribute('width', `${realWidth}px`);
    canvas.setAttribute('height', `${realHeight}px`);

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    // 转动画板前，先将画板中心移到左上角
    ctx.translate(realWidth / 2, realHeight / 2);
    // 转动画板
    ctx.rotate(getRadian(rotation));
    // 将画板中心移回到中心
    ctx.translate(-realWidth / 2, -realHeight / 2);
    // 在画板中心绘制文字
    ctx.fillText(text, realWidth / 2, realHeight / 2);

    return canvas;
  }
  return null;
}

export function getWatermarkedImage(src, options, callback) {
  if (src) {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.setAttribute('width', `${img.width}px`);
          canvas.setAttribute('height', `${img.height}px`);
          ctx.drawImage(img, 0, 0);
          const watermark = getCanvas(options);
          if (watermark) {
            const pat = ctx.createPattern(watermark, 'repeat');
            if (pat) {
              ctx.rect(0, 0, img.width, img.height);
              ctx.fillStyle = pat;
              ctx.fill();
            }
          }
          const dataUrl = canvas.toDataURL();
          callback(null, dataUrl);
        }
      } catch (e) {
        callback(e, '');
      }
    };
    img.src = src;
  }
}

/**
 * 获取水印样式
 * @param dataUrl
 */
export function getStyle(dataUrl, zIndex) {
  return {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex,
    left: '0',
    top: '0',
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
    backgroundImage: `url("${dataUrl}")`
  };
}

/**
 * 驼峰转短横线
 * @param str
 */
function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}-${b.toLowerCase()}`);
}

/**
 * 查看css属性是否变化
 * @param el
 * @param style
 */
export function propertyMutations(el, style) {
  /**
   * 1. 为什么需要这个方法？
   *     由于react不支持在inline-style里设置!important，
   * 现在的做法是在didUpated钩子里手动调用resetStyle方法再
   * 次更新样式，这样会触发水印DOM变动的监听。这不是人为设置，
   * 我们希望能够在不影响水印样式，也没有删除DOM的时候，不触发
   * onOperated回调，所以需要对DOM的style和目标进行比较。
   *
   * 2. 为什么使用inline-style而不使用class
   *     用户可以通过修改类的css样式而不触发DOM变更监听
   *
   * 3. 为什么使用!important
   *     用户可以通过!important做样式覆盖从而去除水印
   */
  const mutationList = [];
  Object.keys(style).forEach(key => {
    const priority = el.style.getPropertyPriority(camelToDash(key));
    const value = el.style.getPropertyValue(camelToDash(key));
    const compareValue = style[key].toString();
    if (
      priority === 'important' &&
      // TODO:需要一个比较两个css属性字符串是否等价的方法
      // issue：现在这个做法可能在跨浏览器时有不同表现
      // reason：浏览器会对style赋值进行修饰
      value.replace('px', '') === compareValue.replace('px', '')
    ) {
      return;
    }
    mutationList.push({ property: key, priority, value, compareValue });
  });
  return mutationList;
}

/**
 * 重置样式
 * @param el
 * @param style
 */
export function resetStyle(el, style) {
  Object.keys(style).forEach(key => {
    // React不支持inline-style的important prior，所以用以下的方式来进行样式的再次设置
    // [Support !important for styles? #1881](https://github.com/facebook/react/issues/1881)
    el.style.setProperty(camelToDash(key), style[key], 'important');
  });
}
