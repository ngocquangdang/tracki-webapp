import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from '@Interfaces';
import * as apiServices from '../../services';
import * as types from '../constances';

import {
  checkDeviceAssignedSuccesAction,
  checkDeviceAssignedFailAction,
  getDevicePlanSuccesAction,
  getDevicePlanFailAction,
  addDeviceFailAction,
  addDeviceSuccesAction,
  braintreeDropInFailAction,
  updateStore,
  braintreeDropInSuccesAction,
} from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { fetchTrackersRequestedAction } from '@Containers/Trackers/store/actions';

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
    const { data: userData } = yield call(apiServices.getUserInfo);
    const newPaymentData = {
      nonce: creditCard.nonce,
      plan_id: formData.selectedPlan.id,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
    };
    if (formData.selectedPlan.paymentPlatform === 'PREPAID') {
      yield call(
        apiServices.setPrepaidPlanToDevice,
        userData.account_id,
        parseInt(formData.device_id),
        formData.selectedPlan.id
      );
      yield put(fetchTrackersRequestedAction(userData.account_id));
    } else if (formData.selectedPlan.paymentPlatform === 'NONCE') {
      yield call(
        apiServices.setBraintreeNoncePlanToDevice,
        userData.account_id,
        parseInt(formData.device_id),
        newPaymentData
      );
      yield put(fetchTrackersRequestedAction(userData.account_id));
    }
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Add New Device Succeed',
      })
    );
    yield put(updateStore({ ...formData, creditCard }));
    yield put(braintreeDropInSuccesAction(action.payload));
    yield callback();
  } catch (error) {
    const { data } = error;
    yield put(
      showSnackbar({
        snackType: 'error',
        snackMessage: data.error || data.message,
      })
    );
    yield put(braintreeDropInFailAction(error));
  }
}

function* personalizeDeviceSaga(action: ActionType) {
  const { formData, data, account_id, callback } = action.payload;
  const { value, file } = data;
  try {
    // const res = yield call(apiServices.getSubAccount, account_id);
    // const getNewDevice = find(res.data.device_ids, {
    //   device_id: parseInt(formData.device_id),
    // });

    const device_name = {
      name: value?.device_name,
    };
    yield call(
      apiServices.updateDeviceName,
      account_id,
      parseInt(formData.device_id),
      device_name
    );

    // const [
    //   sample_rate,
    //   samples_per_report,
    //   tracking_measurment,
    // ] = value.device_traking.split('_');
    // const settings = {
    //   preferences: {
    //     tracking_mode: {
    //       sample_rate,
    //       samples_per_report,
    //       tracking_measurment,
    //     },
    //   },
    // };

    // yield call(updateSettings, account_id, getNewDevice.settings_id, settings);

    if (file) {
      const formDataFile = new FormData();
      formDataFile.append('file', file);
      const { data: iconData } = yield call(
        apiServices.uploadImage,
        account_id,
        formData.device_id,
        formDataFile
      );
      yield put(updateStore({ ...formData, icon_url: iconData.icon_url }));
    }

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
  yield takeLatest(
    types.UPDATE_PERSONALIZE_DEVICE_REQUESTED,
    personalizeDeviceSaga
  );
}
