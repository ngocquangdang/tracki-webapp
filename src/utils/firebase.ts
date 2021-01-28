import firebaseApp from 'firebase/app';
import firebase from 'firebase';
import 'firebase/analytics';

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MESSENGIN_SENDER_ID,
  MESUAREMENT_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@Definitions/app';
import { firebaseEnvent } from './firebaseEvent';

//interface
interface Param {
  event_name: string;
  screen_name: string;
  type: string;
  description: string;
  provider_group?: string;
  custom_event?: string;
}
export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSENGIN_SENDER_ID,
  appId: APP_ID,
  measurementId: MESUAREMENT_ID,
};

if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in firebaseConfig) {
      firebase.analytics();
      console.log('config analytics success');
    }
  }
}

function analyticsEvent(name: string, param?: Object): void {
  try {
    firebase.analytics().logEvent(name, param);
  } catch (e) {
    console.log('Unable to tag analytics event:', e);
  }
}

export const firebaseLogEventRequest = (
  page_name: string,
  click_name: string
) => {
  const page_event = firebaseEnvent[page_name];
  if (click_name) {
    const click_event = page_event[click_name];
    return analyticsEvent(click_name, click_event);
  } else {
    return analyticsEvent(page_name, page_event);
  }
};

const app = firebase.apps[0];
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');

export { firebase, analyticsEvent };
