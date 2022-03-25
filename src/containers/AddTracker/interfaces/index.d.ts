import { WithTranslation } from '@Server/i18n';

import { PayloadType } from '@Interfaces';

declare namespace IAddTrackerPage {
  interface IProps extends WithTranslation {
    errors: {
      device_id: number;
      imei: number;
    };
    isRequesting: boolean;
    checkDeviceAssignedAction(data: PayloadType): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }
}

export default IAddTrackerPage;
