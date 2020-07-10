import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

import {
  Container,
  Content,
  Footer,
  // SearchInput,
  // TextInput,
  ListItem,
  Card,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';

export default function ListTracker() {
  const classes = useStyles();

  return (
    <Container>
      <Content>
        {/* <SearchInput>
          <TextInput
            placeholder="&#xf002; Search devices by name or ID"
            variant="outlined"
            color="secondary"
            type="search"
            InputProps={{ classes: { input: classes.input } }}
          />
        </SearchInput> */}
        <ListItem>
          <Card>
            <Item>
              <Image src="images/tracki-device.png" alt="" />
              <ItemInfo>
                <Name>Steve Rodgers truck</Name>
                <Time>
                  <GoPrimitiveDot className={classes.icon} />
                  <TimeActive>Last Updated: 3 days ago</TimeActive>
                </Time>
              </ItemInfo>
            </Item>
            <CardDetail>
              <BsThreeDotsVertical />
            </CardDetail>
          </Card>
          <Card>
            <Item>
              <Image src="images/tracki-device.png" alt="" />
              <ItemInfo>
                <Name>Steve Rodgers truck</Name>
                <Time>
                  <GoPrimitiveDot className={classes.icon} />
                  <TimeActive>Last Updated: 3 days ago</TimeActive>
                </Time>
              </ItemInfo>
            </Item>
            <CardDetail>
              <BsThreeDotsVertical />
            </CardDetail>
          </Card>
        </ListItem>
      </Content>
      <Footer>
        <Button
          classes={`${classes.btn}`}
          text="Add Tracker"
          color="primary"
          type="submit"
          startIcon={<FiPlus />}
        />
      </Footer>
    </Container>
  );
}
