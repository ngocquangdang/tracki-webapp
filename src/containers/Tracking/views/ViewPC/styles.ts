import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`;

interface Props {
  isMultiView: boolean;
  isFull: boolean;
}

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-left: ${(p: Props) => (p.isMultiView && !p.isFull ? '400px' : '0px')};
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  padding-left: 300px;
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: grey;
  margin-left: 400px;
  opacity: 0.4;
`;

const useStyles = makeStyles({
  loading: {
    color: 'white',
  },
});

export { Container, MapView, Progress, useStyles };
