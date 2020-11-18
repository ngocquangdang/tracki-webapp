import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
const Image = styled.div`
  width: 40px;
  height: 34px;
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

const useStyles = makeStyles(theme => ({
  row: {
    padding: '30px 0',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e0e0e0',
  },
  rowLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  rowRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6,
    flex: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconAlarm: {
    color: '#231f20',
    fontSize: 25,
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerIcon: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#f1f1f1',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBold: {
    fontWeight: 500,
  },
  mr: {
    marginRight: 20,
  },
  ml: {
    marginLeft: 20,
  },
  textFont17: {
    fontSize: 17,
  },
  textFont16: {
    fontSize: 16,
  },
  textFont14: {
    fontSize: 14,
  },
  textFont13: {
    fontSize: 13,
  },
  textColorMain: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  imageWrapper: {
    width: 50,
    borderRadius: 25,
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 16,
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
    paddingTop: 3,
  },
  iconBattery: {
    width: 10,
    height: 17,
    marginRight: 10,
  },
  iconBatteryRote: {
    width: 10,
    height: 17,
    marginRight: 10,
    transform: 'rotate(90deg)',
  },
}));

export { useStyles, Image };
