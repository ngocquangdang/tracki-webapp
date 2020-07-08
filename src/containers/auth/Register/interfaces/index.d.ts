import { WithTranslation } from 'next-i18next';

declare namespace IRegisterPage {
  interface RegisterState {
    username: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone: string;
    zip: string;
  }

  interface RegisterFormStep1 {
    username: string;
    password: string;
    confirm_password: string;
  }

  interface RegisterFormStep2 {
    first_name: string;
    last_name: string;
  }

  interface RegisterFormStep3 {
    phone: string;
  }
  interface RegisterFormStep4 {
    zip: string;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IProps extends WithTranslation {
    errors: RegisterState;
    isRequesting: boolean;
    errorMessage: string;
    registerRequestAction(data: RegisterState, callback): void;
    updateStore(data: RegisterFormStep1): void;
    onNextStep(): void;
    formData: RegisterState;
  }
}

export default IRegisterPage;
