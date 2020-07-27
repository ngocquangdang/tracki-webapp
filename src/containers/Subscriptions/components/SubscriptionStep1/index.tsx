import React, { useEffect, useCallback, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
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
  onClickItemMessage(): void;
}

function SubscriptionStep1(props: Props) {
  const { onClickItemMessage } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [dataCountry, setDataCountry] = useState([
    {
      countryCode: 1,
      description: 'USA/Canada (+1)',
      groupId: 1,
      operatorId: 1,
      shortName: 'USA',
    },
  ]);

  const [dataMessage, setDataMessage] = useState([
    {
      currency: 'USD',
      groupId: 1,
      planId: 24,
      price: 2.95,
      smsLimit: 25,
    },
  ]);
  const [code, setCode] = useState(1);

  const handleChange = event => {
    setCode(event.target.value);
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
    callApiGetCountryCodeFollowCode();
  }, [callApiGetCountryCodeFollowCode, code]);

  return (
    <>
      <TextBold isChoose={true}>Choose a country code for text alerts</TextBold>
      <SelectForm variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>
          Select Country Code
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
        <TextBold isChoose={false}>Select Monthly text alert lmit</TextBold>
        <ContentMessageItem>
          {loading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            dataMessage.map(item => (
              <MessageItem key={item.planId} onClick={onClickItemMessage}>
                <TypeMessage>{item.smsLimit} SMS</TypeMessage>
                <Date>Monthly</Date>
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
