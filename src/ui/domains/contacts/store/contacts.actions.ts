import {
  ContactsActionType,
  UpdateContactAction,
} from './contacts.types';

import { GetContactsOptions, Contact } from 'src/services/get-contacts/get-contacts.types';
import { createAction, createPayloadAction } from 'src/ui/store/app.actions';

export const initContactsData = () =>
  createAction<ContactsActionType.INIT_CONTACTS_DATA>(ContactsActionType.INIT_CONTACTS_DATA);

export const getContacts = (options: GetContactsOptions) =>
  createPayloadAction<ContactsActionType.GET_CONTACTS, GetContactsOptions>(
    ContactsActionType.GET_CONTACTS,
    options,
  );

export const addNewContactsPage = (contactsResult: [Contact[], number, number]) =>
  createPayloadAction<ContactsActionType.ADD_CONTACTS, [Contact[], number, number]>(
    ContactsActionType.ADD_CONTACTS,
    contactsResult,
  );

export const updateContact: (contact: Contact) => UpdateContactAction = contact =>
  createPayloadAction<ContactsActionType.UPDATE_CONTACT, Contact>(ContactsActionType.UPDATE_CONTACT, contact);

export const apiError = (error: any) =>
  createPayloadAction<ContactsActionType.API_ERROR, any>(ContactsActionType.API_ERROR, error);
