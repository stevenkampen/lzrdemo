import { combineEpics, Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Action, PayloadAction } from '../../types';

import { UIAppState } from './app.types';

export const rootEpic = combineEpics<
  Action<string> | PayloadAction<string, any>,
  Action<string> | PayloadAction<string, any>,
  UIAppState
>();

const epic$ = new BehaviorSubject(rootEpic);

// export const appEpic: Epic<Action<string>, Action<string>, UIAppState> = (action$, store) => {
//   const c = epic$.pipe(mergeMap(epic => epic(action$, store, null)));
//   return c;
// };

export const appEpic = (action$: any, store: any) => {
  const c = epic$.pipe(mergeMap(epic => epic(action$, store, null)));
  return c;
};

export const injectEpic = (asyncEpic: Epic<Action<string, any>, Action<string>, UIAppState>) =>
  epic$.next(asyncEpic);
