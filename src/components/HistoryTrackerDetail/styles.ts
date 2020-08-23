import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

interface Props {
  isMobile: boolean;
}

const TrackerInfomation = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: Props) => (props.isMobile ? '#fff' : '#fafafa')};
  border-bottom: ${(props: Props) =>
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
  padding: ${(props: Props) => (props.isMobile ? '' : '0 32px 20px 12px')};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props: Props) =>
    props.isMobile ? '13px 10.5px' : '17px 0 24px 13px;'};
  border-bottom: ${(props: Props) =>
    props.isMobile ? '1px solid #e0e0e0' : 'none'};
  align-items: center;
`;

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: '55px',
    marginLeft: '20px',
    color: '#1a1a1a',
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 17,
  },
  iconBack: {
    width: '20px',
    height: '20px',
  },
  trackerStatus: {
    display: 'flex',
    height: '52px',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    fontSize: '12px',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #e0e0e0',
  },
  leftItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  status: {
    flex: 1,
    borderRight: '1px solid #e0e0e0',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conectionTracker: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    textAlign: 'center',
  },
  footer: {
    display: 'none',
    padding: '10px 15px',
  },
  timeline: {
    position: 'relative',
    height: 'calc(100% - 427px)',
    '& > div': {
      position: 'absolute',
      height: 'calc(100% - 24px)',
      overflowY: 'auto',
    },
  },
  timelineTitle: {
    fontSize: 16,
    lineHeight: '19px',
    marginLeft: 15,
    marginBottom: 5,
  },
  speedStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  itemInfo: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 172,
  },
  controlText: {
    lineHeight: 2.36,
    fontSize: 14,
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.25)',
    '& span:first-child': {
      fontWeight: 700,
    },
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '4px 0',
    fontSize: 14,
  },
  iconRed: {
    width: 15,
    height: 15,
    borderRadius: '50%',
    border: 'solid 1px #ae0000',
    display: 'flex',
    background: '#e60000',
    margin: 5,
  },
  battery: {
    borderRight: '1px solid #e0e0e0',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.75,
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#b7b7b7',
    marginLeft: -3,
  },
  timeActive: {
    fontSize: 12,
    color: '#b7b7b7',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
  },
  latlng: {
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.25)',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.36,
    letterSpacing: 'normal',
    color: '#1a1a1a',
    '& span:first-child': {
      marginRight: 15,
    },
  },
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
export { Card, Item, TrackerInfomation, Address, useStyles };
