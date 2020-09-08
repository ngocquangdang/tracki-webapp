import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  TextBold,
  SelectForm,
  SelectMessage,
  MessageItem,
  TypeMessage,
  Date,
  Price,
  ContentMessageItem,
  useStyles,
} from './styles';

interface Props {
  onClickItemMessage(dataMessaga, selectCountry): void;
  t(key: string): string;
  countryCode?: CountryCode;
  countryCodeFollow?: DataCountry;
}

interface CountryCode {
  countryCode: number;
  description: string | null;
  groupId: number | null;
  operatorId: number | null;
  shortName: string | null;
}

interface DataCountry {
  currency: string;
  groupId: string;
  planId: number;
  price: string;
  smsLimit: string;
}

function SubscriptionStep1(props) {
  const {
    onUpdateStep,
    t,
    countryCode,
    countryCodeFollow,
    getCountryCodeFollowRequest,
    isRequesting,
    updateSubscriptionStore,
    formData,
  } = props;

  const classes = useStyles();
  const [dataCountry, setDataCountry] = useState<CountryCode[]>([]);
  const [dataMessage, setDataMessage] = useState<DataCountry[]>([]);

  useEffect(() => {
    setDataCountry(countryCode);
  }, [countryCode]);

  useEffect(() => {
    setDataMessage(countryCodeFollow);
  }, [countryCodeFollow]);

  const handleChange = event => {
    // setCode(event.target.value);
    getCountryCodeFollowRequest(event.target.value);
    updateSubscriptionStore({
      ...formData,
      country: dataCountry.find(i => i.countryCode === event.target.value),
    });
  };

  const onClickItemMessageHandle = selectedPlan => () => {
    updateSubscriptionStore({ ...formData, selectedPlan });
    onUpdateStep(2);
  };

  return (
    <>
      <TextBold isChoose={true}>
        {t('subscription:choose_country_code')}
      </TextBold>
      <SelectForm variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>
          {t('subscription:select_country_code')}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData?.country?.countryCode || ''}
          onChange={handleChange}
          label="Select Country Code"
          className={classes.select}
        >
          {dataCountry &&
            dataCountry.length > 0 &&
            dataCountry.map(item => (
              <MenuItem
                value={item.countryCode}
                className={classes.menuItem}
                key={item.countryCode}
              >
                {item.description}
              </MenuItem>
            ))}
        </Select>
      </SelectForm>
      <SelectMessage>
        <TextBold isChoose={false}>
          {formData.subscriptionType === 'sms'
            ? t('subscription:select_monthly_alert')
            : 'Fast Tracking limit'}
        </TextBold>
        <ContentMessageItem>
          {isRequesting ? (
            <CircularProgress className={classes.circular} />
          ) : (
            dataMessage &&
            dataMessage.length > 0 &&
            dataMessage.map(item => (
              <MessageItem
                key={item.planId}
                onClick={onClickItemMessageHandle(item)}
              >
                <TypeMessage>{item.smsLimit} SMS</TypeMessage>
                <Date>{t('subscription:monthly')}</Date>
                <Price>
                  {item.price}
                  {''} {item.currency}
                </Price>
              </MessageItem>
            ))
          )}
        </ContentMessageItem>
      </SelectMessage>
    </>
  );
}

export default SubscriptionStep1;
