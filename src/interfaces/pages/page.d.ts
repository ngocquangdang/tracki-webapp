import { WithTranslation } from '@Server/i18n';

declare namespace IPage {
  interface IProps extends WithTranslation {}

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export { IPage };
