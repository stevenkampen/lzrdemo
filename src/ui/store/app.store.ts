import { AnyAction, applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { appEpic } from './app.epics';
import { createRootReducer } from './app.reducer';
import { UIAppState } from './app.types';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, UIAppState>();

const middlewares = [epicMiddleware];

const colors: {[key: string]: any} = {
  _error: '#E33231',
  _start: '#03A9F4',
  _success: '#4CAF50',
  clear_: '#7C394B',
  default: '#383838',
  gigya: '#B25FD6',
  redirect: '#12505F',
  undefined: '#8ADBDE',
};
const createColorCache = () => {
  const colorCache: {[key: string]: any} = {};
  return (title: any) => {
    if (colorCache[title]) {
      return colorCache[title];
    }
    let color: any;
    Object.keys(colors).forEach(key => {
      if (!color && title.toLowerCase().match(key)) {
        color = colors[key];
        colorCache[title] = color;
      }
    });
    return color ? color : colors.default;
  };
};

const cachedColorMapper = createColorCache();
const logger = createLogger({
  collapsed: true,
  colors: {
    action: () => '#03A9F4',
    error: () => '#E33231',
    nextState: () => '#4CAF50',
    prevState: () => '#E33231',
    title: (action: any) => action.type && cachedColorMapper(action.type),
  },
  duration: true,
});
middlewares.push(logger);

export const store: ReduxStore<Partial<UIAppState>> = createStore(
  createRootReducer(),
  applyMiddleware(...middlewares),
);

epicMiddleware.run(appEpic);
