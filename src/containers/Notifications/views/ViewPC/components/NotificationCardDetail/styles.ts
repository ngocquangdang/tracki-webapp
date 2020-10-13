import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const NotificationInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
`;
const NotficationType = styled.div`
  display: flex;
  align-items: center;
  flex: 0.2;
  padding-left: 34px;
`;
const NotificationTime = styled.div`
  display: flex;
  flex: 0.3;
  padding-left: 20px;
`;
const IconExpand = styled.div`
  display: flex;
`;
const TrackerName = styled.span`
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.94;
`;
const TrackerLocation = styled.div`
  display: flex;
  padding-top: 12px;
`;
const DetailLocation = styled.div`
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.94;
`;
const TrackerType = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 6px;
  background-color: #f1f1f1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;
const StatusType = styled.span``;
const IconAlarmType = styled.img`
  color: '#231f20';
  font-size: 25px;
`;
const useStyles = makeStyles(theme => ({
  iconLocation: {
    padding: 0,
    width: 16,
    height: 18,
    color: '#168449',
  },
  contentBody: {
    display: 'flex',
    color: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    margin: '0 25px',
    position: 'relative',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    height: '94px',
  },
  skeContainer: {
    margin: 10,
  },
  expand: {
    transition: 'transform .2s ease-in-out',
    transform: 'rotate(90deg)',
    cursor: 'pointer',
  },
  noExpand: {
    transition: 'transform .2s ease-in-out',
    transform: 'rotate(0)',
    cursor: 'pointer',
  },
  rowContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  cellMap: {
    padding: '0 15px',
    border: 'none',
  },
}));
export {
  useStyles,
  NotificationInfo,
  NotficationType,
  NotificationTime,
  IconExpand,
  TrackerName,
  TrackerLocation,
  DetailLocation,
  TrackerType,
  IconAlarmType,
  StatusType,
};
