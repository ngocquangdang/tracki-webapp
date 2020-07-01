import { WithTranslation } from 'next-i18next';

declare namespace ILoginPage {
  interface IProps extends WithTranslation {}

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateLogin {
    email: string;
    password: string;
  }
}

export default ILoginPage;
