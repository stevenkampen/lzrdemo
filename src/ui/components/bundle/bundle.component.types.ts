import { ReactNode } from 'react';
import { Epic } from 'redux-observable';

import { ReducerEntry, UIAppState } from '../../store/app.types';

export type BundleData<Component, ReducerKey extends keyof UIAppState> = {
  readonly component: Component;
  readonly reducerEntry?: ReducerEntry<UIAppState[ReducerKey], ReducerKey>;
  readonly rootEpic?: Epic<any, any>;
};

export type BundleProps<Component, ReducerKey extends keyof UIAppState> = {
  readonly bundleWillLoad: () => Promise<BundleData<Component, ReducerKey>>;
  readonly bundleDidLoad: (comp: Component) => ReactNode;
};

export type BundleState<Component> = { readonly component?: Component };
