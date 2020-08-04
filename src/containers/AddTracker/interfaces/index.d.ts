import { WithTranslation } from 'next-i18next';

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
