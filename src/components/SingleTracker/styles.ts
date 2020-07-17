import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  background-color: #ffffff;
`;
const TrackerInfomation = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 167px;
  background-color: #fafafa;
  padding-left: 24px;
  padding-top: 24px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 55px;
  margin-left: 20px;
  color: #1a1a1a;
  align-items: center;
`;
const Title = styled.span`
  font-size: 17px;
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
  font-size: 14px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e0e0e0;
`;
const LocationApprox = styled.span``;
const Connection = styled.div``;
const BatteryTracker = styled.div`
  border-right: 1px solid #e0e0e0;
  padding-right: 8px;
  display: flex;
  align-items: center;
`;
const StatusTracker = styled.div`
  border-right: 1px solid #e0e0e0;
  padding-right: 8px;
  display: flex;
  align-items: center;
`;
const ConnectionTracker = styled.div`
  text-align: center;
`;
const TextName = styled.span``;
const LatLong = styled.div`
  font-family: OpenSans;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.25);
  font-family: OpenSans;
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
const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
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
const Time = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b7b7b7;
  margin-left: -3px;
`;
const CardDetail = styled.div`
  margin-right: 15px;
`;
const TimeActive = styled.span`
  font-size: 12px;
  color: #b7b7b7;
`;
const RightItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const LeftItem = styled.div`
  display: flex;
  flex-direction: row;
`;
const ContainerControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 132.33px;
`;
const TitleMenu = styled.div`
  white-space: nowrap;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
`;
const TrackerMenu = styled.div`
  display: flex;
  flex-direction: column;
  color: #666666;
  position: relative;
`;
const TrackerMenuDown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  &:after {
    content: '';
    position: absolute;
    left: 66%;
    top: 25%;
    height: 50%;
    border: 1px solid #e0e0e0;
  }
`;
const Border = styled.div`
  width: 75%;
  border-bottom: 1px solid #e0e0e0;
  position: absolute;
  left: 14%;
  top: 50%;
`;
const TrackerMenuUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  &:after {
    content: '';
    position: absolute;
    left: 33%;
    top: 25%;
    height: 50%;
    border: 1px solid #e0e0e0;
  }
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
  Header,
  Title,
  Card,
  ImageWrapper,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  TrackerInfomation,
  TrackerStatus,
  BatteryTracker,
  StatusTracker,
  ConnectionTracker,
  LocationApprox,
  Connection,
  Address,
  Text,
  TextName,
  LatLong,
  LatText,
  LongText,
  RightItem,
  LeftItem,
  ContainerControl,
  TitleMenu,
  TrackerMenu,
  TrackerMenuDown,
  TrackerMenuUp,
  Border,
  useStyles,
};
