import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  isClaimed: boolean;
}
const useStyles = makeStyles(theme => ({
  content: {
    textAlign: 'center',
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom, #ffbf69, #db681d)',
  },
  btnBackground: {
    marginBottom: 7,
    width: 343,
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
    [theme.breakpoints.down('sm')]: {
      width: 292,
    },
  },
  title: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 30,
    color: '#ffffff',
    marginTop: 10,
  },
  step: {
    display: 'flex',
    marginBottom: 30,
  },
  claimed: {
    color: '#ffffff !important',
  },
  coin: {
    width: '34px',
    height: '34px',
    border: '1px solid',
    borderRadius: '50%',
    /* textAlign: 'center', */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '28px',
      height: '28px',
    },
  },
  itemTitle: {
    fontSize: 14,
    color: '#803400',
    marginTop: 4,
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  coinPoint: {
    position: 'absolute',
    fontSize: 14,
    color: '#803400',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      width: '28px',
      height: '28px',
    },
  },
}));

const Day = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    top: 17px;
    height: 2px;
    width: 50px;
    background-color: #d15500;
    right: -25px;
    @media (max-width: 959.96px) {
      top: 15px;
    }
    @media (max-width: 374.95px) {
      top: 15px;
    }
    @media (min-width: 375px) and (max-width: 468px) {
      top: 15px;
      width: 75px;
      right: -35px;
    }
    @media (min-width: 468.9px) and (max-width: 785.9px) {
      top: 15px;
      width: 90px;
      right: -45px;
    }
    @media (min-width: 786px) and (max-width: 959.96px) {
      top: 15px;
      width: 100px;
      right: -50px;
    }
  }
  &:last-child::after {
    content: none;
  }
  @media (max-width: 959.96px) {
  }
`;

const Coin = styled.div`
  width: ${(props: Props) => (props.isClaimed ? '38px' : '33px')};
  height: ${(props: Props) => (props.isClaimed ? '38px' : '33px')};
  border: ${(props: Props) => (props.isClaimed ? '2px solid #d15500' : 'none')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  box-shadow: ${(props: Props) =>
    props.isClaimed && '0px 0px 15px 0px rgba(255,255,255,1)'};
  @media (max-width: 959.96px) {
    width: ${(props: Props) => (props.isClaimed ? '32px' : '32px')};
    height: ${(props: Props) => (props.isClaimed ? '32px' : '32px')};
    border: ${(props: Props) =>
      props.isClaimed ? '2px solid #d15500' : 'none'};
  }
`;

export { useStyles, Coin, Day };
