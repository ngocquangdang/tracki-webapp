import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  height: 70px;
  padding-left: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '12px' : 0};
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
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
  },
  icon: {
    color: theme.palette.primary.main,
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
}));
export {
  ImageWrapper,
  Card,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
};
