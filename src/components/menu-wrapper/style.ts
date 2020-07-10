import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 -5px 10px 0 rgba(210, 210, 210, 0.3);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.32);
  position: absolute;
  top: 0;
  z-index: 1000;
`;

const ButtonClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding-top: 15px;
`;

const WrapDisabled = styled.div`
  width: 450px;
  height: 100%;
  position: relative;
  background-color: #fff;
  padding-top: 15px;
  padding-right: 10px;
`;

const Wrap = styled(WrapDisabled)`
  position: absolute;
  top: 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  padding: 12px 0 21px 20px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonClose: {
      width: '46.8px',
      height: '46.8px',
      color: '#1a1a1a',
      cursor: 'pointer',
    },
  })
);

export { MenuWrap, ButtonClose, Title, Wrap, WrapDisabled, useStyles };
