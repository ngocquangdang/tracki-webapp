// import { withTranslation } from 'next-i18next';

import { WithTranslation } from 'next-i18next';

declare namespace ILoginPage {
  interface IProps extends WithTranslation {
    errorMessage: any;
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
    loginSocialNetworkRequestAction(socialtype: string, data): void;
    t: any;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateLogin {
    username: string;
    password: string;
    remember_me: boolean;
  }

  interface IStateChatUs {
    username: string;
    phonenumber: string;
    name: string;
  }
}

export default ILoginPage;
