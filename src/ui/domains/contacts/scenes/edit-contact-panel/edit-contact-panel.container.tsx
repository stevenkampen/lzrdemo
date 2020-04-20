import { connect } from 'react-redux';
import { compose, mapProps, withState } from 'recompose';
import { withRouter } from 'react-router-native';

import { UIAppState } from 'src/ui/store/app.types';
import { mapDispatchers } from 'src/utils/map-dispatchers';

import { ContactEditPanelComponent } from '../../components/contact-edit-panel/contact-edit-panel.component';

import { updateContact } from '../../store/contacts.actions';
import { EditContactActionCreators } from './edit-contact-panel.types';

import { ContactEditPanelProps } from '../../components/contact-edit-panel/contact-edit-panel.types';
import { Contact } from 'src/services/get-contacts/get-contacts.types';

export const EditContactPanelContainer = compose<ContactEditPanelProps, ContactEditPanelProps>(
  withRouter,
  connect(
    (state: UIAppState, props: any) => ({
      contact: state.contacts.contactsMapping[props.match.params.contactId],
    }),
    mapDispatchers<EditContactActionCreators>({
      onSave: updateContact,
    }),
  ),
  mapProps<ContactEditPanelProps, ContactEditPanelProps>(props => {
    return {
      ...props,
      onCancel: () => props.history.goBack(),
      contactId: props.match.params.contactId,
      onSave: (contact: Partial<Contact>) => {
        props.onSave(contact);
        // props.history.goBack();
      },
    }
  }),
)(ContactEditPanelComponent);
