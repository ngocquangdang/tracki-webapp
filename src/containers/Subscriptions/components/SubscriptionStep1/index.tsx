import React, { useEffect, useCallback, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
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
}

function SubscriptionStep1(props: Props) {
  const { onClickItemMessage, t } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [dataCountry, setDataCountry] = useState([
    {
      countryCode: null || 1,
      description: null || 'USA/Canada (+1)',
      groupId: null || 1,
      operatorId: null || 1,
      shortName: null || 'USA',
    },
  ]);

  const [dataMessage, setDataMessage] = useState([
    {
      currency: null,
      groupId: null,
      planId: 1,
      price: null,
      smsLimit: null,
    },
  ]);
  const [code, setCode] = useState(1);

  const handleChange = event => {
    setCode(event.target.value);
  };

  const onClickItemMessageHandle = item => () => {
    const country = dataCountry.find(i => i.countryCode === code);
    onClickItemMessage(item, country);
  };

  const callApiGetCountryCode = useCallback(async () => {
    const { data } = await axios.get(
      `https://app.tracki.com/api/v3/countrycodes`
    );
    setDataCountry(data);
  }, []);

  const callApiGetCountryCodeFollowCode = useCallback(async () => {
    const { data } = await axios.get(
      `https://app.tracki.com/api/v3/country/${code}/smsoptions`
    );
    setDataMessage(data);
    setLoading(false);
  }, [code]);

  useEffect(() => {
    callApiGetCountryCode();
  }, [callApiGetCountryCode]);

  useEffect(() => {
    setLoading(true);
    callApiGetCountryCodeFollowCode();
  }, [callApiGetCountryCodeFollowCode, code]);

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
          value={code}
          onChange={handleChange}
          label="Select Country Code"
          className={classes.select}
        >
          {dataCountry.map(item => (
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
          {t('subscription:select_monthly_alert')}
        </TextBold>
        <ContentMessageItem>
          {loading ? (
            <CircularProgress className={classes.circular} />
          ) : (
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
