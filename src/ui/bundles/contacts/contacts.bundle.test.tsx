import * as React from 'react';
import 'react-dates/initialize';

import { createMockStore, mockReducer } from '../../../test';
import { mountWithThemeConnected } from '../../../test/render-with-theme';

import { ContactsList } from '../../domains/contacts/scenes';

import { ContactsBundle } from './contacts.bundle';

describe.skip('Contacts bundle test suite', () => {
  let store: any;
  let tree: any;
  beforeAll(() => {
    const mockState = {};

    store = createMockStore({
      reducers: { mock: mockReducer },
      state: mockState,
    });

    tree = mountWithThemeConnected(<ContactsBundle />, store);
  });

  it('should mount the contacts list container', () => {
    // tslint:disable-next-line: no-console
    console.log(tree.debug());
    tree.update();
    expect(tree.contains(ContactsList)).toBeTruthy();
  });
});
