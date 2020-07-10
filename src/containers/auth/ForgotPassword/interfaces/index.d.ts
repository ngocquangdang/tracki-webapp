import { WithTranslation } from 'next-i18next';

import { PayloadType } from '@Interfaces';

declare namespace IForgotPage {
  interface IProps extends WithTranslation {
    errors: {
      code: string;
      email: string;
    };
    isRequesting: boolean;
    email: string;
    forgotRequestAction(data: PayloadType): void;
    confirmCodeRequestAction(data: PayloadType): void;
    resetErrorAction(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export default IForgotPage;
