import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const MapViewCard = styled.div`
  min-height: 533px;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  padding: 15px;
`;

const ContentCard = styled.div`
  overflow-y: auto;
  padding: 10px 0;
`;

const MapView = styled.div`
  height: 437px;
  position: relative;
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
  padding: 10px 0 7px;
`;

const CardTitle = styled.div``;

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
  primaryColor: {
    color: theme.palette.primary.main,
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  iconCard: {
    width: 20,
    height: 20,
    marginRight: 8.5,
  },

  cellHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    padding: 0,
  },
}));

export {
  MapViewCard,
  HeaderCard,
  useStyles,
  CardTitle,
  Description,
  ContentCard,
  MapView,
};
