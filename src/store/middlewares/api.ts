import {
  showLoadingAction,
  hideLoadingAction,
} from '@Containers/App/store/actions';

const apiMiddleware = store => next => action => {
  const { type: actionType, payload: payloadAction } = action;
  if (actionType.includes('REQUESTED')) {
    store.dispatch(showLoadingAction());
  }

  if (actionType.includes('SUCCEED') || actionType.includes('FAILED')) {
    store.dispatch(hideLoadingAction());
  }

  if (actionType.includes('FAILED')) {
    const { message, code, message_key } = payloadAction;
    if (code === '400') {
      console.log('___400 ERROR', message);

    }
    if (code === '403' && message_key === 'exception_user_nameNotActivated') {
      console.log('___404 ERROR', message);
    }
    if (code === '500') {
      console.log('___500 ERROR', message);
    }
  }

  next(action);
};

export default apiMiddleware;
