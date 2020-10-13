import { WithTranslation } from 'next-i18next';

import { PayloadType } from '@Interfaces';

declare namespace IForgotPage {
  interface IProps extends WithTranslation {
    errors: {
      code: string;
      email: string;
      password: string;
    };
    isRequesting: boolean;
    email: string;
    code: string;
    password: string;
    forgotRequestAction(data: PayloadType): void;
    confirmCodeRequestAction(data: PayloadType): void;
    confirmPasswordRequestAction(data: PayloadType): void;
    resetErrorAction(): void;
    resetStore(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export default IForgotPage;
