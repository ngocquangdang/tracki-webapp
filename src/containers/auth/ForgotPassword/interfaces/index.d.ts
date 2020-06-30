import { WithTranslation } from 'next-i18next';

declare namespace IForgotPage {
  interface IProps extends WithTranslation {}

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export default IForgotPage;
