import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Card = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  height: 70px;
  padding: ${(props: { isMobile: boolean }) => (props.isMobile ? '0 12px' : 0)};
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

const useStyles = makeStyles(theme => ({
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
}));

export { Card, useStyles };
