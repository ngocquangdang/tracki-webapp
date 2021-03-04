import React from 'react';
import { IconButton, Slider } from '@material-ui/core';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Replay as ReplayIcon,
} from '@material-ui/icons';
import { Button, ButtonGroup } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';

function ToolbarControlPlayback(props) {
  const {
    isOpenSidebar,
    togglePlaying,
    isPlaying,
    onChangeSpeeds,
    onChangeCounter,
    valControl,
    counter,
    steps,
    onChangeControl,
    onReplay,
    isMobile,
  } = props;
  const classes = useStyles();
  const handleChange = (event: any, newValue: number | number[]) => {
    onChangeCounter(newValue);
  };

  const groupButtonSpeed = [
    {
      label: '1X',
      value: 1000,
    },
    {
      label: '2X',
      value: 500,
    },
    {
      label: '5X',
      value: 200,
    },
    {
      label: '10X',
      value: 100,
    },
  ];

  const groupButtonControl = [
    {
      label: 'Actual',
      value: 'actual',
    },
    {
      label: 'Optimized',
      value: 'optimized',
    },
  ];

  const handleChangeSpeed = (speed: number) => () => {
    onChangeSpeeds(speed);
  };
  const handleChangeControl = (val: string) => () => {
    onChangeControl(val);
  };
  return (
    <div
      className={clsx(
        classes.container,
        {
          [classes.openSidebar]: !isOpenSidebar && !isMobile,
        },
        {
          [classes.containerMobile]: isMobile,
        }
      )}
    >
      <div
        className={clsx(classes.content, {
          [classes.contentMobile]: isMobile,
        })}
      >
        <div className={classes.flexRow}>
          <IconButton
            className={isMobile ? classes.iconBtnMobile : classes.iconBtn}
            onClick={togglePlaying}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
            value={counter}
            max={steps}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
          <IconButton
            className={
              isMobile ? classes.iconRefreshBtnMobile : classes.iconBtnRefresh
            }
            onClick={onReplay}
            disabled={isPlaying}
          >
            <ReplayIcon />
          </IconButton>
        </div>
        <div className={classes.flexBetween}>
          <ButtonGroup className={clsx(classes.flexRow)}>
            {groupButtonSpeed.map(item => (
              <Button
                variant="contained"
                className={clsx(classes.btn, {
                  [classes.btnActive]: steps === item.value,
                })}
                onClick={handleChangeSpeed(item.value)}
                key={item.value}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup className={classes.flexRow}>
            {groupButtonControl.map(item => (
              <Button
                variant="contained"
                className={clsx(classes.btn, {
                  [classes.btnActive]: item.value === valControl,
                })}
                onClick={handleChangeControl(item.value)}
                key={item.value}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default ToolbarControlPlayback;
