import { combineReducers, Reducer } from 'redux';

import {
  AsyncAppState,
  AsyncReducers,
  ReducerEntry,
  Reducers,
  Store,
  UIAppState,
} from './app.types';

const asyncReducers: Partial<AsyncReducers> = {};

const replaceReducers = (store: any) => {
  const c = createRootReducer();
  return store.replaceReducer(c);
}

const moduleReducers: any = {};

const createModuleReducers = () =>
  Object.keys(moduleReducers).reduce((acc: { [key: string]: any }, key) => {
    acc[key] = combineReducers(moduleReducers[key]);
    return acc;
  }, {});

export const createRootReducer = () => {
  const appInitialState: Reducers = {
    ...asyncReducers,
    ...createModuleReducers(),
    blank: (s: any) => s ? s : {},
  };
  return combineReducers(appInitialState);
};

export const injectReducer = <ReducerKey extends keyof AsyncAppState>(
  store: Store<Partial<UIAppState>>,
  { key, reducer }: ReducerEntry<AsyncAppState[ReducerKey], ReducerKey>,
) => {
  if (typeof asyncReducers[key] !== 'undefined') {
    return;
  }
  asyncReducers[key] = reducer;
  replaceReducers(store as Store<UIAppState>);
};
