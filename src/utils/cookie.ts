import CryptoJS from 'crypto-js';

const singletonEnforcer = Symbol();

class CookieHandler {
  secretKey: any;

  static cookieHandlerInstance: any;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Cookie single instance');
    }

    this.secretKey = 'trackipro';
  }

  static get instance() {
    if (!this.cookieHandlerInstance) {
      this.cookieHandlerInstance = new CookieHandler(singletonEnforcer);
    }

    return this.cookieHandlerInstance;
  }

  setCookie(name: string, value: any, minutesExpired: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesExpired);
    const expires = `expires=${date.toUTCString()}`;
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      this.secretKey
    ).toString(); // Encrypt original value
    document.cookie = `${name}=${encryptedValue};${expires};path=/`;
  }

  removeCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }

  getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const partsPop = parts.pop();

      if (partsPop) {
        const encryptedValue = partsPop.split(';').shift() as string;
        return CryptoJS.AES.decrypt(encryptedValue, this.secretKey).toString(
          CryptoJS.enc.Utf8
        ); // Decrypt for get original value
      }
    }
    return '';
  }

  checkCookie(name: string) {
    const user = this.getCookie(name);
    if (user !== '' && user !== null) {
      return true;
    }
    return false;
  }
}

export default CookieHandler.instance;
