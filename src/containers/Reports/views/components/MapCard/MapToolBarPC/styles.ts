import styled, { css } from 'styled-components';
import { makeStyles, IconButton, withStyles } from '@material-ui/core';

const ToolBar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 10px;
  bottom: 10px;
  z-index: 400;
  ${(props: { isTop?: boolean }) =>
    props.isTop &&
    css`
      top: 0;
    `}
`;

const ZoomButton = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: #666666;
  width: 40px;
  border: 0;
  font-size: 20px;
  margin: 5px 0;
  height: 80px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  & > :first-child {
    margin: 0 !important;
  }
  & > :last-child {
    margin: 0 !important;
    border-top: 1px solid #cdcdcd;
  }
  &:focus {
    outline: none;
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: '#666666',
    width: 40,
    height: 40,
    border: 0,
    background: '#ffffff',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#ffffff',
    },
  },
  active: {
    backgroundColor: theme.palette.primary.main + ' !important',
    color: '#ffffff',
  },
  btnMobile: {
    width: '32px !important',
    height: '32px !important',
    padding: '8px !important',
  },
  borderRadiusTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  borderRadiusBottom: {
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  display: {
    display: 'block !important',
    top: 'unset',
    bottom: 6,
  },
  iconScale: {
    fontSize: '17px',
    width: '27px',
    height: '26px',
  },
  tranform: {
    transform: 'rotate(85deg)',
  },
}));
const IconButtonStyle = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    fontSize: 20,
    backgroundColor: '#ffffff',
    margin: '0 0 5px',
    padding: 0,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#ffffff',
    },
  },
}))(IconButton);

export { ToolBar, IconButtonStyle, ZoomButton, useStyles };
