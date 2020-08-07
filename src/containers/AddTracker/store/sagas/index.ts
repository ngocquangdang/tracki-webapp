import { takeLatest, call, put } from 'redux-saga/effects';
import { find } from 'lodash';
import { ActionType } from '@Interfaces';
import * as apiServices from '../../services';
import { updateSettings } from '@Containers/SingleTracker/store/services';
import * as types from '../constances';

import {
  checkDeviceAssignedSuccesAction,
  checkDeviceAssignedFailAction,
  getDevicePlanSuccesAction,
  getDevicePlanFailAction,
  // getSubAccountFailAction,
  // getSubAccountSuccesAction,
  addDeviceFailAction,
  addDeviceSuccesAction,
  braintreeDropInFailAction,
  updateStore,
  braintreeDropInSuccesAction,
} from '../actions';

function* checkDeviceAssignedSaga(action: ActionType) {
  try {
    const res = yield call(
      apiServices.checkDeviceAssigned,
      action.payload.data
    );
    if (res.data.assigned === 'false') {
      yield action.payload.callback(true);
      yield put(checkDeviceAssignedSuccesAction(res.data));
      return;
    }
    if (res.data.assigned === 'true') {
      yield action.payload.callback(false);
      yield put(checkDeviceAssignedSuccesAction(res.data));
      return;
    }
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield action.payload.callback(false);
    yield put(checkDeviceAssignedFailAction(payload));
  }
}

function* getDevicePlanSaga(action: ActionType) {
  try {
    const account_id = yield call(apiServices.getUserInfo);
    const res = yield call(apiServices.getTrackerPlan, action.payload);
    yield put(
      getDevicePlanSuccesAction(
        res.data?.planDTOList,
        account_id.data?.account_id
      )
    );
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(getDevicePlanFailAction(payload));
  }
}

// function* getSubAccountSaga(action: ActionType) {
//   try {
//     const { data } = yield call(
//       apiServices.getSubAccount,
//       action.payload.account_id
//     );
//     // console.log(data.device_ids, parseInt(action.payload.device_id));
//     const getNewDevice = _.find(data.device_ids, {
//       device_id: parseInt(action.payload.device_id),
//     });
//     // console.log('function*getSubAccountSaga -> getNewDevice', getNewDevice);

//     yield put(getSubAccountSuccesAction(getNewDevice));
//   } catch (error) {
//     const { data = {} } = { ...error };
//     const payload = {
//       ...data,
//       errors: (data.errors || []).reduce(
//         (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
//         {}
//       ),
//     };
//     yield put(getSubAccountFailAction(payload));
//   }
// }

function requestPaymentMethod(dropIn) {
  return new Promise((reslove, reject) => {
    dropIn
      .requestPaymentMethod()
      .then(payload => {
        reslove(payload);
      })
      .catch(error => reject(error));
  });
}

function* braintreeDropinSaga(action: ActionType) {
  const { formData, callback } = action.payload;

  try {
    const creditCard = yield call(requestPaymentMethod, window.dropinIntance);
    yield put(updateStore({ ...formData, creditCard }));
    yield callback();
    yield put(braintreeDropInSuccesAction(action.payload));
  } catch (error) {
    console.log('function*braintreeDropinSaga -> error', error);
    yield put(braintreeDropInFailAction(error));
  }
}

function* addDeviceSaga(action: ActionType) {
  const { formData, data, account_id, paymentData, callback } = action.payload;

  try {
    if (formData.selectedPlan.paymentPlatform === 'PREPAID') {
      yield call(
        apiServices.setPrepaidPlanToDevice,
        account_id,
        parseInt(formData.device_id),
        formData.selectedPlan.id
      );
    } else if (formData.selectedPlan.paymentPlatform === 'NONCE') {
      yield call(
        apiServices.setBraintreeNoncePlanToDevice,
        account_id,
        parseInt(formData.device_id),
        paymentData
      );
    }

    const res = yield call(apiServices.getSubAccount, account_id);
    const getNewDevice = find(res.data.device_ids, {
      device_id: parseInt(formData.device_id),
    });

    const device_name = {
      name: data?.device_name,
    };
    yield call(
      apiServices.updateDeviceName,
      account_id,
      parseInt(formData.device_id),
      device_name
    );

    const [
      sample_rate,
      samples_per_report,
      tracking_measurment,
    ] = data.device_traking.split('_');
    const settings = {
      preferences: {
        tracking_mode: {
          sample_rate,
          samples_per_report,
          tracking_measurment,
        },
      },
    };

    yield call(updateSettings, account_id, getNewDevice.settings_id, settings);

    yield put(addDeviceSuccesAction(action.payload));
    yield callback(true);
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(addDeviceFailAction(payload));
    yield callback(false);
  }
}

export default function* watcher() {
  yield takeLatest(
    types.CHECK_DEVICEID_ASSIGNED_REQUESTED,
    checkDeviceAssignedSaga
  );
  yield takeLatest(types.GET_DEVICE_PLAN_REQUESTED, getDevicePlanSaga);
  yield takeLatest(types.BRAINTREE_DROPIN_REQUESTED, braintreeDropinSaga);
  // yield takeLatest(types.GET_SUB_ACCOUNT_REQUESTED, getSubAccountSaga);
  yield takeLatest(types.ADD_DEVICE_REQUESTED, addDeviceSaga);
}
