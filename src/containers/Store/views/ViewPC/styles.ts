import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`;

const SideBar = styled.div`
  height: 100%;
  width: 400px;
  max-width: 400px;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;

export { Container, SideBar };
