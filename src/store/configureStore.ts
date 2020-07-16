import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import createReducer from '@Reducers';
import appSaga from '@Containers/App/store/sagas';
import apiMiddleWare from './middlewares/api';

const configureStore = (initialState = {}) => {
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware, apiMiddleWare];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(...enhancers)
  );

  const storeExtend = Object.assign(store);

  // Extensions
  storeExtend.runSaga = sagaMiddleware.run;
  storeExtend.injectedReducers = {};
  storeExtend.injectedSagas = {};
  sagaMiddleware.run(appSaga);
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hasOwnProperty('hot')) {
    module.hot!.accept('../reducers', () => {
      storeExtend.replaceReducer(createReducer(storeExtend.injectedReducers));
    });
  }

  return storeExtend;
};

export const wrapper = createWrapper(configureStore);
