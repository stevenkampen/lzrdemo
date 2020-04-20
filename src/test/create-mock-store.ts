import { path } from 'ramda';
import { AnyAction, applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { Action } from '../types';

import { appEpic } from '../ui/store/app.epics';
import { Store, UIAppState } from '../ui/store/app.types';

type MockStore<S> = {
  readonly state: Partial<S>;
  readonly reducers: { [key: string]: Reducer<any> };
  readonly epics?: Epic<Action<any>, Action<any>, Partial<UIAppState>>;
};

type Update = {
  readonly update: (s: string[]) => void;
};

export const createMockStore = <S = UIAppState>({
  state,
  reducers,
  epics,
}: MockStore<S>): Store<Partial<S>> & Update => {
  const middlewares: any = [];
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, UIAppState>();
  if (epics) {
    middlewares.push(epicMiddleware);
  }

  epicMiddleware.run(appEpic);

  const store = createStore(
    combineReducers(reducers),
    state,
    epics ? applyMiddleware(...middlewares) : undefined,
  );

  // @ts-ignore
  return {
    ...store,
    update: (propertyPath: string[]) => {
      return new Promise((resolve, reject) => {
        let currentValue: any;
        const unsubscribe = store.subscribe(() => {
          // tslint:disable-next-line
          let previousValue = currentValue;
          currentValue = path(propertyPath, store.getState());
          if (previousValue !== currentValue) {
            resolve(currentValue);
          } else {
            reject(false);
          }
          unsubscribe();
        });
      });
    },
  };
};
