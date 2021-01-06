import { notification, message } from 'antd';

class EventManager {
  private events: { [key: string]: ((...args: any) => any)[] } = {};
  private history = [];

  info = (message: string) => {
    notification.open({
      message,
      duration: 2,
    });
  };

  warn = (message: string) => {
    notification.warn({
      message,
      duration: 2,
    });
  };

  error = (message: string) => {
    notification.error({
      message,
      duration: 2,
    });
  };

  constructor() {
    this.warn('核心事件总线加载成功');
  }

  listen = (targetName: string, handler: (...args: any) => any) => {
    if (targetName.indexOf('method:') !== -1) {
      this.events[targetName] = [handler];
      return;
    }
    if (!this.events[targetName]) {
      this.events[targetName] = [];
    }
    this.events[targetName].push(handler);
  };

  emit = (targetName: string, ...args: any) => {
    if (this.events[targetName]) {
      this.events[targetName].forEach(handler => {
        handler.call(this, ...args);
      });
    } else {
      console.warn(`warn: 请为该事件绑定方法`);
    }
  };
}

export default new EventManager();
