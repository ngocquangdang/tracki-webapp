import Cryptr from 'cryptr';

class LocalStorageHandler {
  secretKey: any;
  private cryptoHandler: any;

  static localStorageHandlerInstance: any;

  constructor() {
    this.secretKey = 'trackipro';
    this.cryptoHandler = new Cryptr(this.secretKey);
  }

  public setItem(name: string, value: any) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    // console.log('value', value, this.cryptoHandler.encrypt('test'));
    // const encryptedValue = this.cryptoHandler.encrypt(value); // Encrypt original value
    window.localStorage.setItem(name, value);
  }

  public removeItem(name: string) {
    window.localStorage.removeItem(name);
  }

  public getItem(name: string) {
    let data = window.localStorage.getItem(name) as string;
    try {
      // data = JSON.parse(this.cryptoHandler.decrypt(data));
      data = JSON.parse(data);
    } catch (e) {
      return '';
    }
    return data; // Decrypt for get original value
  }

  public checkItem(name: string) {
    const user = this.getItem(name);
    if (user !== '' && user !== null) {
      return true;
    }
    return false;
  }
}

export default LocalStorageHandler;
