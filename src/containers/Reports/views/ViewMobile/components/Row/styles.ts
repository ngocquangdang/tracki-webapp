import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
type Props = {
  isSmall?: boolean;
  background?: boolean;
};
const Image = styled.div`
  width: ${(props: Props) => (props.isSmall ? '18px' : '40px')};
  height: ${(props: Props) => (props.isSmall ? '15.5px' : '34px')};
  border-radius: 100px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: Props) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 15,
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  pb: {
    paddingBottom: 15,
  },
  rowTop: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.5,
  },
  content: {
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
    flex: 1,
    paddingLeft: 3,
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
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
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#f1f1f1',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  textBold: {
    fontWeight: 500,
  },
  mr: {
    marginRight: 10,
  },
  ml: {
    marginLeft: 10,
  },
  textFont12: {
    fontSize: 12,
  },
  textFont14: {
    fontSize: 14,
  },
  textColorMain: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  imageWrapperSmall: {
    width: 25,
    borderRadius: '50%',
    height: 25,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 5,
  },
  imageWrapper: {
    width: 50,
    borderRadius: '50%',
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 10,
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
  viewMap: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    bottom: 7,
  },
  textWeight300: {
    fontWeight: 300,
  },
  mapView: {
    position: 'relative',
    height: 300,
  },
}));

export { useStyles, Image };
