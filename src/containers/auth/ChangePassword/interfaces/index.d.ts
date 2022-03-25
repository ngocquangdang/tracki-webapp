import { WithTranslation } from '@Server/i18n';

import { PayloadType } from '@Interfaces';

declare namespace IForgotPage {
  interface IProps extends WithTranslation {
    errors: {
      password: string;
      // email: string;
    };
    isRequesting: boolean;
    password: string;
    // email: string;
    changePasswordRequestAction(data: PayloadType): void;
    resetErrorAction(): void;
    resetStore(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export default IForgotPage;
