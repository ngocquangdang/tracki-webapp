import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  background-color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 55px;
  margin-left: 20px;
  color: #1a1a1a;
  align-items: center;
  cursor: pointer;
`;
const Title = styled.span`
  font-size: 17px;
`;
const Card = styled.div`
  cursor: pointer;
`;
const ContainerControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 132.33px;
  &:hover {
    background-color: #fafafa;
  }
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
  iconLoading: {
    width: '22px !important',
    height: '22px !important',
  },
}));
export {
  Container,
  Header,
  Title,
  Card,
  ContainerControl,
  TitleMenu,
  TrackerMenu,
  TrackerMenuDown,
  TrackerMenuUp,
  Border,
  useStyles,
};
