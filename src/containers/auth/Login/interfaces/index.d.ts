import { WithTranslation } from 'next-i18next';

declare namespace ILoginPage {
  export interface IProps extends WithTranslation {}

  export interface InitialProps {
    namespacesRequired: string[];
  }
}

export default ILoginPage;
