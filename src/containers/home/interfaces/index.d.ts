import { WithTranslation } from 'next-i18next';

declare namespace DevicePage {
  interface IProps extends WithTranslation {
    isRequesting: boolean;
    devices: Device;
    fetchUserRequestedAction(): void;
  }

  interface InitialProps {
    namespacesRequired: string[];
  }
  interface Device {
    status: string;
    age: number;
    gps: boolean;
    device_id: number;
    device_name: string;
    icon_url: string;
    settings_id: number;
    icon_version: 1588171186000;
    type_id: number;
    type: string;
    location_id: number;
    lat: number;
    lng: number;
    speed: number;
    battery: number;
    is_triangulated: boolean;
    location_type: string;
    time: number;
  }
}

export default DevicePage;
