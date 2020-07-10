import React from 'react';
import dynamic from 'next/dynamic';

import SideBar from '@Components/sidebars';
import TabPanel from '@Components/sidebars/tabPanel';

const ListTracker = dynamic(() => import('./tabs/trackers'));
const ListGeoFence = dynamic(() => import('./tabs/geofence'));

export default function SiderBar() {
  // const [value, setValue] = useState(0);
  const labels = [
    { label: 'Trackers', key: 0 },
    { label: 'Geo-Fence', key: 1 },
  ];
  const sites = [
    { site: <ListTracker />, placeholder: 'Search devices by name or ID' },
    { site: <ListGeoFence />, placeholder: 'Search geo-fences by name' },
  ];
  // const handleChange = (event: any, newValue: any) => {
  //   setValue(newValue);
  // };
  return (
    <SideBar label={labels} indexStart={0}>
      {sites.map((site: any, index) => (
        <TabPanel value={index} index={index} placeholder={site.placeholder}>
          <span>content</span>
        </TabPanel>
      ))}
      {/* <TabPanel
        value={value}
        index={0}
        placeholder="Search devices by name or ID"
      >
        <ListTracker />
      </TabPanel>
      <TabPanel value={value} index={1} placeholder="Search geo-fences by name">
        <ListGeoFence />
      </TabPanel> */}
    </SideBar>
  );
}
