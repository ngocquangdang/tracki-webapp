import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import Router from 'next/router';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import {
  Settings as SettingsIcon,
  Done as DoneIcon,
} from '@material-ui/icons/';
import { ITracker } from '@Interfaces';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

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
  DefaultImage,
  Renew,
  TooltipStyle,
} from './styles';

interface Props {
  tracker: ITracker;
  isMobile?: boolean;
  isChecked?: boolean;
  isTracking?: boolean;
  onClickTracker?(id: number): void;
  onClickSetting?: any;
  t(key: string): string;
}

export default function TrackerCard(props: Props) {
  const classes = useStyles();
  const {
    tracker,
    isMobile = false,
    onClickTracker,
    isChecked,
    isTracking,
    onClickSetting,
    t,
  } = props;

  const handleClick = () => {
    if (onClickTracker) {
      onClickTracker(tracker.device_id);
      if (tracker.lat && tracker.lng && window.mapEvents) {
        const option =
          window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
        const mapOption = isMobile || window.mapFullWidth ? {} : option;
        window.mapEvents.setFitBounds([tracker], mapOption);
      }
    }
  };

  const handleClickSetting = () => {
    onClickSetting(tracker.device_id);
  };

  const onRenewTrackerPage = () => {
    Router.push(`/trackers/${tracker.device_id}/renew`);
  };
  return (
    <ListItemStyle
      button
      key={tracker.device_id}
      className={clsx(isMobile ? classes.padding : classes.nonePadding, {
        [classes.noClick]: !onClickTracker,
      })}
      onClick={handleClick}
    >
      <Item>
        <ImageWrapper>
          {tracker.icon_url ? (
            <Image background={tracker.icon_url} />
          ) : (
            <DefaultImage background={'/images/image-device.png'} />
          )}
        </ImageWrapper>
        <ItemInfo>
          <Name>
            {tracker.device_name !== ''
              ? tracker.device_name
              : tracker.device_id}
            <Renew
              className={
                tracker.status === 'active' ? classes.hidden : classes.show
              }
              onClick={onRenewTrackerPage}
            >
              RENEW
              <TooltipStyle
                title={
                  'Device subscription cancelled or charges were declined.'
                }
                arrow
                placement="left"
              >
                <div>
                  <FaRegQuestionCircle className={`${classes.questionIcon}`} />
                </div>
              </TooltipStyle>
            </Renew>
          </Name>
          <Time>
            <GoPrimitiveDot
              className={
                tracker.status === 'active' ? classes.icon : classes.redIcon
              }
            />
            <TimeActive>
              {t('tracker:last_update')}:{' '}
              {tracker.time ? moment(tracker.time * 1000).fromNow() : '---'}
            </TimeActive>
          </Time>
        </ItemInfo>
      </Item>
      <CardDetail>
        {isChecked && <DoneIcon className={classes.iconDone} />}
        {!isTracking && isMobile && (
          <SettingsIcon
            className={classes.iconSetting}
            onClick={handleClickSetting}
          />
        )}
      </CardDetail>
    </ListItemStyle>
  );
}
