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
