import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import { withStyles, makeStyles } from '@material-ui/core';

const Card = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
`;
const CardContent = styled.div`
  display: flex;
`;
const Icon = styled.div`
  width: 25px;
  height: 20px;
  color: #999999;
`;
const SelectCard = styled.div``;
const Content = styled.div`
  font-size: 15px;
`;

const ListItemStyle = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #99999921',
    justifyContent: 'space-between',
    padding: 0,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}))(ListItem) as any;

const useStyles = makeStyles(theme => ({
  icon: {
    width: 25,
    height: 20,
  },
}));
export {
  ListItemStyle,
  Card,
  CardContent,
  Icon,
  SelectCard,
  Content,
  useStyles,
};
