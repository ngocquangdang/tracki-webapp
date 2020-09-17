import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  height: calc(100% - 70px);
  overflow-y: auto;
  width: 100%;
  @media (max-width: 959.95px) {
    height: 100%;
  }
`;

export { Content };
