import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Card = styled.li`
  display: flex;
  align-items: center;
  height: 56px;
  padding: ${(props: { isMobile: boolean }) => (props.isMobile ? '0 12px' : 0)};
`;

const useStyles = makeStyles(theme => ({
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
}));

export { Card, useStyles };
