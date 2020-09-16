import axios from 'axios';
import { isEmpty, assign } from 'lodash';

const singletonEnforcer = Symbol();

class AxiosClient {
  axiosWoocommerce: any;
  static axiosWoocommerceInstance: any;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }

    this.axiosWoocommerce = axios.create({
      baseURL: process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: `${process.env.NEXT_PUBLIC_CONSUMER_KEY}`,
        password: `${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
      },
    });

    this.axiosWoocommerce.interceptors.request.use(
      (configure: any) => {
        return configure;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    this.axiosWoocommerce.interceptors.response.use(
      (response: any) => {
        if (response.data.data && Array.isArray(response.data.data.data)) {
          response.data.data.dataObject = response.data.data.data.reduce(
            (dataObject: any, item: any) => {
              dataObject[item.id] = item;
              return dataObject;
            },
            {}
          );
        }
        return response;
      },
      (error: any) => {
        if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          error.response.data.errorsObject = error.response.data.errors.reduce(
            (errorObject: any, item: any) => {
              errorObject[item.field] = item;
              return errorObject;
            },
            {}
          );
        }

        return Promise.reject(error.response);
      }
    );
  }

  static get instance() {
    if (!this.axiosWoocommerceInstance) {
      this.axiosWoocommerceInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosWoocommerceInstance;
  }

  setHeader(userToken = null) {
    this.axiosWoocommerce.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }

  get(resource: string, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosWoocommerce.get(
      requestURL,
      assign(config, this.axiosWoocommerce.defaults.headers)
    );
  }

  post(resource: string, data: object, config = {}) {
    return this.axiosWoocommerce.post(
      `${resource}`,
      data,
      assign(config, this.axiosWoocommerce.defaults.headers)
    );
  }

  update(resource: string, data: object, config = {}) {
    return this.axiosWoocommerce.put(
      `${resource}`,
      data,
      assign(config, this.axiosWoocommerce.defaults.headers)
    );
  }

  put(resource: string, data: object, config = {}) {
    return this.axiosWoocommerce.put(
      `${resource}`,
      data,
      assign(config, this.axiosWoocommerce.defaults.headers)
    );
  }

  patch(resource: string, data: object, config = {}) {
    return this.axiosWoocommerce.patch(
      `${resource}`,
      data,
      assign(config, this.axiosWoocommerce.defaults.headers)
    );
  }

  delete(resource: string, data: object, config = {}) {
    return this.axiosWoocommerce.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosWoocommerce.defaults.headers),
    });
  }
}

export default AxiosClient.instance;
