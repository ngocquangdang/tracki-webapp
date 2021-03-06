import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Avatar,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Formik } from 'formik';
import clsx from 'clsx';

import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';
import {
  GEOFENCE_DEFAULT,
  GEO_SHAPES,
} from '@Components/GeofenceListPC/constant';
import { IGeofence, ITracker } from '@Interfaces';
import { ADD_GEO_SCHEMA } from '@Components/GeofenceListPC/components/AddGeoFence/schema';
import ColorPickerModal from '@Components/GeofenceListPC/components/PickerColor';
import { useStyles } from './styles';

interface Props {
  newGeofence: IGeofence;
  selectedGeofence: IGeofence;
  isRequesting: boolean;
  mapAction: string;
  tracker: ITracker;
  t(key: string, format?: object): string;
  onSaveRequest(data: object): void;
  changeMapAction(mapAction: string): void;
  updateGeofence(id: number, data: object): void;
  updateNewGeofence(data: object): void;
}

function GeofenceCard(props: Props) {
  const classes = useStyles();
  const {
    isRequesting,
    newGeofence,
    selectedGeofence,
    mapAction,
    tracker,
    t,
    changeMapAction,
    updateGeofence,
    updateNewGeofence,
    onSaveRequest,
  } = props;
  const [formData, updateFormData] = useState(
    newGeofence || selectedGeofence || GEOFENCE_DEFAULT
  );
  const [cloneSelectedGeofence, setCloneGeofence] = useState(selectedGeofence);
  const [isLinkedTracker, setIsLinkedTracker] = useState(true);

  useEffect(() => {
    if (!cloneSelectedGeofence) {
      setCloneGeofence(selectedGeofence);
    }

    const newData = {
      ...GEOFENCE_DEFAULT,
      ...selectedGeofence,
      ...newGeofence,
    };
    updateFormData(newData);
  }, [selectedGeofence, newGeofence, cloneSelectedGeofence]);

  const removeGeofence = (id: number) => {
    if (window.geosMobile[id]) {
      window.geoMapMobile.removeLayer(window.geosMobile[id]);
      delete window.geosMobile[id];
    }
  };

  const onSubmit = values => {
    onSaveRequest({
      ...values,
      isLinked: isLinkedTracker,
      trackerId: tracker.device_id,
    });
  };

  const onChangeLinkedTracker = () => setIsLinkedTracker(!isLinkedTracker);

  const onChangeTypeGeofence = (type: string) => () => {
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

  return (
    <React.Fragment>
      <div className={classes.container}>
        {mapAction === 'CREATE_POLYGON' && (
          <div className={classes.createInfo}>
            <Typography>{t('tracker:create_polygon_info')}</Typography>
          </div>
        )}
        <Formik
          initialValues={formData}
          onSubmit={onSubmit}
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
              <div className={classes.formContent}>
                <div className={clsx(classes.inputWrap, classes.inputWrap2)}>
                  <Typography className={classes.inputLabel}>Name</Typography>
                  <TextInput
                    placeholder={t('tracker:enter_geofence_name')}
                    name="name"
                    classes={{ root: classes.inputRoot }}
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
                <div className={clsx(classes.inputWrap, classes.border)}>
                  <Typography className={classes.inputLabel}>
                    {t('tracker:shape')}
                  </Typography>
                  <Grid container direction="row" className={classes.grid}>
                    {GEO_SHAPES.map(type => (
                      <Avatar
                        key={type}
                        className={clsx(classes.avatar, {
                          [classes.avtActive]: values.type === type,
                        })}
                        onClick={onChangeTypeGeofence(type)}
                      >
                        <img
                          src={`/images/geo_${type}${
                            values.type === type ? '_active' : ''
                          }.svg`}
                          alt=""
                        />
                      </Avatar>
                    ))}
                  </Grid>
                </div>
                <div className={classes.inputWrap}>
                  <Typography className={classes.inputLabel}>
                    {t('tracker:color')}
                  </Typography>
                  <ColorPickerModal
                    selectedColor={values.color}
                    onChangeColor={onChangeColorGeofence}
                  />
                </div>
                <div className={classes.checkboxWrap}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isLinkedTracker}
                        onChange={onChangeLinkedTracker}
                        color="primary"
                      />
                    }
                    label={t('tracker:link_geofence_to', {
                      text: tracker.device_name,
                    })}
                  />
                </div>
                <div className={classes.saveBtnWrap}>
                  <Button
                    text={t('tracker:save_geofence')}
                    onClick={handleSubmit}
                    color="primary"
                    fullWidth
                    id="createGeoMobileBtn"
                    isLoading={isRequesting}
                    variant="contained"
                  />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default GeofenceCard;
