export const SHOW_SNACKBAR = 'Tracki/SHOW_SNACKBAR';
export const CLEAR_SNACKBAR = 'Tracki/CLEAR_SNACKBAR';

export interface SNACK_TYPES {
  show: boolean;
  snackType: string;
  snackMessage: string;
}

export interface SNACK_PAYLOAD {
  snackType: 'success' | 'error' | 'info' | 'warning';
  snackMessage: string;
}

export interface SNACK_ACTION {
  type: string;
  payload: SNACK_PAYLOAD;
}
