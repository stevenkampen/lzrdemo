import { Contact } from 'src/services/get-contacts/get-contacts.types';

export type ContactEditPanelProps = {
  readonly contact: Contact;
  readonly setContact: (contact: Partial<Contact>) => void;
  readonly onSave: (contact: Partial<Contact>) => void;
  readonly onCancel: () => void;
  readonly history: any;
  readonly match: { params: { [key: string]: string }}
};
