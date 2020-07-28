import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Typography,
  ListItem,
  Grid,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';

import { makeSelectLoading } from '@Containers/App/store/selectors';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';
import SearchLocation from '@Components/SearchLocation';
import ColorPickerModal from './FenceColorModal';
import { ADD_GEO_SCHEMA } from './schema';
import { useStyles } from './styles';

interface Props {
  isMobile: boolean;
  show: boolean;
  isRequesting?: boolean;
  t(key: string): string;
  handleClose(): void;
  [data: string]: any;
}

const GEO_SHAPE = [
  { type: 'rectangle', label: 'Square' },
  { type: 'circle', label: 'Circle' },
  { type: 'polygon', label: 'Polygon' },
];

const ADD_GEOFENCE_FORM = {
  name: '',
  type: 'rectangle',
  color: '#168449',
};

function AddGeoFence(props: Props) {
  const classes = useStyles();
  const { handleClose, isMobile, isRequesting } = props;

  const onSubmitForm = (values: any) => {
    console.log(values);
  };

  return (
    <SideBarOutside
      title="Add Geofence"
      show={props.show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
    >
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <SearchLocation />
        </div>
        <div className={classes.head}>
          <Typography
            className={clsx(classes.title1, classes.mgAuto)}
            variant="body1"
          >
            Details
          </Typography>
        </div>
        <Formik
          initialValues={ADD_GEOFENCE_FORM}
          onSubmit={onSubmitForm}
          enableReinitialize
          validationSchema={ADD_GEO_SCHEMA}
          disabled={isRequesting}
        >
          {({
            values,
            handleChange,
            errors: errorsForm,
            setFieldValue,
            handleSubmit,
            handleBlur,
            touched,
          }) => {
            return (
              <div className={classes.content}>
                <div className={classes.inputWrap}>
                  <TextInput
                    label={'Geofence Name'}
                    name="name"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    errorInput={
                      touched.name && errorsForm.name
                        ? errorsForm.name
                        : undefined
                    }
                    variant="outlined"
                  />
                </div>
                <div className={classes.block}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    Geo-Fence Shape
                  </Typography>
                  <Grid container direction="row" className={classes.grid}>
                    {GEO_SHAPE.map(s => (
                      <ListItem
                        button
                        key={s.type}
                        onClick={() => {
                          setFieldValue('type', s.type);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            className={clsx(classes.avatar, {
                              [classes.avtActive]: values.type === s.type,
                            })}
                          >
                            <img
                              src={`/images/geo_${s.type}${
                                values.type === s.type ? '_active' : ''
                              }.svg`}
                              alt=""
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={s.label}
                          className={clsx(classes.text)}
                        />
                      </ListItem>
                    ))}
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    Geo-Fence Color
                  </Typography>
                  <div className={classes.pickColor}>
                    <ColorPickerModal
                      selectedColor={values.color}
                      onChangeColor={(c: string) => setFieldValue('color', c)}
                    />
                  </div>
                </div>
                <div className={clsx(classes.head, classes.block)}>
                  <Typography className={clsx(classes.title1)} variant="body1">
                    Geo-Fence Size
                  </Typography>
                </div>
                <div className={classes.geoSize}>
                  <Typography>Width: 984 m</Typography>
                  <Typography>Height: 1984 m</Typography>
                </div>
                <div className={classes.saveBtnWrap}>
                  <Button
                    text={'Save'}
                    onClick={handleSubmit}
                    color="primary"
                    fullWidth
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

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddGeoFence);
