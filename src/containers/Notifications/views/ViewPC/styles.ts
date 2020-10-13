import { makeStyles, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';

const NotificationContainer = styled.div`
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  margin: 28px 26px;
`;
const HeaderNotification = styled.header`
  display: flex;
  flex-direction: column;
  margin: 28px 26px;
`;
const LogoNotification = styled.div`
  display: flex;
  align-items: center;
`;
const IconNotification = styled.div`
  margin-right: 8px;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 300;
  margin: 0;
`;
const ListOptionView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;
const OptionView = styled.div`
  width: 258px;
  padding-right: 15px;
  max-width: 258px;
`;
const SortOption = styled.div`
  width: 193px;
  max-width: 193px;
`;
const OptionViewDatePicker = styled.div`
  width: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? '80%' : '258px'};
  padding-right: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? '15px' : '0'};
`;
const PaginationStyle = withStyles(theme => ({
  root: {
    paddingRight: 30,
    '&:last-child': {
      height: '100%',
      border: 0,
    },
  },
  caption: {
    fontSize: 17,
    fontWeight: 300,
  },
  selectRoot: {
    borderBottom: '1px solid',
  },
  select: {
    padding: 0,
    paddingRight: 35,
  },
  selectIcon: {
    right: '-5px',
    color: '#1a1a1a',
  },
}))(TablePagination);

const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 17,
    color: '#1a1a1a',
    padding: 8,
  },
  iconHeader: {
    fontSize: '32px',
    color: '#168449',
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  btn: {
    width: 228,
  },
  textHeader: {
    color: '#1a1a1a',
    fontSize: 24,
    fontWeight: 'normal',
  },
  btnCsv: {
    width: 180,
    marginLeft: 10,
  },
  csvLink: {
    textDecoration: 'none',
  },
  header: {
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e0e0e0',
  },
  rightItemHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconLocation: {
    padding: 0,
    width: 16,
    height: 18,
    color: '#168449',
  },
  iconWarning: {
    position: 'absolute',
    width: 13,
    height: 13,
    color: '#ed1f24',
    left: 6,
    bottom: 8,
  },
  iconNearMe: {
    color: '#231f20',
    fontSize: 25,
  },
  contentBody: {
    display: 'flex',
    color: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    margin: '0 25px',
    '&:last-child': {
      border: 'none',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    height: '94px',
  },
  dataFilter: {
    color: '#1a1a1a',
    display: 'flex',
    fontSize: '22px',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export {
  useStyles,
  NotificationContainer,
  PaginationStyle,
  IconNotification,
  LogoNotification,
  ListOptionView,
  HeaderNotification,
  Title,
  SortOption,
  OptionView,
  OptionViewDatePicker,
};
