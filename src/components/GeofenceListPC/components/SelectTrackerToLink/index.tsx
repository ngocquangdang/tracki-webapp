import React, { useState } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';

import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';
import { useStyles } from './styles';

interface Props {
  isMobile?: boolean;
  show: boolean;
  isRequesting?: boolean;
  t(key: string, format?: object): string;
  onClose(): void;
  [data: string]: any;
}

function SelectTrackers(props: Props) {
  const classes = useStyles();
  const [devicesLinked, setDevicesLinked] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const { onClose, isMobile, isRequesting, t, onSave, trackers } = props;

  const checkLinkTracker = (deviceId: number) => () => {
    let newList: number[] = [];
    if (devicesLinked.includes(deviceId)) {
      newList = devicesLinked.filter(i => i !== deviceId);
    } else {
      newList = [...devicesLinked, deviceId];
    }
    setDevicesLinked(newList);
  };

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSave = () => {
    onSave(devicesLinked);
  };

  const trackerFiltered = Object.values(trackers).filter(
    (i: any) =>
      i.device_name.toLowerCase().includes(search.toLowerCase()) ||
      i.device_id.toString().includes(search.toLowerCase())
  );

  return (
    <SideBarOutside
      title={t('tracker:select_trackers_to_link')}
      show={props.show}
      direction="right"
      isBackable
      handleClose={onClose}
      isMobile={isMobile || false}
    >
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <TextInput
            value={search}
            onChange={onChangeSearch}
            label={t('tracker:search_tracker_by_name_id')}
            variant="outlined"
          />
        </div>
        <div className={classes.content}>
          <div className={classes.listDevice}>
            {trackerFiltered.map((d: any) => (
              <ListItem button key={d.device_id} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <img
                      src={d.icon_url || '/images/tracki-device.png'}
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={d.device_name}
                  className={classes.text}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    color="primary"
                    checked={devicesLinked.includes(d.device_id)}
                    onChange={checkLinkTracker(d.device_id)}
                    className={classes.unlinkBtn}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </div>
        </div>
        <div className={classes.saveBtnWrap}>
          <Button
            text={t('tracker:link')}
            onClick={handleSave}
            color="primary"
            fullWidth
            isLoading={isRequesting}
            variant="contained"
          />
        </div>
      </div>
    </SideBarOutside>
  );
}

export default SelectTrackers;
