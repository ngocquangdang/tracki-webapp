import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 5;
  right: 0;
`;
const MenuHeader = styled.div`
  display: flex;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 450px;
  background-color: #fff;
`;

const ButtonClose = styled.div``;

const WrapDisabled = styled.div`
  width: 450px;
  max-height: 100%;
  background-color: #fff;
  overflow-y: auto;
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

export {
  MenuWrap,
  MenuHeader,
  ButtonClose,
  Title,
  Wrap,
  WrapDisabled,
  useStyles,
};
