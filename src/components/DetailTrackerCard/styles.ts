import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const TrackerInfomation = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '#fff' : '#fafafa'};
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'none' : '1px solid #e0e0e0'};
  font-family: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'Open Sans, san-serif' : 'Roboto'};
  border-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '4px' : ''};
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
  font-family: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'Open Sans, san-serif' : 'Roboto'};
  border-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '4px' : ''};
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
  flex: 2.5;
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
    props.isMobile ? '13px 10.5px' : '6px 12px'};
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '1px solid #e0e0e0' : 'none'};
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
  margin-right: 4px;
`;
const ImageWrapper = styled.div`
  width: 50px;
  border-radius: 25px;
  height: 50px;
  display: flex;
  background: #168449;
  margin-right: 16px;
`;
const Image = styled.img`
  width: 34px;
  height: 34px;
  margin: auto;
  object-fit: contain;
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
const IconBattery = styled.img`
  width: 11 px;
  height: 14px;
  object-fit: contain;
`;
const IconZoom = styled.img`
  margin-top: 12px;
`;
const useStyles = makeStyles(theme => ({
  textBold: {
    fontWeight: 600,
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
  iconLocationMobile: {
    color: '#e60000',
    width: '25px',
    height: '25px',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  rightIcon: {
    width: '20px',
    height: '27px',
    objectFit: 'contain',
    color: '#999999',
    paddingBottom: '8px',
  },
  iconRefresh: {
    fontSize: '24px',
    color: '#666666',
  },
  skeContainer: {
    margin: 10,
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
  IconBattery,
  StatusTracker,
  ConnectionTracker,
  Connection,
  Address,
  LocationApprox,
  Text,
  TextName,
  RightItem,
  LeftItem,
  ImageWrapper,
  Image,
  ItemInfo,
  Name,
  LatLong,
  LatText,
  LongText,
  IconZoom,
  useStyles,
};
