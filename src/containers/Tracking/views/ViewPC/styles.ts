import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`;

interface Props {
  isMultiView?: boolean;
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
  justify-content: center;
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: #a9a9a9;
  margin-left: ${(p: Props) => (p.isFull ? '400px' : '0px')};
  padding-right: ${(p: Props) => (p.isFull ? '400px' : '0px')};
  opacity: 0.4;
`;

export { Container, MapView, Progress };
