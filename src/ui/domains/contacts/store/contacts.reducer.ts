import { Reducer } from 'redux';

import { ensureNever } from 'src/utils/typescript';

import { ContactsActionType, ContactsReducerActions, ContactsState } from './contacts.types';
import { Contact } from 'src/services/get-contacts/get-contacts.types';

export const INITIAL_STATE: ContactsState = {
  contactIdList: [],
  contactsMapping: {},
  apiError: undefined,
  lastPage: undefined,
  totalPages: undefined,
};

type MergeNewContactsType =
  (state: ContactsState, contactsResult: [Contact[], number, number]) =>
    {
      contactsMapping: ContactsState['contactsMapping'];
      contactIdList: ContactsState['contactIdList'];
      lastPage: number;
      totalPages: number;
    };

  const mergeNewContacts: MergeNewContactsType = (state, contactsResult) => {
  const contactsMapping = contactsResult[0].reduce((prev, curr) => {
    if (!(curr.id in prev)) {
      prev[curr.id] = curr;
    }
    return prev;
  }, { ...state.contactsMapping });

  return {
    contactsMapping,
    contactIdList: Object.keys(contactsMapping).map(k => parseInt(k, 10)).sort((a, b) => a - b),
    lastPage: !state.lastPage || state.lastPage < contactsResult[1] ? contactsResult[1] : state.lastPage,
    totalPages: contactsResult[2],
  };
};

export const contactsReducer: Reducer<ContactsState, ContactsReducerActions> = (
  state: ContactsState = INITIAL_STATE,
  action: ContactsReducerActions,
): ContactsState => {
  switch (action.type) {
    case ContactsActionType.ADD_CONTACTS:
      return {
        ...state,
        ...mergeNewContacts(state, action.payload),
      };
    case ContactsActionType.API_ERROR:
      return { ...state, apiError: action.payload };
    case ContactsActionType.UPDATE_CONTACT:
      return {
        ...state,
        contactsMapping: {
          ...state.contactsMapping,
          [action.payload.id]: action.payload,
        },
      };

    default:
      ensureNever(action);
  }
  return state;
};
