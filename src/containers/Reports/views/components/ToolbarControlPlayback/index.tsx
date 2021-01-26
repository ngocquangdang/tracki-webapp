import React, { useState } from 'react';
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
  const { isOpenSidebar, togglePlaying, isPlaying } = props;
  const classes = useStyles();
  const [value, setValue] = useState<number | number[]>(1);
  const [speedPlay, setSpeedPlay] = useState<number>(1);
  const [valControl, setValControl] = useState<string>('actual');
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const groupButtonSpeed = [
    {
      label: '1X',
      value: 1,
    },
    {
      label: '2X',
      value: 2,
    },
    {
      label: '3X',
      value: 3,
    },
    {
      label: '4X',
      value: 4,
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

  const handleChangeSpeed = (speed: number) => () => setSpeedPlay(speed);
  const handleChangeControl = (val: string) => () => setValControl(val);
  return (
    <div
      className={clsx(classes.container, {
        [classes.openSidebar]: !isOpenSidebar,
      })}
    >
      <div className={classes.content}>
        <div className={classes.flexRow}>
          <IconButton className={classes.iconBtn} onClick={togglePlaying}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
            value={value}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
          />
          <IconButton className={classes.iconBtn}>
            <ReplayIcon />
          </IconButton>
        </div>
        <div className={classes.flexBetween}>
          <ButtonGroup className={clsx(classes.flexRow)}>
            {groupButtonSpeed.map((item, index) => (
              <Button
                variant="contained"
                className={clsx(classes.btn, {
                  [classes.btnActive]: speedPlay === index + 1,
                })}
                onClick={handleChangeSpeed(index + 1)}
                key={index}
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
