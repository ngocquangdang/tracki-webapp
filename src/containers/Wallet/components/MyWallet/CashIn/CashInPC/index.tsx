import React, { useState } from 'react';

//Component
import { MainLayout } from '@Layouts';
import CashInContainer from './compoments/CashinContainer';
import CashinConfirm from './compoments/Paynow';
import CashInSuccessfull from './compoments/CashInSuccessfull';

//style

interface Props {
  t(key: string, value?: object);
}

const listPayment = [
  {
    urlImg: '/static/images/philipinbank.svg',
    name: 'xxx',
  },
  {
    urlImg: '/static/images/paypal.png',
    name: 'yyy',
  },
];

function CashInPC(props: Props) {
  const { t } = props;

  const [screenKey, setScreenKey] = useState(0);

  const onChageScreen = (key: number) => {
    switch (key) {
      case 1:
        return (
          <CashinConfirm t={t} setScreenKey={setScreenKey} formData={{}} />
        );
      case 2:
        return (
          <CashInSuccessfull t={t} formData={{}} setScreenKey={setScreenKey} />
        );
      default:
        return (
          <CashInContainer
            t={t}
            setScreenKey={setScreenKey}
            listPayment={listPayment}
          />
        );
    }
  };

  const getCashInScreen = onChageScreen(screenKey);

  return <MainLayout hasFooter={false}>{getCashInScreen}</MainLayout>;
}

export default CashInPC;
