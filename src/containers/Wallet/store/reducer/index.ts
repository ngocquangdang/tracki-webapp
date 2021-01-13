import produce from 'immer';

import { ActionType, TrackingDataTypes } from '@Interfaces/index';

export const initialState: any = {};

const walletReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackingDataTypes) => {
    switch (type) {
      default:
        break;
    }
  });

export default walletReducer;
