import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const HeaderDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 56px 15px 0;
`;

const TitleDashBoard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 27px;
`;

const DeviceSelection = styled.div`
  width: 100%;
`;

const ContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ColumnCard = styled.div``;

const MapViewCard = styled.div`
  height: 421px;
  margin: 15px 0;
`;

const SummaryCard = styled.div`
  background: green;
  height: 288px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  margin: 0 15px;
`;

const DeviceInfoCard = styled.div`
  margin: 15px;
`;

const RecentAlertCard = styled.div`
  margin: 15px;
`;

const ContentCard = styled.div`
  height: 100%;
`;

const MapView = styled.div`
  height: 386px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 300;
  margin: 0;
`;

const IconDashboard = styled.div`
  margin-right: 8px;
`;

const SelectGroup = styled.div`
  width: 100%;
`;
const Description = styled.div`
  font-size: 14px;
  color: #999999;
  display: flex;
  align-items: center;
`;
const HeaderCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  margin-bottom: 10px;
`;

const CardTitle = styled.div``;

const DetailSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  width: calc(100% / 2);
  height: calc(100% / 2);
  padding: 10px 0;
`;

const TitleCard = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div``;

const DataView = styled.div`
  font-size: 28px;
  font-weight: 500;
`;

const SubCard = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 7px 0;
`;

const SummaryDate = styled.div`
  font-size: 12px;
  font-weight: normal;
`;

const InfoCard = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

const TitleInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding-top: 18px;
`;

const AddressInfo = styled.div`
  font-size: 14px;
  font-weight: 300;
  padding: 10px 0 14px;
`;

const AlertCard = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: 0;
  }
`;

const TitleAlert = styled.div`
  padding: 5px 0;
  font-size: 14px;
  font-weight: 500;
`;

const AddressAlert = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const DateAlert = styled.div`
  font-size: 14px;
`;

const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 16,
    color: '#1a1a1a',
    padding: '17px 0',
  },
  iconHeader: {
    width: 35,
    height: 32,
    color: '#168449',
  },
  padding: {
    padding: 0,
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  iconBtn: {
    width: 16,
    height: 16,
  },
  iconCard: {
    width: 20,
    height: 20,
    marginRight: 8.5,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '30px 0',
  },
  colorText: {
    color: '#1a1a1a',
  },
  btn: {
    width: 228,
  },
  cellHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    padding: 0,
  },
  col1: {
    width: '21%',
    fontWeight: 500,
  },
  col2: {
    width: '65%',
    textAlign: 'left',
  },
  font14: {
    fontSize: 14,
  },
  margin: {
    margin: 0,
  },
}));

export {
  HeaderDashboard,
  TitleDashBoard,
  DeviceSelection,
  ContainerDashboard,
  MapViewCard,
  SummaryCard,
  DeviceInfoCard,
  RecentAlertCard,
  ColumnCard,
  ContentCard,
  MapView,
  Title,
  IconDashboard,
  useStyles,
  SelectGroup,
  Description,
  HeaderCard,
  CardTitle,
  DetailSummary,
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
  InfoCard,
  TitleInfo,
  AddressInfo,
  AlertCard,
  TitleAlert,
  AddressAlert,
  DateAlert,
};
