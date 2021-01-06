import shortId from 'shortid';

export default {
  GGLogger(message: any) {
    console.log(`[Gong gong] ${message}`);
  },

  GGErrorLogger(message: any) {
    console.error(`[Gong gong] ${message}`);
  },

  GGWarnLogger(message: any) {
    console.warn(`[Gong gong] ${message}`);
  },

  uuid() {
    return shortId();
  },

  getCookieByKey(key: string) {
    const cookie = document.cookie;
    const cookieArray = cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const [cookieKey, cookieValue] = cookieArray[i].trim().split('=');
      if (key === cookieKey) {
        return cookieValue;
      }
    }
    return undefined;
  },
};
