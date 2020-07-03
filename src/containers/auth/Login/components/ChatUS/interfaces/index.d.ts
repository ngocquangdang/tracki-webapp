import { WithTranslation } from 'next-i18next';

declare namespace IChatUsPage {
  interface IProps extends WithTranslation {
    errors: {
      message: string;
      errors: {
        email: string;
        name: string;
        phonenumber: string;
      };
    };
    isRequesting: boolean;
    chatUsRequestAction(data: IStateChatUs): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateChatUs {
    email: string;
    name: string;
    phonenumber: string;
  }
}

export default IChatUsPage;
