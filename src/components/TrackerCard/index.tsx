import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

import { GoPrimitiveDot } from 'react-icons/go';
import {
  Settings as SettingsIcon,
  Done as DoneIcon,
} from '@material-ui/icons/';
import {
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
  ImageWrapper,
  ListItemStyle,
} from './styles';
import { ITracker } from '@Interfaces';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

interface Props {
  tracker: ITracker;
  isMobile?: boolean;
  isChecked?: boolean;
  isTracking?: boolean;
  onClickTracker?(id: number): void;
  onClickSetting?: any;
}

export default function TrackerCard(props: Props) {
  const classes = useStyles();
  const {
    tracker,
    isMobile = false,
    onClickTracker,
    isChecked,
    onClickSetting,
  } = props;

  const handleClick = () => {
    if (onClickTracker) {
      onClickTracker(tracker.device_id);
      if (tracker.lat && tracker.lng && window.mapEvents) {
        const option =
          window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
        const mapOption = window.mapFullWidth ? {} : option;
        window.mapEvents.setFitBounds([tracker], mapOption);
      }
    }
  };

  const handleClickSetting = () => {
    onClickSetting(tracker.device_id);
  };

  return (
    <ListItemStyle
      button
      key={tracker.device_id}
      className={clsx(isMobile ? classes.padding : classes.nonePadding, {
        [classes.noClick]: !onClickTracker,
      })}
    >
      <Item onClick={handleClick}>
        <ImageWrapper>
          <Image src={tracker.icon_url || '/images/image-device.png'} alt="" />
        </ImageWrapper>
        <ItemInfo>
          <Name>{tracker.device_name}</Name>
          <Time>
            <GoPrimitiveDot className={classes.icon} />
            <TimeActive>
              Last Updated:{' '}
              {tracker.time ? moment(tracker.time * 1000).fromNow() : '--'}
            </TimeActive>
          </Time>
        </ItemInfo>
      </Item>
      <CardDetail>
        {isChecked ? (
          <DoneIcon className={classes.iconDone} />
        ) : isMobile ? (
          <SettingsIcon
            className={classes.iconSetting}
            onClick={handleClickSetting}
          />
        ) : null}
      </CardDetail>
    </ListItemStyle>
  );
}
