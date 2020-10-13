import { WithTranslation } from 'next-i18next';

declare namespace UserDatails {
  interface IProps extends WithTranslation {
    errorMessage: string;
    errors: {
      firstName: string;
      lastName: string;
      password: string;
      phone: string;
      date_format: string;
    };
    isRequesting: boolean;
    fetchUserRequested(): void;
    getUserRequestAction(): void;
    updateUSerRequestAction(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateUser {
    email: string;
    first_name: string;
    last_name: string;
    init_phone_code: string;
    phone_code: any;
    phone: any;
    email_notifications: boolean;
    push_notifications: boolean;
    speed_unit: string;
    date_format: string;
    language: string;
  }
}

export default UserDatails;
