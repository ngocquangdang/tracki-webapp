import React, { useState } from 'react';
import Router from 'next/router';
import { FiPlus } from 'react-icons/fi';

import {
  Container,
  Content,
  Footer,
  ListItem,
  useStyles,
  Message,
} from './styles';
import { Button } from '@Components/buttons';
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';
import { firebaseLogEventRequest } from '@Utils/firebase';
import { List } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  Collapse,
  ListItemText,
  ListItem as MuiListItem,
} from '@material-ui/core';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
  onClickTracker(id: number, subAccountId: number | null): void;
  t(key: string): string;
  isFetchingTracker?: boolean;
  isFetchingSubAccount?: boolean | null;
  subAccount: {
    accounts: object;
    accountIds: number[];
  };
  getAssignmentSubAccount(
    accountId: number,
    trackerIds: number[],
    callback: (accountId: number) => void
  );
}

export default function ListDevice(props: Props) {
  const {
    trackers,
    trackerIds,
    onClickTracker,
    t,
    isFetchingTracker,
    isFetchingSubAccount,
    subAccount,
    getAssignmentSubAccount,
  } = props;

  const classes = useStyles();
  const { accounts = {}, accountIds = [] } = subAccount;
  const [accountSelected, setAccountSelected] = useState<number | null>(null);

  const onAddtracker = () => {
    firebaseLogEventRequest('trackers_page', 'add_tracker');
    Router.push('/add-tracker');
  };

  const handleClickTracker = (id: number) => {
    firebaseLogEventRequest('trackers_page', 'device_detail');
    onClickTracker(id, accountSelected);
    window.history.pushState({}, '', '/trackers/' + id);
  };

  const onSelectSubAccount = (id: number) => () => {
    if (id === accountSelected) {
      return setAccountSelected(null);
    } else {
      getAssignmentSubAccount(id, accounts[id].trackerIds, setAccountSelected);
    }
  };

  return (
    <>
      <Container>
        <Content>
          <ListItem>
            {isFetchingTracker ? (
              [1, 2].map(i => <SkeletonTracker key={i} />)
            ) : trackerIds && trackerIds.length > 0 ? (
              trackerIds.map(id => (
                // eslint-disable-next-line react/jsx-indent
                <TrackerCard
                  t={t}
                  key={id}
                  tracker={trackers[id]}
                  onClickTracker={handleClickTracker}
                />
              ))
            ) : (
              <Message>{t('tracker:no_tracker_found')}</Message>
            )}
          </ListItem>
        </Content>
        <div>
          {accountIds.map(id => (
            <List>
              <MuiListItem button onClick={onSelectSubAccount(id)}>
                <ListItemText primary={accounts[id].name} />
                {id === accountSelected ? <ExpandLess /> : <ExpandMore />}
              </MuiListItem>
              <Collapse
                in={id === accountSelected}
                timeout="auto"
                unmountOnExit
              >
                <List>
                  {isFetchingSubAccount
                    ? [1, 2].map(i => <SkeletonTracker key={i} />)
                    : accounts[id].trackerIds.map(trackerId => (
                        // eslint-disable-next-line react/jsx-indent
                        <TrackerCard
                          t={t}
                          key={trackerId}
                          tracker={accounts[id].trackers[trackerId]}
                          onClickTracker={handleClickTracker}
                        />
                      ))}
                </List>
              </Collapse>
              {/* <div>{accounts[id].name}</div> */}
            </List>
          ))}
        </div>
        <Footer>
          <Button
            classes={`${classes.btn}`}
            text="Add Tracker"
            color="primary"
            type="submit"
            startIcon={<FiPlus />}
            onClick={onAddtracker}
          />
        </Footer>
      </Container>
    </>
  );
}
