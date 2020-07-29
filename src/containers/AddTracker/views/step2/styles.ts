import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Typography = styled.span``;
const Image = styled.div``;
const GroupCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const CardDescription = styled.div`
  color: #1a1a1a;
  font-size: 16px;
  margin: 0;
  text-align: center;
`;
const Back = styled.div``;
const Lable = styled.p``;
const Letter = styled.div`
  font-size: 14px;
`;
const PlanList = styled.ul`
  padding: 0;
  list-style: none;
`;
const PlanItem = styled.li``;
const Paner = styled.div`
  background: red;
  transform: rotate(45deg);
  text-align: center;
  position: absolute;
  width: 150px;
  top: 23px;
  right: -36px;
  height: 30px;
  display: ${(props: { mostPopular: boolean }) =>
    props.mostPopular ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;
const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56',
    paddingRight: 59,
    paddingLeft: 25,
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  headerCard: {
    background: '#168449',
    height: '56px',
  },
  card: {
    position: 'relative',
    width: '390px',
    borderRadius: 4,
    marginBottom: 22,
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',
  },
  fullWidth: {
    width: '100%',
  },
  hiddenCard: {
    display: 'none',
  },
  hiddenLetter: {
    display: 'none',
  },
}));
const CardHeaderStyle = withStyles(theme => ({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
}))(CardHeader);
export {
  Header,
  Typography,
  Image,
  GroupCard,
  CardDescription,
  Back,
  Lable,
  Letter,
  PlanList,
  PlanItem,
  Paner,
  useStyles,
  CardHeaderStyle,
};
