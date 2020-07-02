import { WithTranslation } from 'next-i18next';

declare namespace IRegisterPage {
  interface RegisterState {
    username: string;
    password: string;
    confirm_password: string;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IProps extends WithTranslation {
    errors: RegisterState;
    isRequesting: boolean;
    errorMessage: string;
    registerRequestAction(data: RegisterState): void;
  }
}

export default IRegisterPage;
