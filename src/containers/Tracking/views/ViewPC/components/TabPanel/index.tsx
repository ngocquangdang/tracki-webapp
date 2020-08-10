import React from 'react';

interface Props {
  children: any;
  value?: number;
  index?: number;
  [data: string]: any;
}

export default function TabPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}
