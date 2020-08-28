import styled from 'styled-components';
import { makeStyles, withStyles, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
const LocationApprox = styled.span`
  font-size: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '9px' : '12px'};
`;
const Connection = styled.div`
  font-size: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '10px' : '14px'};
`;
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
  flex: 1.75;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  text-align: center;
`;
const TextName = styled.span`
  height: auto;
  overflow-y: visible;
`;
const TextNameViewMore = styled.span`
  overflow-y: hidden;
  height: 42px;
`;
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
const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const DefaultImage = styled.div`
  width: 40px;
  height: 34px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const ItemInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 172px;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
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
const Warning = styled.div`
  text-align: center;
  margin: 0 32px 20px 12px;
  justify-content: center;
  font-size: 13px;
`;

const Renew = styled.div`
  align-items: center;
  color: white;
  background: #a41b0d;
  padding: 4px 5px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  margin-left: 7px;
  cursor: pointer;
`;
const TimeActiveMobile = styled.span`
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.25);
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.42;
  color: #1a1a1a;
`;

const useStyles = makeStyles(theme => ({
  textBold: {
    fontWeight: 600,
  },
  textSpeedPC: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textMobile: {
    marginLeft: 8,
    fontSize: 11,
    fontWeight: 'normal',
    fontFamily: 'Open Sans, san-serif',
  },
  textPC: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: 'normal',
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
    fontSize: 18,
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
  viewMore: {
    display: 'inline-block',
    color: '#168449',
  },
  iconWarning: {
    width: '14px',
    height: '14px',
    color: '#f44336',
    marginRight: 5,
  },
  show: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  redIcon: {
    color: '#f44336',
  },
  questionIcon: {
    width: 13,
    height: 13,
    marginLeft: 5,
  },
}));

const ButtonIcon = withStyles(theme => ({
  root: {
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      minWidth: 20,
    },
  },
}))(Button);

const TooltipStyle = withStyles({
  tooltip: {
    color: '#1a1a1a',
    fontSize: '15px',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  arrow: {
    color: 'white',
  },
})(Tooltip);

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
  TextNameViewMore,
  useStyles,
  ButtonIcon,
  DefaultImage,
  Warning,
  Renew,
  TooltipStyle,
  TimeActiveMobile,
};
