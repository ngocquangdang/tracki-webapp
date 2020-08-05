import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const Container = styled.div`
  margin-top: 60px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '#fff' : '#fafafa'};
  padding-bottom: 25px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '13px 10.5px' : '6px 12px'};
  border-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '1px solid #e0e0e0' : 'none'};
  padding: 23px 11px 15px 15px;
`;

const LeftItem = styled.div`
  display: flex;
  flex-direction: row;
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
const TimeActive = styled.span`
  font-size: 12px;
  color: #b7b7b7;
`;
const RightItem = styled.div`
  display: flex;
  align-items: center;
`;
const TextRefresh = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  margin-right: 6px;
`;
const CotrolPlayer = styled.div`
  padding: 6px 15px;
`;
const ControlTime = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const ControlButton = styled.div`
  padding: 15px;
`;
const useStyles = makeStyles(theme => ({
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  rightIcon: {
    width: '20px',
    height: '27px',
    objectFit: 'contain',
    color: '#999999',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  time: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    padding: '0 15px',
  },
  textPadding: {
    paddingBottom: '20px',
  },
}));

const ProgressBar = withStyles(theme => ({
  root: {
    '& .MuiLinearProgress-root': {
      height: '3px',
    },
  },
}))(LinearProgress);

export {
  Container,
  Content,
  Item,
  LeftItem,
  ImageWrapper,
  Image,
  ItemInfo,
  Name,
  Time,
  TimeActive,
  RightItem,
  TextRefresh,
  CotrolPlayer,
  ProgressBar,
  ControlTime,
  ControlButton,
  useStyles,
};
