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

interface Props {
  isMobile?: boolean;
  show: boolean;
  isRequesting?: boolean;
  selectedGeofence?: IGeofence;
  newGeofence: IGeofence;
  t(key: string, format?: object): string;
  changeMapAction(action: string): void;
  updateNewGeofence(data: object): void;
  updateGeofence(id: number, data: object): void;
  saveGeofenceRequestAction(id: number, data: object): void;
  createNewGeofenceRequestAction(geofence: object): void;
  handleClose(): void;
  [data: string]: any;
}

const GEO_SHAPE = ['rectangle', 'circle', 'polygon'];

declare global {
  interface Window {
    geosDrawn: object;
  }
}

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
  } = props;
  const [formData, updateFormData] = useState(newGeofence);

  useEffect(() => {
    const newData = {
      ...GEOFENCE_DEFAULT,
      ...selectedGeofence,
      ...newGeofence,
    };
    updateFormData(newData);
  }, [selectedGeofence, newGeofence]);

  const onSubmitForm = (values: any) => {
    selectedGeofence
      ? saveGeofenceRequestAction(selectedGeofence.id, values)
      : createNewGeofenceRequestAction({ ...newGeofence, name: values.name });
    handleClose();
  };

  const onCloseAdd = () => {
    if (newGeofence && window.geosDrawn[newGeofence.id]) {
      window.mapEvents.map.mapApi.removeLayer(window.geosDrawn[newGeofence.id]);
      window.geosDrawn[newGeofence.id] = null;
    }
    handleClose();
  };

  const onChangeTypeGeofence = (type: string) => () => {
    changeMapAction(`create_${type}`.toUpperCase());
    if (selectedGeofence && selectedGeofence.type !== type) {
      window.mapEvents.map.mapApi.removeLayer(
        window.geosDrawn[selectedGeofence.id]
      );
      delete window.geosDrawn[selectedGeofence.id];
      return updateGeofence(selectedGeofence.id, { type });
    }
    updateNewGeofence({ type });
  };

  const onChangeColorGeofence = (color: string) => {
    selectedGeofence
      ? updateGeofence(selectedGeofence.id, { color })
      : updateNewGeofence({ color });
  };

  return (
    <SideBarOutside
      title={t('tracker:add_geofence')}
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
                        ? t(errorsForm.name)
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
                    {t('tracker:geofence_width', { text: '991 m' })}
                  </Typography>
                  <Typography>
                    {t('tracker:geofence_height', { text: '1991 m' })}
                  </Typography>
                </div>
                <div className={classes.saveBtnWrap}>
                  <Button
                    text={t('common:save')}
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
