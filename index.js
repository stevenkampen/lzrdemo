/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src/ui/app';
import { name as appName } from './app-meta.json';

import React from 'react'
// import { Provider } from 'react-redux'

AppRegistry.registerComponent(appName, () => () => (
  // <Provider store={store}>
    <App />
  // </Provider>
));
