import React from 'react';
import dynamic from 'next/dynamic';
import { ITracker } from '@Interfaces';

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
  addContactRequest(data, eventTypes, callback): void;
  removeContactRequest(data, eventTypes, callback): void;
  eventTypes?: string;
  addContactPageRequest(data, callback): void;
  t(key: string): string;
  tracker: ITracker;
  errors: any;
  // contactOfTracker: number[];
}

export default function SelectContact(props: Props) {
  const { isMobile } = props;

  if (isMobile) {
    return <SelectContactSP {...props} />;
  }
  return <SelectContactPC {...props} />;
}
