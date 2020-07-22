import React from 'react';
import { Switch, Paper, IconButton, Menu, MenuItem } from '@material-ui/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import clsx from 'clsx';

import {
  useStyles,
  Content,
  Image,
  ImageWrapper,
  ItemInfo,
  Name,
  Actions,
  Status,
} from './styles';

interface Props {
  geofence: {
    id: number;
    name: string;
    type: string;
    enabled: boolean;
    status: string;
  };
  selectedGeofenceId?: number | string | null;
  selectGeofence(id: number | string): void;
  updateGeofence(id: number, data: object): void;
}

export default function GeofenceCard(props: Props) {
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(
    null
  );
  const {
    geofence,
    selectGeofence,
    updateGeofence,
    selectedGeofenceId,
  } = props;
  const classes = useStyles();
  const isActive = selectedGeofenceId === geofence.id;
  const isDisabled = geofence.status === 'inactive';

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenuEl(null);
  };

  const onSelectGeofence = () => {
    !isDisabled && selectGeofence(geofence.id);
  };

  const toggleGeofence = () =>
    updateGeofence(geofence.id, { enabled: !geofence.enabled });

  const editGeofence = () => {
    console.log('editGeofence');
    closeMenu();
  };

  const addGeofenceToDevice = () => {
    console.log('addGeofenceToDevice');
    closeMenu();
  };

  const deleteGeofence = () => {
    console.log('deleteGeofence˝');
    closeMenu();
  };

  return (
    <Paper
      key={geofence.id}
      className={clsx(classes.paper, { [classes.active]: isActive })}
    >
      <Content disabled={isDisabled}>
        <ImageWrapper active={isActive} disabled={isDisabled}>
          <Image
            src={`/images/geo_${geofence.type}${isActive ? '_active' : ''}.svg`}
            alt=""
            onClick={onSelectGeofence}
          />
        </ImageWrapper>
        <Name
          onClick={onSelectGeofence}
          active={isActive}
          disabled={isDisabled}
        >
          {geofence.name}
        </Name>
      </Content>
      <Actions>
        {isDisabled && <Status>Deactived</Status>}
        <ItemInfo>
          <Switch
            name="active"
            checked={!!geofence.enabled}
            onChange={toggleGeofence}
            color="primary"
            disabled={isDisabled}
          />
        </ItemInfo>
        <IconButton className={classes.iconBtn} size="small" onClick={openMenu}>
          <BsThreeDotsVertical className={classes.dots} />
        </IconButton>
      </Actions>
      <Menu
        anchorEl={anchorMenuEl}
        keepMounted
        open={Boolean(anchorMenuEl)}
        onClose={closeMenu}
        MenuListProps={{ className: classes.menuList }}
        className={classes.menuRoot}
      >
        <MenuItem className={classes.menuItem} onClick={editGeofence}>
          Edit Geo-fence
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={addGeofenceToDevice}>
          Add Device
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={deleteGeofence}>
          Delete this Fence
        </MenuItem>
      </Menu>
    </Paper>
  );
}
