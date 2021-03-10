import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import { SideBarOutside } from '@Components/sidebars';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
  payment?: string;
  onChangeTab: (tab: number) => void;
}

function CashOutConfirmSP(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, payment = '', onChangeTab } = props;

  const onBack = () => routes.back();

  return (
    <SideBarOutside
      title={t('wallet:cash_out_confirmation')}
      show={true}
      handleClose={onBack}
      isMobile={true}
      isNotSave={true}
    >
      <div className={classes.container}>
        <div className={clsx(classes.card)}>
          <div className={classes.pd15}>
            <p className={clsx(classes.mr0, classes.fs15)}>
              {t('wallet:cash_out_from_to', { from: 'Tracki' })}
            </p>
            <p className={clsx(classes.mr0, classes.fs14)}>
              {payment ? payment : t('wallet:no_payment_method')}
            </p>
          </div>
        </div>
        <div className={clsx(classes.card)}>
          <div
            className={clsx(
              classes.flexBox,
              classes.spaceBetween,
              classes.pd15,
              classes.borderbottom
            )}
          >
            <p className={clsx(classes.mr0, classes.fs15)}>
              {t('wallet:amount_to_cash_out')}
            </p>
            <p className={clsx(classes.mr0, classes.fs14)}>${0}</p>
          </div>
          <div
            className={clsx(
              classes.flexBox,
              classes.spaceBetween,
              classes.pd15,
              classes.borderbottom
            )}
          >
            <p className={clsx(classes.mr0, classes.fs15)}>
              {t('wallet:cash_out_fee')}
            </p>
            <p className={clsx(classes.mr0, classes.fs14)}>
              {t('wallet:free')}
            </p>
          </div>
          <div
            className={clsx(
              classes.flexBox,
              classes.spaceBetween,
              classes.pd15,
              classes.borderbottom
            )}
          >
            <p className={clsx(classes.mr0, classes.fs15)}>
              {t('wallet:total_amount_cashed_out')}
            </p>
            <p className={clsx(classes.mr0, classes.fs15, classes.colorActive)}>
              ${0}
            </p>
          </div>
        </div>
        <div>
          <div className={classes.btn}>
            <Button
              text={t('wallet:confirm')}
              color="primary"
              fullWidth
              variant="contained"
              onClick={onChangeTab(2)}
            />
          </div>
        </div>
        <div className={clsx(classes.description)}>
          <HelpOutlineOutlinedIcon className={classes.icon} />{' '}
          {t('wallet:cash_out_description')}
        </div>
      </div>
    </SideBarOutside>
  );
}

export default CashOutConfirmSP;
