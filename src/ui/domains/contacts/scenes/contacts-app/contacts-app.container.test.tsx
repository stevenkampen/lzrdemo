import * as React from 'react';

import { createMockStore } from '../../../../../test';
import { mountWithThemeConnected } from '../../../../../test/render-with-theme';

import { contactsReducer } from '../../store/contacts.reducer';
import { ContactsState } from '../../store/contacts.types';

import { ContactsApp } from './contacts-app.component';
import { ContactsAppContainer } from './contacts-app.container';

describe('Contacts App Container test suite', () => {
  let store: any;
  let tree: any;
  beforeAll(() => {
    const mockState: ContactsState = {
      contactsMapping: {},
      contactIdList: [],
      lastPage: undefined,
      totalPages: undefined,
      apiError: undefined,
    };

    store = createMockStore({
      reducers: { contacts: contactsReducer },
      state: mockState,
    });

    tree = mountWithThemeConnected(<ContactsAppContainer />, store);
  });

  it('should mount the contacts list container', () => {
    expect(tree.find(ContactsAppContainer).props().contactIdList).toBe([]);
  });
});
