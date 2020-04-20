import { ActionCreator } from 'redux';
import { UpdateContactAction } from '../../store/contacts.types';

export type EditContactActionCreators = {
  onSave: ActionCreator<UpdateContactAction>;
};
