import { WithTranslation } from 'next-i18next';

declare namespace ILoginPage {
  interface IProps extends WithTranslation {
    errors: {
      username: string;
      password: string;
      message: string;
    };
    isRequesting: boolean;
    loginRequestAction(data: IStateLogin): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateLogin {
    username: string;
    password: string;
  }
}

export default ILoginPage;
