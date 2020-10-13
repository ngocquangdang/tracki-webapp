import { WithTranslation } from 'next-i18next';

declare namespace ILoginPage {
  interface IProps extends WithTranslation {
    errorMessage: string;
    errors: {
      username: string;
      password: string;
      name: string;
      phonenumber: string;
    };
    isRequesting: boolean;
    loginRequestAction(data: IStateLogin): void;
    chatusRequestAction(data: IStateChatUs): void;
    resetErrorAction(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateLogin {
    username: string;
    password: string;
  }

  interface IStateChatUs {
    username: string;
    phonenumber: string;
    name: string;
  }
}

export default ILoginPage;
