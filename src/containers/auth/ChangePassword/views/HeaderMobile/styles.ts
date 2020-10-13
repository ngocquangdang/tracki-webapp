import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const HeaderMobile = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 13px 15px;
  backdrop-filter: blur(30px);
  background: #ffffff;
  @media (max-width: 375px) {
    height: 56px;
    padding: 0 15px;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#1a1a1a',
    fontSize: 16,
    lineHeight: 19,
    width: 'fit-content !important',
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
    [theme.breakpoints.down(375)]: {
      margin: 'auto 0',
      padding: 0,
      '& span svg': {
        width: 20,
        height: 20,
      },
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down(375)]: {
      height: 26,
      width: 90,
    },
  },
}));

export { Logo, HeaderMobile, useStyles };
