import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const HeaderDashboard = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 26px 0;
`;

const TitleDashBoard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 27px;
`;

const DeviceSelection = styled.div`
  width: 280px;
`;

const ContainerDashboard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 25px 25px;
`;

const ColumnCard = styled.div`
  width: calc((100% - 28px) / 2);
`;

const MapViewCard = styled.div`
  min-height: 533px;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
`;

const SummaryCard = styled.div`
  min-height: 288px;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
`;

const DeviceInfoCard = styled.div`
  min-height: 510px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
`;

const RecentAlertCard = styled.div`
  background: yellow;
  height: 658px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
`;

const ContentCard = styled.div`
  height: calc(100% - 35px);
  overflow-y: auto;
  padding: 15px;
`;

const MapView = styled.div`
  height: 437px;
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
  width: 240px;
`;
const Description = styled.div`
  font-size: 14px;
  color: #999999;
  display: flex;
  align-items: center;
`;
const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const CardTitle = styled.div``;
const DetailSummary = styled.div`
  display: flex;
`;
const Card = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  &::after {
    content: '';
    border-left: 1px solid #e0e0e0;
    width: 1px;
    height: 104px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  &:last-child::after {
    content: '';
    border: 0;
    width: 1px;
    height: 104px;
    position: absolute;
    top: 10px;
    right: 0;
  }
`;
const TitleCard = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const Content = styled.div``;
const DataView = styled.div`
  font-size: 42px;
  font-weight: 500;
  margin-top: 20px;
`;
const SubCard = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 7px 0;
`;
const SummaryDate = styled.div`
  font-size: 14px;
  font-weight: normal;
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
  paddingHeaderCard: {
    paddingTop: 25,
  },
  unitSize: {
    fontSize: 21,
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
    color: '#999999',
    cursor: 'pointer',
    '&:hover': {
      color: '#1a1a1a',
    },
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
    fontSize: '18px',
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
  iconSearch: {
    color: '#999999',
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
};
