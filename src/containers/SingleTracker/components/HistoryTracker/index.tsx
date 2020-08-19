import React, { useState } from 'react';
import { Formik } from 'formik';

import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import SelectOption from '@Components/selections';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { Container, Title, SelectGroup, Content, useStyles } from './styles';
import { HISTORY_OPTIONS } from '@Containers/SingleTracker/store/constants';

interface Props {
  handleClose(): void;
  t(key: string): string;
  isMobile: boolean;
  show: boolean;
  isRequesting?: boolean;
  onClickViewHistory(): void;
}

function HistoryTracker(props: Props) {
  const classes = useStyles();
  const {
    handleClose,
    t,
    isMobile,
    show,
    isRequesting,
    onClickViewHistory,
  } = props;
  const onSubmitForm = () => {
    console.log('xxxxY');
    //draft setHistory
    setHistory({
      map_view: true,
      seven_day_report: false,
      alert_history_report: false,
      history_option: HISTORY_OPTIONS[0].value,
    });
  };
  const [history, setHistory] = useState({
    map_view: true,
    seven_day_report: false,
    alert_history_report: false,
    history_option: HISTORY_OPTIONS[0].value,
  });
  return (
    <SideBarOutside
      title={t('tracker:history')}
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
      isLogo={isMobile}
    >
      <Container>
        <Title>{t('tracker:history_type_of_view')}</Title>
        <Formik
          initialValues={history}
          onSubmit={onSubmitForm}
          enableReinitialize
          disabled={isRequesting}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            handleBlur,
          }) => {
            return (
              <Content onSubmit={handleSubmit}>
                <SelectGroup>
                  <RadioGroup
                    // value={values.speed_limit.unit || 'kmp'}
                    style={{ flexDirection: 'column' }}
                  >
                    <FormControlLabel
                      value="map_view"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_map_view')}
                      className={classes.fontSize}
                    />
                    <FormControlLabel
                      value="seven_day_report"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_7_day_report')}
                      className={classes.fontSize}
                    />
                    <FormControlLabel
                      value="alert_history_report"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_alert_report')}
                      className={classes.fontSize}
                    />
                  </RadioGroup>
                </SelectGroup>
                <SelectOption
                  name="history_option"
                  options={HISTORY_OPTIONS}
                  label={t('tracker:history_view_option')}
                  value={values.history_option}
                  onChangeOption={handleChange('history_option')}
                />
                <Button
                  className={`${classes.btn} ${classes.margin}`}
                  variant="outlined"
                  isLoading={isRequesting}
                  text="View History"
                  type="submit"
                  onClick={onClickViewHistory}
                />
              </Content>
            );
          }}
        </Formik>
      </Container>
    </SideBarOutside>
  );
}

export default HistoryTracker;
