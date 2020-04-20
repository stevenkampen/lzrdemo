import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-native';

import { UIAppState } from 'src/ui/store/app.types';

import { ContactsList } from './contacts-list.component';
import { ContactsListProps } from './contacts-list.types';
import { getContacts } from '../../store/contacts.actions';

export const ContactsListContainer = 
  compose<ContactsListProps, ContactsListProps>(
    withRouter,
    connect(
      (state: UIAppState) => ({
        contacts: state.contacts && state.contacts.contactsMapping,
        contactIdList: state.contacts && state.contacts.contactIdList,
        lastPage: state.contacts && state.contacts.lastPage,
        totalPages: state.contacts && state.contacts.totalPages,
      }),
      (dispatch, ownProps: any) => ({
        gotoContactDetailRoute: (contactId: number) =>
          ownProps.history.push(`/edit/${contactId}`),
        getNextPage: (page: number) => dispatch(getContacts({ page })),
      }),
    )
)(ContactsList);
