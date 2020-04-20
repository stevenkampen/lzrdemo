import 'core-js/fn/array/fill';
import 'core-js/fn/array/from';
import 'core-js/fn/math/trunc';
import 'core-js/fn/number/is-nan';
import 'core-js/fn/object/values';
import 'core-js/fn/string/repeat';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { ContactsBundle } from 'src/ui/bundles/contacts';
import { store } from './store/app.store';

export const App: React.SFC<{}> = () => (
  <Provider store={store}>
    <NativeRouter>
      <ContactsBundle />
    </NativeRouter>
  </Provider>
);

App.displayName = 'App';
