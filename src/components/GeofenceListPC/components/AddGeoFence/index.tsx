import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import {
  Typography,
  ListItem,
  Grid,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';

import { IGeofence } from '@Interfaces';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';
import SearchLocation from '@Components/SearchLocation';
import ColorPickerModal from '../PickerColor';
import { ADD_GEO_SCHEMA } from './schema';
import { useStyles } from './styles';
import { GEOFENCE_DEFAULT } from '../../constant';
import { getSizeOfGefence } from '@Components/Maps/Leaflet/components/Helpers';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  isMobile?: boolean;
  show: boolean;
  isRequesting?: boolean;
  selectedGeofence?: IGeofence;
  newGeofence: IGeofence;
  t(key: string, format?: object): string;
  changeMapAction(action: string): void;
  resetNewGeofenceAction(): void;
  updateNewGeofence(data: object): void;
  updateGeofence(id: number, data: object): void;
  saveGeofenceRequestAction(id: number, data: object): void;
  createNewGeofenceRequestAction(geofence: object): void;
  handleClose(): void;
  [data: string]: any;
}

const GEO_SHAPE = ['rectangle', 'circle', 'polygon'];

function AddGeoFence(props: Props) {
  const classes = useStyles();
  const {
    isMobile,
    isRequesting,
    selectedGeofence,
    newGeofence,
    t,
    handleClose,
    createNewGeofenceRequestAction,
    saveGeofenceRequestAction,
    updateGeofence,
    updateNewGeofence,
    changeMapAction,
    resetNewGeofenceAction,
  } = props;
  const [formData, updateFormData] = useState(newGeofence);
  const [cloneSelectedGeofence, setCloneGeofence] = useState(selectedGeofence);

  useEffect(() => {
    if (!cloneSelectedGeofence) {
      setCloneGeofence(selectedGeofence);
      firebaseLogEventRequest('edit_geofence', '');
    }
    if (newGeofence) {
      firebaseLogEventRequest('add_geofence', '');
    }
    const newData = {
      ...GEOFENCE_DEFAULT,
      ...selectedGeofence,
      ...newGeofence,
    };
    updateFormData(newData);
  }, [selectedGeofence, newGeofence, cloneSelectedGeofence]);

  const onSubmitForm = (values: any) => {
    if (selectedGeofence) {
      saveGeofenceRequestAction(selectedGeofence.id, values);
      firebaseLogEventRequest('edit_geofence', 'update_clone_geofence');
    } else {
      createNewGeofenceRequestAction({ ...newGeofence, name: values.name });
      firebaseLogEventRequest('add_geofence', 'create_new_geofence');
    }
    handleClose();
    changeMapAction('DEFAULT');
  };

  const removeGeofence = (id: number) => {
    if (window.geosDrawn[id]) {
      window.mapEvents.map.mapApi.removeLayer(window.geosDrawn[id]);
      delete window.geosDrawn[id];
    }
  };

  const onCloseAdd = () => {
    if (newGeofence) {
      firebaseLogEventRequest('add_geofence', 'cancel_new_geofence');
      removeGeofence(newGeofence.id);
      resetNewGeofenceAction();
    }
    if (cloneSelectedGeofence) {
      firebaseLogEventRequest('edit_geofence', 'edit_geofence');
      removeGeofence(cloneSelectedGeofence.id);
      updateGeofence(cloneSelectedGeofence.id, cloneSelectedGeofence);
    }
    changeMapAction('DEFAULT');
    handleClose();
  };

  const onChangeTypeGeofence = (type: string) => () => {
    firebaseLogEventRequest('add_geofence', `geofence_${type}_shape`);
    const newAction = `create_${type}`.toUpperCase();
    changeMapAction(newAction);
    if (selectedGeofence && selectedGeofence.type !== type) {
      removeGeofence(selectedGeofence.id);
      return updateGeofence(selectedGeofence.id, {
        type,
        preferences: { trigger: 'BOTH' },
      });
    }
    updateNewGeofence({ type, preferences: { trigger: 'BOTH' } });
  };

  const onChangeColorGeofence = (color: string) => {
    firebaseLogEventRequest('add_geofence', `select_geofence_color_${color}`);

    // update color
    if (selectedGeofence && selectedGeofence.color !== color) {
      removeGeofence(selectedGeofence.id);
    } else if (newGeofence.color !== color) {
      removeGeofence(newGeofence.id);
    }

    selectedGeofence
      ? updateGeofence(selectedGeofence.id, { color })
      : updateNewGeofence({ color });
  };

  const { width, height } = getSizeOfGefence(selectedGeofence || newGeofence);

  return (
    <SideBarOutside
      title={
        selectedGeofence
          ? t('tracker:edit_geofence')
          : t('tracker:add_geofence')
      }
      show={props.show}
      direction="right"
      handleClose={onCloseAdd}
      isMobile={isMobile || false}
    >
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <SearchLocation t={t} />
        </div>
        <div className={classes.head}>
          <Typography
            className={clsx(classes.title1, classes.mgAuto)}
            variant="body1"
          >
            {t('tracker:details')}
          </Typography>
        </div>
        <Formik
          initialValues={formData}
          onSubmit={onSubmitForm}
          enableReinitialize
          validationSchema={ADD_GEO_SCHEMA}
          disabled={isRequesting}
        >
          {({
            values,
            handleChange,
            errors: errorsForm,
            handleSubmit,
            handleBlur,
            touched,
          }) => {
            return (
              <div className={classes.content}>
                <div className={classes.inputWrap}>
                  <TextInput
                    label={t('tracker:geofence_name')}
                    name="name"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    errorInput={
                      touched.name && errorsForm.name
                        ? t('auth:' + errorsForm.name)
                        : undefined
                    }
                    variant="outlined"
                  />
                </div>
                <div className={classes.block}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    {t('tracker:geofence_shape')}
                  </Typography>
                  <Grid container direction="row" className={classes.grid}>
                    {GEO_SHAPE.map(type => (
                      <ListItem
                        button
                        key={type}
                        onClick={onChangeTypeGeofence(type)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            className={clsx(classes.avatar, {
                              [classes.avtActive]: values.type === type,
                            })}
                          >
                            <img
                              src={`/images/geo_${type}${
                                values.type === type ? '_active' : ''
                              }.svg`}
                              alt=""
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={t(`tracker:geofence_${type}`)}
                          className={clsx(classes.text)}
                        />
                      </ListItem>
                    ))}
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    {t('tracker:geofence_color')}
                  </Typography>
                  <div className={classes.pickColor}>
                    <ColorPickerModal
                      selectedColor={values.color}
                      onChangeColor={onChangeColorGeofence}
                    />
                  </div>
                </div>
                <div className={clsx(classes.head, classes.block)}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    {t('tracker:geofence_size')}
                  </Typography>
                </div>
                <div className={classes.geoSize}>
                  <Typography>
                    {t('tracker:geofence_width', { text: width + ' m' })}
                  </Typography>
                  <Typography>
                    {t('tracker:geofence_height', { text: height + ' m' })}
                  </Typography>
                </div>
                <div className={classes.saveBtnWrap}>
                  <Button
                    text={
                      selectedGeofence ? t('common:update') : t('common:save')
                    }
                    onClick={handleSubmit}
                    color="primary"
                    fullWidth
                    isLoading={isRequesting}
                    variant="contained"
                  />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </SideBarOutside>
  );
}

export default AddGeoFence;
