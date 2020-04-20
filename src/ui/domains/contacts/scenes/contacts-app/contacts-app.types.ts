import { ActionCreator, AnyAction } from 'redux';

export type ContactsAppDispatcherProps = {
  readonly initContactsData: () => void;
};

export type ContactsAppActionCreators = {
  [key in keyof ContactsAppDispatcherProps]: ActionCreator<AnyAction>
};

export type ContactsAppProps = {
} & ContactsAppDispatcherProps;
