import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const TEXT_COLOR = '#1a1a1a';
const ACTIVE_COLOR = '#168449';
const BG_COLOR = '#eeeeee';

interface StyleProps {
  disabled?: boolean;
  active?: boolean;
}

const useStyles = makeStyles(() => ({
  paper: {
    height: 56,
    marginBottom: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    '&:first-child': {
      marginTop: 16,
    },
  },
  active: {
    borderLeftWidth: 3,
    borderLeftColor: ACTIVE_COLOR,
    borderLeftStyle: 'solid',
  },
  iconBtn: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  dots: {
    fontSize: 20,
    color: TEXT_COLOR,
  },
  menuList: {
    padding: 0,
  },
  menuRoot: {
    paddingTop: 0,
  },
  menuItem: {
    color: TEXT_COLOR,
    fontSize: 17,
    lineHeight: '20px',
    height: 50,
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.14)',
    },
  },
}));

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  pointer-events: ${(p: StyleProps) => (p.disabled ? 'none' : 'default')};
`;
const Image = styled.img`
  width: 20px;
  margin: auto;
`;
const ImageWrapper = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  cursor: ${(p: StyleProps) => (p.disabled ? 'default' : 'pointer')};
  background-color: ${(p: StyleProps) =>
    !p.disabled && p.active ? ACTIVE_COLOR : BG_COLOR};
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.p`
  margin: 4px 0;
  align-self: center;
  cursor: ${(p: StyleProps) => (p.disabled ? 'default' : 'pointer')};
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  color: ${(p: StyleProps) =>
    p.disabled ? '#999' : p.active ? ACTIVE_COLOR : TEXT_COLOR};
`;
const Status = styled.p`
  margin: 4px 0;
  align-self: center;
  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
  color: #999;
`;
const Actions = styled.div`
  display: flex;
`;

export {
  Status,
  Content,
  ImageWrapper,
  Image,
  ItemInfo,
  Name,
  Actions,
  useStyles,
};
