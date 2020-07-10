import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
`;

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: ${(props: { fullWidth?: boolean }) =>
    props.fullWidth ? '100%' : 'calc(100% - 320px)'};
`;
export { Container, MapView };
