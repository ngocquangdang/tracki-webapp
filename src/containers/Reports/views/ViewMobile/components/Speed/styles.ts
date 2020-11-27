import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px 10px 15px;
  justify-content: space-between;
  flex-direction: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? 'column' : 'row'};
`;
const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  card: {
    marginBottom: 30,
  },
  iconBattery: {
    width: 10,
    height: 17,
    marginRight: 10,
  },
  selection: {
    position: 'relative',
  },
  flexRow: {
    display: 'flex',
  },
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  containOption: {
    position: 'relative',
    width: '100%',
  },
  containDatePicker: {
    '& > div:first-child': {
      marginRight: 0,
      marginLeft: 15,
    },
    position: 'relative',
    width: '100%',
  },
  containDateRange: {
    marginTop: 15,
    position: 'relative',
    width: '100%',
  },
  btnCsv: {
    width: 180,
    marginLeft: 5,
  },
  csvLink: {
    textDecoration: 'none',
    marginLeft: 5,
  },
  mb: {
    marginBottom: 15,
  },
  mr: {
    marginBottom: 5,
  },
  mt: {
    marginTop: 15,
  },
  title: {
    marginLeft: 3,
    fontSize: 18,
  },
  sort: {
    width: '100%',
  },
  pd: {
    padding: '0 15px',
  },
  badge: {
    width: 10,
    height: 10,
    backgroundColor: '#ed1f24',
    position: 'absolute',
    right: -5,
    top: -3,
    borderRadius: '50%',
  },
  dashIcon: {
    fontSize: 25,
    marginRight: 5,
  },
}));

export { useStyles, Header };
