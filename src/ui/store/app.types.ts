import { AnyAction, Reducer, Store as ReduxStore } from 'redux';

import { ContactsState } from 'src/ui/domains/contacts/store/contacts.types';

export type BaseAppState = {
  blank: any;
};

export type AsyncAppState = {
  readonly contacts: ContactsState;
};

export type UIAppState = BaseAppState & AsyncAppState;

export type AsyncReducers = { [P in keyof AsyncAppState]: Reducer<AsyncAppState[P]> };
export type BaseReducers = { [P in keyof BaseAppState]: Reducer<BaseAppState[P]> };

export type Reducers = BaseReducers & Partial<AsyncReducers>;

export type ReducerEntry<ReducerState, ReducerKey extends keyof UIAppState> = {
  readonly key: ReducerKey;
  readonly reducer: Reducer<ReducerState>;
};

export type Store<S> = ReduxStore<S, AnyAction>;
