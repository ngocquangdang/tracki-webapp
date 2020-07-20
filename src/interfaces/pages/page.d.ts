import { WithTranslation } from 'next-i18next';

declare namespace IPage {
  interface IProps extends WithTranslation {}

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export { IPage };
