import React from 'react';
import { IoIosPricetag } from 'react-icons/io';

import { useStyles } from './styles';

export default function CouponsView() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.icon}>
          <IoIosPricetag className={classes.iconTag} />
        </div>
        <div className={classes.descriptionDiscount}>
          <span className={classes.codeDiscount}>JAMLESS10PCT</span>
          <div className={classes.contentDescription}>
            <span className={classes.textDiscount}>
              10% discount on total payment
            </span>
            <div className={classes.expiriDate}>Expiring in: 29 days left</div>
          </div>
        </div>
      </div>
    </div>
  );
}
