// #region Global Imports
const nextRoutes = require('next-routes');
// #endregion Global Imports

const routes = (module.exports = nextRoutes());

routes.add('login', '/');

export default routes;
