import React from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';
function TripCard() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.flexCol}>
        <div
          className={clsx(
            classes.rowBetween,
            classes.textBold,
            classes.textFont13
          )}
        >
          <span>April 16, 2020</span>
          <span>5.0 KM</span>
        </div>
        <div
          className={clsx(
            classes.rowBetween,
            classes.textBold,
            classes.textFont13
          )}
        >
          <div className={classes.flexRowCenter}>
            <span className={classes.circleGreen} />
            <span>From 11:30 AM</span>
          </div>
          <span>9m 50s</span>
        </div>
        <div className={clsx(classes.textNoWrap, classes.textFont13)}>
          24974, Cottonwood Ave, Moreno Avenue Street, Canada,Moreno Avenue
          Street, Canada
        </div>
        <div
          className={clsx(
            classes.flexRowCenter,
            classes.textBold,
            classes.textFont13
          )}
        >
          <span className={classes.circleRed} />
          <span>To 06:30 PM</span>
        </div>
        <div className={clsx(classes.textNoWrap, classes.textFont13)}>
          12625, Frederick St, Moreno Valley Wolf Street Avenue,Moreno Avenue
          Street, Canada
        </div>
      </div>
    </div>
  );
}

export default TripCard;
