import { ContactsState } from '../../store/contacts.types';
import { NativeRouter } from 'react-router-native';

export type ContactsListDispatcherProps = {
  readonly gotoContactDetailRoute: (contactId: number) => void;
  readonly getNextPage: (page: number) => void;
};

export type ContactsListProps = {
  readonly contacts: ContactsState['contactsMapping'];
  readonly contactIdList: ContactsState['contactIdList'];
  readonly lastPage: number;
  readonly totalPages: number;
} & ContactsListDispatcherProps;
