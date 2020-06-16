const devProxy: { [key: string]: {} } = {
  '/api': {
    target: 'https://tracki.com',
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
  },
};

export default devProxy;
