import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  opacity: 0.95;
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  margin: 10px 6px;
  position: relative;
  top: calc(100% - 153px);
  @media (max-width: 320px) {
    top: calc(100% - 173px);
  }
`;
const TrackerInfomation = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  cursor: pointer;
`;
const Address = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  display: flex;
  flex-direction: row;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
`;
const TrackerStatus = styled.div`
  display: flex;
  height: 52px;
  background-color: #ffffff;
  flex-direction: row;
  font-size: 12px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e0e0e0;
`;
const LocationApprox = styled.span``;
const Connection = styled.div``;
const BatteryTracker = styled.div`
  border-right: 1px solid #e0e0e0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.75;
`;
const StatusTracker = styled.div`
  flex: 1;
  border-right: 1px solid #e0e0e0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const ConnectionTracker = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  text-align: center;
`;
const TextName = styled.span``;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 13px 10.5px;
  border-bottom: 1px solid #fafafa;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b7b7b7;
  margin-left: -3px;
`;

const TimeActive = styled.span`
  font-size: 12px;
  color: #b7b7b7;
`;
const RightItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const useStyles = makeStyles(theme => ({
  input: {
    '&::placeholder': {
      textAlign: 'center',
    },
  },
  btn: {
    backgroundColor: '#f5f5f5',
    margin: '1rem 0',
    color: '#666666',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  textBold: {
    fontWeight: 500,
  },
  textSpace: {
    marginLeft: '8px',
    fontSize: '12px',
  },
  iconSetting: {
    color: '#666666',
  },
  iconLocation: {
    width: '20px',
    height: '22px',
    color: '#cc2c2c',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  iconBack: {
    width: '20px',
    height: '20px',
  },
  rightIcon: {
    width: '20px',
    height: '27px',
    objectFit: 'contain',
    color: '#999999',
    paddingBottom: '8px',
  },
}));
export {
  Container,
  Card,
  Item,
  Time,
  TimeActive,
  TrackerInfomation,
  TrackerStatus,
  BatteryTracker,
  StatusTracker,
  ConnectionTracker,
  Connection,
  Address,
  LocationApprox,
  Text,
  TextName,
  RightItem,
  LeftItem,
  useStyles,
};
