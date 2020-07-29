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

const DEVICES_LINKED = [
  { id: 1, device_name: 'xxx' },
  { id: 2, device_name: 'xxx' },
  { id: 3, device_name: 'xxx' },
  { id: 4, device_name: 'xxx' },
  { id: 5, device_name: 'xxx' },
  { id: 6, device_name: 'xxx' },
];

function SelectTrackers(props: Props) {
  const classes = useStyles();
  const [devicesLinked, setDevicesLinked] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const { onClose, isMobile, isRequesting, t } = props;

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
    console.log('handleSave', devicesLinked);
  };

  const trackerFiltered = DEVICES_LINKED.filter(i =>
    i.device_name.includes(search)
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
            {trackerFiltered.map(d => (
              <ListItem button key={d.id} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <img src={`/images/tracki-device.png`} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={d.device_name}
                  className={classes.text}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    color="primary"
                    checked={devicesLinked.includes(d.id)}
                    onChange={checkLinkTracker(d.id)}
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
