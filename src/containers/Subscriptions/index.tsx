import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InfoIcon from '@material-ui/icons/Info';
import { Button } from '@Components/buttons';

import {
  Container,
  Header,
  Content,
  Logo,
  WrapTitle,
  Title,
  SubTitle,
  TextSub,
  TextNormal,
  TextBold,
  MainContent,
  SelectForm,
  useStyles,
} from './styles';

function Subscription() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <Container>
      <Header>
        <Link href="/trackers">
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text="Back"
          />
        </Link>
        <Link href="/">
          <Logo src="/images/logo.png" className={classes.logo2} alt="" />
        </Link>
      </Header>
      <Content>
        <WrapTitle>
          <Title>Increase Monthly Text Alert Limit</Title>
          <SubTitle>
            <InfoIcon className={classes.infoIcon} />
            <TextSub>
              <TextNormal>This month you used: </TextNormal>
              <TextBold isTitle>0 out of 30 text alerts</TextBold>
            </TextSub>
          </SubTitle>
        </WrapTitle>
        <MainContent>
          <TextBold isTitle={false}>
            Choose a country code for text alerts
          </TextBold>
          <SelectForm variant="outlined" className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>
              Select Country Code
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Select Country Code"
              className={classes.select}
            >
              <MenuItem value={10} className={classes.menuItem}>
                Ten
              </MenuItem>
            </Select>
          </SelectForm>
        </MainContent>
      </Content>
    </Container>
  );
}

export default Subscription;
