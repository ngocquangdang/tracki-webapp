import styled from 'styled-components';

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

export { Container, MapView };
