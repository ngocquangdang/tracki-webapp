import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  @media (min-width: 959.95px) {
    height: calc(100vh - 64px);
  }
  width: 100%;
  @media (max-width: 959.95px) {
    height: calc(100vh - 101px);
  }
`;

export const ContainerSideBar = styled.div`
  @media (max-width: 959.95px) {
    display: none;
  }
`;

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: ${(props: { fullWidth?: boolean }) =>
    props.fullWidth ? '100%' : 'calc(100% - 320px)'};
  @media (max-width: 959.95px) {
    width: 100%;
  }
`;
export { Container, MapView };
