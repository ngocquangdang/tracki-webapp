import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import clsx from 'clsx';

//component
import { Button } from '@Components/buttons';
import { MainLayout } from '@Layouts';
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';

// styles
import { useStyles } from './styles';

// interface
interface Props {}

function TransactionInfo(props) {
  const classes = useStyles();
  const { t, onClose, transaction } = props;

  const handleClose = () => onClose();
  return (
    <MainLayout hasFooter={false}>
      <DetailPageContainer
        title={t('wallet:transaction_info')}
        onClick={handleClose}
        isBorder
      >
        <div className={clsx(classes.container, classes.bgf1f1)}>
          <div className={clsx(classes.bgfff, classes.mb10)}>
            <p className={clsx(classes.mr0, classes.pd15)}>
              {t('wallet:orders')}
            </p>
            {transaction?.orders?.map(i => (
              <OrderCard key={i.id} item={i} />
            ))}
            <div className={classes.pd20}>
              <div
                className={clsx(
                  classes.flexBox,
                  classes.spaceBetween,
                  classes.mb10
                )}
              >
                <p className={clsx(classes.mr0, classes.f14)}>
                  {t('wallet:device_subtotal')}
                </p>
                <p className={clsx(classes.mr0, classes.f14)}>$0.00</p>
              </div>
              <div
                className={clsx(
                  classes.flexBox,
                  classes.spaceBetween,
                  classes.mb10
                )}
              >
                <p className={clsx(classes.mr0, classes.f14)}>
                  {t('wallet:shipping_subtotal')}
                </p>
                <p className={clsx(classes.mr0, classes.f14)}>$0.00</p>
              </div>
              <div
                className={clsx(
                  classes.flexBox,
                  classes.spaceBetween,
                  classes.mb10
                )}
              >
                <p className={clsx(classes.mr0, classes.f14)}>
                  {t('wallet:coupon_discount')}
                </p>
                <p className={clsx(classes.mr0, classes.f14)}>$0.00</p>
              </div>
              <div className={clsx(classes.flexBox, classes.spaceBetween)}>
                <p
                  className={clsx(
                    classes.mr0,
                    classes.f16,
                    classes.uppercase,
                    classes.w500
                  )}
                >
                  {t('wallet:total_payment')}
                </p>
                <p
                  className={clsx(
                    classes.mr0,
                    classes.f16,
                    classes.primaryColor
                  )}
                >
                  $0.00
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(classes.pd20, classes.mb10, classes.bgfff)}>
            <div className={clsx(classes.flexBox, classes.mb10, classes.f14)}>
              <RoomIcon className={clsx(classes.f16, classes.redColor)} />{' '}
              {t('wallet:shipping_address')}
            </div>
            <p
              className={clsx(
                classes.mr0,
                classes.w500,
                classes.f14,
                classes.mb10
              )}
            ></p>
            <p className={clsx(classes.f14, classes.w300)}></p>
          </div>
          <div className={clsx(classes.pd20, classes.mb10, classes.bgfff)}>
            <p
              className={clsx(
                classes.f16,
                classes.mr0,
                classes.mb10,
                classes.w500
              )}
            >
              {t('wallet:payment_details')}:
            </p>
            <p className={clsx(classes.f14, classes.mr0)}>
              {t('wallet:payment_via', { paymentType: 'Paypal' })}
            </p>
          </div>
          <div
            className={clsx(
              classes.pd20,
              classes.mb10,
              classes.bgfff,
              classes.flexBox,
              classes.center
            )}
          >
            <p className={clsx(classes.f16, classes.mr0, classes.primaryColor)}>
              {t('wallet:transaction_completed')}
            </p>
          </div>
          <div className={clsx(classes.flexBox, classes.center)}>
            <Button
              classes={clsx(classes.btnBackground)}
              text="OK"
              onClick={handleClose}
            />
          </div>
        </div>
      </DetailPageContainer>
    </MainLayout>
  );
}

function OrderCard(props) {
  const classes = useStyles();

  const { item } = props;
  return (
    <div className={clsx(classes.card, classes.flexBox)}>
      <div>
        <img
          src="/images/tracki-device.png"
          alt=""
          className={classes.img}
        />
      </div>
      <div className={classes.fullwidth}>
        <p
          className={clsx(
            classes.mr0,
            classes.textOverflow,
            classes.f14,
            classes.mb5
          )}
        >
          {item.name}
        </p>
        <div className={clsx(classes.flexBox, classes.spaceBetween)}>
          <p className={clsx(classes.mr0, classes.f12)}>x{item.qty}</p>
          <p className={clsx(classes.mr0, classes.f12)}>${item?.price}</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfo;
