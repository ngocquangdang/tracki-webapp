import moment from 'moment';

export const getMyWalllet = () => {
  return {
    point: 5000,
    my_wallet: '200.50',
    referral_code: 'B27321159',
  };
};

export const getAdvertiment = () => {
  return [
    { id: 1, adv_name: 'Share Tracki', point: '50', type: 'share' },
    { id: 2, adv_name: 'Follow Tracki on Facebook', point: '50', type: 'go' },
    {
      id: 3,
      adv_name: 'Share Follow Tracki on Facebook',
      point: '50',
      type: 'go',
    },
    { id: 4, adv_name: 'Follow Facebook Tracki', point: '50', type: 'go' },
    { id: 5, adv_name: 'Share on Facebook', point: '50', type: 'go' },
    { id: 6, adv_name: 'Share Facebook', point: '50', type: 'go' },
  ];
};

export const getProduct = () => {
  return [
    {
      id: 1,
      name: 'You Earned Free Points!',
      point: '5220',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 2,
      name: 'You Earned Free Points!',
      point: '5000',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 3,
      name: 'You Earned Free Points!',
      point: '5110',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 4,
      name: 'You Earned Free Points!',
      point: '50',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 5,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '530',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 6,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '520',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 7,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '50',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 8,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '50',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 9,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '50',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 10,
      name: 'You received bonus for being invited by John!',
      point: '50',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 11,
      name: 'You received bonus for being invited by John!',
      point: '50',
      icon: './images/bg.png',
      type: 'tracker',
    },
    {
      id: 12,
      name: 'You received bonus for being invited by John!',
      point: '50',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 13,
      name: 'You received bonus for being invited by John!',
      point: '50',
      icon: './images/bg.png',
      type: 'accesory',
    },
    {
      id: 14,
      name: 'You received bonus for being invited by John!',
      point: '50',
      icon: './images/bg.png',
      type: 'accesory',
    },
  ];
};

export const getPointHistory = () => {
  return [
    {
      id: 1,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'gift',
    },
    {
      id: 2,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'gift',
    },
    {
      id: 3,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'gift',
    },
    {
      id: 4,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'free',
    },
    {
      id: 5,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 6,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 7,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 8,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 9,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 10,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 11,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 12,
      name: 'Tracki 2020 Model Mini Realtime GPS Tracker!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 13,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
    {
      id: 14,
      name: 'Tracki® + MagneticWaterproofBox with Extended battery!',
      point: '50',
      updated: moment().unix(),
      type: 'invite',
    },
  ];
};

export const getSubscriptionPlan = () => {
  return [
    {
      planId: 11,
      name: '1 month',
      price: '19.95',
      point: '50',
    },
    {
      planId: 12,
      name: '6 months',
      price: '16.60',
      point: '250',
    },
    {
      planId: 13,
      name: '12 months',
      price: '13.95',
      point: '350',
    },
    {
      planId: 14,
      name: '24 months',
      price: '9.95',
      point: '450',
    },
  ];
};

export const getSMSPlan = () => {
  return [
    {
      planId: 11,
      sms_limit: 50,
      name: '1 month',
      price: '3.95',
      point: '50',
    },
    {
      planId: 12,
      sms_limit: 100,
      name: '1 month',
      price: '5.95',
      point: '250',
    },
    {
      planId: 13,
      sms_limit: 200,
      name: '1 month',
      price: '9.99',
      point: '350',
    },
    {
      planId: 14,
      sms_limit: 500,
      name: '1 month',
      price: '19.99',
      point: '450',
    },
  ];
};
