import styled from 'styled-components';
import { makeStyles, withStyles, Tooltip } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

const Item = styled.div`
  display: flex;
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
  margin: auto;
  border-radius: 100px;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const ItemInfo = styled.div`
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    max-width: 175px;
  }
`;
const Name = styled.div`
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 4px 0;
  font-size: 14px;
`;

const Renew = styled.div`
  color: white;
  background: #a41b0d;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  margin-left: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b7b7b7;
  margin-left: -3px;
`;
const CardDetail = styled.div`
  color: #666666;
`;
const TimeActive = styled.span`
  font-size: 12px;
  color: #b7b7b7;
  text-overflow: ellipsis;
`;

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
})(Tooltip) as any;
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
  iconSetting: {
    color: '#666666',
    fontSize: '24px',
  },
  iconDone: {
    color: theme.palette.primary.main,
    fontSize: '24px',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  redIcon: {
    color: '#f44336',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  padding: {
    paddingLeft: 12,
  },
  nonePadding: {
    paddingLeft: 0,
  },
  noClick: {
    cursor: 'default',
  },
  show: {
    display: 'flex',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  questionIcon: {
    width: 13,
    height: 13,
    marginLeft: 5,
  },
}));

const ListItemStyle = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #e0e0e0',
    justifyContent: 'space-between',
    alignItem: 'center',
    overFlow: 'hidden',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}))(ListItem) as any;
export {
  ImageWrapper,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
  ListItemStyle,
  DefaultImage,
  Renew,
  TooltipStyle,
};
