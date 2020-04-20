import { ConnectedRouter } from 'connected-react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

import { theme, ThemeProvider } from '../ui/theme';

export type MockProviderOptions = {
  children: any;
  store: any;
};

export const MockProvider = ({ children, store }: MockProviderOptions) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={createMemoryHistory()}>
        <Route path="/" component={() => children} />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
