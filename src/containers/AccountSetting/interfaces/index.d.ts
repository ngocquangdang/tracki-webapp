import { WithTranslation } from 'next-i18next';

declare namespace UserDatails {
  interface IProps extends WithTranslation {
    errorMessage: string;
    errors: {
      first_name: string;
      last_name: string;
      password: string;
      phone: string;
      date_format: string;
    };
    isRequesting: boolean;
    getUserRequest: any;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }

  interface IStateUser {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
  }
}

export default UserDatails;
