import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import createReducer from '@Reducers';

export const configureStore = (initialState = {}) => {
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware];

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

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hasOwnProperty('hot')) {
    module.hot!.accept('../reducers', () => {
      storeExtend.replaceReducer(createReducer(storeExtend.injectedReducers));
    });
  }

  console.log('storeExtend', storeExtend);
  return storeExtend;
};
