import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  @media only screen and (min-width: 959.95px) {
    height: calc(100vh - 64px);
  }
  width: 100%;
  @media (max-width: 959.95px) {
    height: calc(100vh - 101px);
  }
`;

const MapView = styled.div`
  position: relative;
  height: 100%;

  width: 100%;
`;
export { Container, MapView };
