import React from 'react';
import dynamic from 'next/dynamic';

const ViewSP = dynamic(() => import('./views/AddNewContactSP'));
const ViewPC = dynamic(() => import('./views/AddNewContactPC'));

interface Props {
  showAddContact: boolean;
  onClose(): void;
  fetchSelectContact(): void;
  addContactAction(data, callback): void;
  t(key: string): string;
  isMobile: boolean;
}
export default function AddContactContainer(props: Props) {
  const { isMobile } = props;
  if (isMobile) {
    return <ViewSP {...props} />;
  } else {
    return <ViewPC {...props} />;
  }
}
