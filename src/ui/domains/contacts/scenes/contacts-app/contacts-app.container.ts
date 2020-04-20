import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { UIAppState } from 'src/ui/store/app.types';
import { ContactsApp } from './contacts-app.component';
import { ContactsAppActionCreators, ContactsAppProps } from './contacts-app.types';

import { mapDispatchers } from 'src/utils/map-dispatchers';
import { initContactsData } from '../../store/contacts.actions';

export const ContactsAppContainer = compose<ContactsAppProps, {}>(
  connect(
    (state: UIAppState) => ({
      contactsDataLoaded: !!state.contacts.contactIdList.length,
    }),
    mapDispatchers<ContactsAppActionCreators>({
      initContactsData,
    }),
  ),
  lifecycle<ContactsAppProps, void>({
    componentDidMount() {
      this.props.initContactsData();
    },
  }),
)(ContactsApp);
