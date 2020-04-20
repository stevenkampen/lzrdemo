import { GetContactsOptions, Contact } from 'src/services/get-contacts/get-contacts.types';
import { Action, PayloadAction } from 'src/types';
import { Diff } from 'src/utils/typescript';

export type ContactsState = {
  readonly apiError?: any;
  readonly contactsMapping: { [key: number]: Contact };
  readonly contactIdList: number[];
  readonly lastPage?: number;
  readonly totalPages?: number;
};

export enum ContactsActionType {
  API_ERROR = 'CONTACTS:API_ERROR',

  INIT_CONTACTS_DATA = 'CONTACTS:INIT_CONTACTS_DATA',
  GET_CONTACTS = 'CONTACTS:GET_CONTACTS',
  ADD_CONTACTS = 'CONTACTS:ADD_CONTACTS',
  UPDATE_CONTACT = 'CONTACTS:UPDATE_CONTACT',
}

export type APIErrorAction = PayloadAction<ContactsActionType.API_ERROR, any>;
export type GetContactsAction = PayloadAction<ContactsActionType.GET_CONTACTS, GetContactsOptions>;

export type InitContactsDataAction = Action<ContactsActionType.INIT_CONTACTS_DATA>;
export type AddContactsAction = PayloadAction<ContactsActionType.ADD_CONTACTS, [Contact[], number, number]>;

export type UpdateContactAction = PayloadAction<
  ContactsActionType.UPDATE_CONTACT, Contact
>;

export type ContactsEpicActions =
  | GetContactsAction
  | InitContactsDataAction;

export type ContactsActions =
  | APIErrorAction
  | GetContactsAction
  | InitContactsDataAction
  | UpdateContactAction
  | UpdateContactAction
  | AddContactsAction;

export type ContactsReducerActions = Diff<ContactsActions, ContactsEpicActions>;
