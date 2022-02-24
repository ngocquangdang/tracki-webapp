import { makeStyles, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';

const OptionViewDatePicker = styled.div`
  width: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? 'auto' : '258px'};
  margin-right: ${(props: { isDateRange: boolean }) =>
    props.isDateRange ? '15px' : '0'};
  position: relative;
`;
const MessageError = styled.div`
  margin-top: 5px;
`;
const PaginationStyle = withStyles(theme => ({
  root: {
    padding: '15px 0 !important',
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
  spacer: {
    flex: 0,
  },
}))(TablePagination) as any;

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: 50,
  },
  header: {
    marginBottom: 15,
  },
  containerTable: {
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #e0e0e0',
    backgroundColor: '#ffffff',
  },
  flexRow: {
    display: 'flex',
  },
  containOption: {
    width: 258,
    marginRight: 15,
    maxWidth: 258,
    position: 'relative',
  },
  color: {
    fontSize: 17,
    color: '#1a1a1a',
    padding: 8,
  },
  iconHeader: {
    fontSize: '32px',
    color: '#168449',
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
  cellHead: {
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e0e0e0',
    padding: '0 15px',
  },
  sortOtion: {
    width: 193,
    maxWidth: 193,
  },
  rightItemHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footer: {
    height: '94px',
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
  badgeDate: {
    width: 10,
    height: 10,
    backgroundColor: '#ed1f24',
    position: 'absolute',
    right: 105,
    top: -3,
    borderRadius: '50%',
  },
  cell: {
    color: '#1a1a1a',
    fontSize: 17,
  },
  noContent: {
    color: '#1a1a1a',
    fontSize: '22px',
    textAlign: 'center',
  },
  muiTable: {
    width: '98.5%',
    margin: '0 10px',
  },
  errorText: {
    fontSize: 10,
    color: theme.palette.error.main,
    position: 'absolute',
    right: 0,
    bottom: -12,
  },
  widthM: {
    width: '20px',
  },
}));

export { useStyles, PaginationStyle, OptionViewDatePicker, MessageError };
