import styled from 'styled-components';

const Container = styled.div``;
const Logo = styled.img`
  width: 126px;
  height: 24px;
  object-fit: contain;
`;
const CheckoutLogo = styled.img`
  width: 196px;
  height: 44px;
  object-fit: contain;
`;
const Checkout = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 959.95px) {
    flex-direction: column;
    padding: 50px 20px;
  }
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #707070;
  margin-left: 30px;
  @media (max-width: 959.95px) {
    margin-left: 0px;
    margin-top: 25px;
  }
`;
const ContainerCheckoutLogo = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 30px;
  @media (max-width: 959.95px) {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
  }
`;
export { Container, Logo, CheckoutLogo, Checkout, Text, ContainerCheckoutLogo };
