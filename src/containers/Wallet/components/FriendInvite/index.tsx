import React from 'react';
import clsx from 'clsx';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { Button } from '@Components/buttons';

import { useStyles, Image } from './styles';

interface Props {}

const ITEMS = [
  {
    number: 1,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
  {
    number: 6,
  },
];

const ACCOUNTS = [
  {
    image: '/images/img-user@2x.jpg',
    name: 'John',
    status: 'actived',
    totalActived: 3,
    cash: 30,
  },
  {
    image: '/images/img-user2@2x.jpg',
    name: 'Joanna',
    status: 'actived',
    totalActived: 2,
    cash: 40,
  },
  {
    image: '/images/img-user@2x.jpg',
    name: 'Daniel',
    status: 'actived',
    totalActived: 4,
    cash: 50,
  },
  {
    image: '/images/img-user2@2x.jpg',
    name: 'Jacob',
    status: 'actived',
    totalActived: 1,
    cash: 60,
  },
  {
    image: '/images/img-user@2x.jpg',
    name: 'Balmond',
    status: 'registed',
    totalActived: 0,
    cash: 0,
  },
  {
    image: '/images/img-user2@2x.jpg',
    name: 'Rain',
    status: 'actived',
    totalActived: 6,
    cash: 30,
  },
  {
    image: '/images/img-user@2x.jpg',
    name: 'Raymond',
    status: 'registed',
    totalActived: 0,
    cash: 0,
  },
];

const ItemInvite = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.boxItem}>
      <div className={classes.flexCenter}>
        <div className={clsx(classes.imgDollar, classes.flexCenter)}>
          <img src="/images/icon-dollar.svg" alt="" />
        </div>
        <div className={classes.ml10}>{`Invite ${data.number} Friend`}</div>
      </div>
      <div className={clsx(classes.flexCenter, classes.green)}>
        <div>You have received $3 Bonus</div>
        <CheckCircleIcon className={classes.iconCheck} />
      </div>
    </div>
  );
};

const RowAccount = ({ data }) => {
  const classes = useStyles();
  const { image, name, status, totalActived, cash } = data;
  return (
    <div className={classes.boxItem}>
      <div className={classes.flexCenter}>
        <Image background={image} />
        <div className={classes.ml10}>
          <div className={classes.textSize16}>{name}</div>
          <div
            className={clsx(classes.textSize15, classes.textGrey, {
              [classes.textRed]: status === 'registed',
            })}
          >
            {status === 'registed'
              ? 'Registered,  No Device'
              : `Tracki Activated x${totalActived}`}
          </div>
        </div>
      </div>
      <div className={clsx(classes.flexCenter, classes.green)}>
        <div className={clsx(classes.textSize20, classes.bold)}>${cash}</div>
      </div>
    </div>
  );
};

function FriendInvite(props: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.leftBox}>
          <div className={classes.sectionBanner}>
            <div className={classes.contentBanner}>
              <div className={clsx(classes.flexRow, classes.mb20)}>
                <img
                  src="/images/qrcode-baseline.svg"
                  alt=""
                  className={classes.qrImg}
                />
                <span className={classes.text}>Scan My QR Code</span>
              </div>
              <div className={clsx(classes.mt20, classes.mainBanner)}>
                <div className={classes.flexColCenter}>
                  <div className={clsx(classes.textSize32, classes.textCenter)}>
                    Invite your Friends and Earn Unlimited Cash!
                  </div>
                  <div className={clsx(classes.textSize16, classes.textCenter)}>
                    Refer a friend to purchase tracki device and earn $10 for
                    every friend who activates the device
                  </div>
                  <Button
                    classes={classes.btnMain}
                    text="Invite Friends"
                    onClick={() => console.log('Invite Friends')}
                  />
                </div>
                <img
                  src="/images/refer@2x.png"
                  alt=""
                  className={classes.referImg}
                />
              </div>
            </div>
            <div className={classes.boxReferalCode}>
              <div className={classes.textGrey}>Your referral code</div>
              <div className={clsx(classes.textSize36)}>B27321159</div>
              <div className={classes.textBlue}>
                <FileCopyIcon />
                Tap To Copy
              </div>
            </div>
          </div>
          <div className={classes.sectionInvite}>
            <div className={classes.headerList}>
              <div>Earn Bonus Cash by Inviting Friends!</div>
              <div>3/50</div>
            </div>
            <div className={classes.listItem}>
              {ITEMS.map((item, index) => (
                <ItemInvite data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className={classes.rightBox}>
          <div className={classes.headerList}>
            <div>Total Invited Friends ({ACCOUNTS.length})</div>
            <HelpOutlineIcon className={classes.helpIcon} />
          </div>
          <div className={classes.listItem}>
            {ACCOUNTS.map((item, index) => (
              <RowAccount key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendInvite;
