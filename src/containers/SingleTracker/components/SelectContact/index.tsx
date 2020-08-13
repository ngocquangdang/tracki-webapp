import React from 'react';
import dynamic from 'next/dynamic';

const SelectContactSP = dynamic(() => import('./SelectContactSP'));
const SelectContactPC = dynamic(() => import('./SelectContactPC'));

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: Array<number>;
  contactAssigneds: object;
  contactAssignedIds: Array<number>;
  addContactRequest(data, eventTypes): void;
  removeContactRequest(data, eventTypes): void;
  eventTypes?: string;
  addContactAction(data, callback): void;
  t(key: string): string;
}

export default function SelectContact(props: Props) {
  const { isMobile } = props;

  if (isMobile) {
    return <SelectContactSP {...props} />;
  } else {
    return <SelectContactPC {...props} />;
  }
}
