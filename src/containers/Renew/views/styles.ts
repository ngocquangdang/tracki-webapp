import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { Button } from '@Components/buttons';

interface Props {
  stepChild: string;
}
const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: #f4f5f6;
  @media (max-width: 995.95px) {
    background: ${props => (props.stepChild !== '' ? '#f4f5f6' : '#ffffff')};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 856px;
  width: 100%;
  margin: 0 auto 100px;
  height: 100%;
  /* overflow-y: overlay; */
  @media (max-width: 995.95px) {
    margin: 0 auto;
    padding-bottom: 100px;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 995.95px) {
    height: 29px;
  }
`;

const HeaderNav = styled.header`
  position: relative;
  top: 0;
  display: flex;
  width: 100%;
  padding: 8px 50px;
  justify-content: space-between;
  @media (max-width: 995.95px) {
    padding: 5px;
    background-color: #ffffff;
    border-bottom: 1px solid #ccd0d5;
    height: 56px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 995.95px) {
    margin-bottom: 10px;
  }
`;
const Typography = styled.span`
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
  @media (max-width: 374.95px) {
    font-size: 13px;
  }
`;
const Image = styled.div`
  @media (max-width: 995.95px) {
    width: 175px;
    height: 19px;
  }
  img {
    width: 100%;
  }
`;
const Image2 = styled.div``;
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
  @media (max-width: 995.95px) {
    font-size: 13px;
  }
`;
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
  display: ${(props: { mostPopular?: boolean }) =>
    props.mostPopular ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  @media (max-width: 995.95px) {
    height: 20px;
    width: 100px;
    top: 5px;
  }
  @media (max-width: 374.95px) {
    height: 20px;
    width: 100px;
    top: 5px;
    right: -55px;
  }
`;
const Text = styled.p`
  font-size: 16px;
  @media (max-width: 995.95px) {
    font-size: 13px;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#168449',
    padding: 0,
    height: 'auto',
    '& span svg': {
      fontSize: '32px !important',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      '& span svg': {
        fontSize: '25px !important',
        width: 20,
        height: 20,
        margin: 0,
      },
    },
    [theme.breakpoints.down(374.95)]: {
      fontSize: 13,
    },
  },
  backNav: {
    color: '#1a1a1a',
    fontSize: 16,
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  headerCard: {
    background: '#168449',
    height: '56px',
    [theme.breakpoints.down('sm')]: {
      height: 35,
    },
  },
  card: {
    position: 'relative',
    width: '390px',
    borderRadius: 4,
    marginBottom: 22,
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: 'calc((100% - 20px)/2)',
      fontSize: 13,
    },
  },
  fullWidth: {
    width: '100%',
  },
  hiddenCard: {
    display: 'none',
  },
  hidden: {
    display: 'none',
  },
  btn: {
    margin: '15px 0',
  },
  container: {
    padding: 25,
  },
}));
const CardHeaderStyle = withStyles(theme => ({
  title: {
    fontSize: 20,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))(CardHeader);

const ButtonStyle = withStyles(theme => ({
  startIcon: {
    marginRight: 0,
  },
}))(Button);
export {
  Header,
  Typography,
  Image,
  Image2,
  GroupCard,
  CardDescription,
  Lable,
  Letter,
  Text,
  PlanList,
  PlanItem,
  Paner,
  useStyles,
  CardHeaderStyle,
  Container,
  Logo,
  HeaderNav,
  Content,
  ButtonStyle,
};
