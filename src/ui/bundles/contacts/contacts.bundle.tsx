import * as React from 'react';

import { Bundle } from '../../components/bundle';

export const ContactsBundle = () => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        ContactsAppContainer,
        contactsReducer,
        contactsRootEpic,
      } = await import(/* webpackChunkName: "contacts" */ '.');
      return {
        component: ContactsAppContainer,
        reducerEntry: {
          key: 'contacts',
          reducer: contactsReducer,
        },
        rootEpic: contactsRootEpic,
      };
    }}
    bundleDidLoad={Component => <Component />}
  />
);
