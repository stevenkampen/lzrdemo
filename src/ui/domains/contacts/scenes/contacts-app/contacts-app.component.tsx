import * as React from 'react';

import { ContactsListContainer } from '../contacts-list/contacts-list.container';
import { EditContactPanelContainer } from '../edit-contact-panel/edit-contact-panel.container';
import { ContactsAppProps } from './contacts-app.types';
import { Route } from 'react-router-native';

export const ContactsApp: React.SFC<ContactsAppProps> = props => (
  <>
    <Route exact path="/" component={ContactsListContainer} />
    <Route path={`/edit/:contactId`} component={EditContactPanelContainer} />
  </>
);
