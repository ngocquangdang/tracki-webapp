import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const TrackerInfomation = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '#fff' : '#fafafa'};
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'none' : '1px solid #e0e0e0'};
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
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '' : '0 32px 20px 12px'};
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
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '13px 10.5px' : '17px 0 24px 13px;'};
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '1px solid #e0e0e0' : 'none'};
  align-items: center;
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
const LeftItem = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconRed = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 1px #ae0000;
  display: flex;
  background: #e60000;
  margin: 5px;
`;
const ItemInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 172px;
`;
const Name = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0;
  font-size: 14px;
`;
const LatLong = styled.div`
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.25);
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #1a1a1a;
`;
const LatText = styled.span``;
const LongText = styled.span`
  padding-left: 15px;
`;
const Footer = styled.div`
  padding: 0 15px 15px 15px;
`;
const ControlButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StatusSpeed = styled.div`
  display: flex;
  align-items: center;
`;
const InfoStatusTracker = styled.div``;
const TextStatus = styled.span`
  font-weight: bold;
`;
const TimeStatus = styled.span``;
const ControlText = styled.div`
  line-height: 2.36;
  font-size: 14px;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.25);
`;
const useStyles = makeStyles(theme => ({
  textBold: {
    fontWeight: 500,
  },
  textSpace: {
    marginLeft: '8px',
    fontSize: '12px',
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
  btn: {
    backgroundColor: '#f5f5f5',
    margin: '1rem 0',
    color: '#4b4f56',
    width: '48%',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 500,
    boxShadow: '0 2px 4px 0 #ccd0d5',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  iconArrow: {
    color: '#4b4f56',
    fontSize: '25px',
  },
  iconStop: {
    width: '9px',
    height: '10px',
    border: 'solid 1px #ae0000',
    backgroundColor: '#e60000',
    borderRadius: '50%',
    display: 'flex',
    marginRight: '7px',
  },
  iconSpeed: {
    width: '9px',
    height: '10px',
    border: 'solid 1px #cfcf00',
    backgroundColor: '#fdfd02',
    borderRadius: '50%',
    display: 'flex',
    marginRight: '7px',
  },
  stop: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '11px',
  },
  textIcon: {
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.25)',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.21',
    letterSpacing: 'normal',
    color: '#1a1a1a',
  },
}));
export {
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
  LeftItem,
  IconRed,
  ItemInfo,
  Name,
  LatLong,
  LatText,
  LongText,
  ControlButton,
  StatusSpeed,
  Footer,
  InfoStatusTracker,
  TextStatus,
  TimeStatus,
  ControlText,
  useStyles,
};
