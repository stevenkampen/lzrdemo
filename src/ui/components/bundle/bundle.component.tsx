import * as React from 'react';

import { injectEpic } from '../../store/app.epics';
import { injectReducer } from '../../store/app.reducer';
import { store } from '../../store/app.store';
import { AsyncAppState } from '../../store/app.types';

import { BundleProps, BundleState } from './bundle.component.types';

export class Bundle<T, ReducerKey extends keyof AsyncAppState> extends React.Component<
  BundleProps<T, ReducerKey>,
  BundleState<T>
> {
  constructor(props: BundleProps<T, ReducerKey>) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    const { component, reducerEntry, rootEpic } = await this.props.bundleWillLoad();
    if (reducerEntry) {
      injectReducer(store, reducerEntry);
    }
    if (rootEpic) {
      injectEpic(rootEpic);
    }
    this.setState({ component });
  }

  public render() {
    return this.state.component ? this.props.bundleDidLoad(this.state.component) : null;
  }
}
