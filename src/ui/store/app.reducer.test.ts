import { contactsReducer } from '../bundles/contacts';

import { createRootReducer, injectReducer } from './app.reducer';
describe('app.reducer tests', () => {
  it('should create the app root reducer', () => {
    expect(createRootReducer()).toBeDefined();
  });

  describe('injecting dynamically reducers', () => {
    afterAll(() => {
      jest.unmock('./app.reducer');
    });
    it('should inject a new reducer by replacing reducers', () => {
      // @ts-ignore
      getModule = jest.fn(() => ({
        hot: {
          accept: (cb: any) => cb(),
        },
      }));
      const storeMock = {
        dispatch: jest.fn(),
        persistor: {
          persist: jest.fn(),
        },
        replaceReducer: jest.fn(),
      };
      injectReducer(storeMock as any, { key: 'contacts', reducer: contactsReducer });
      expect(storeMock.replaceReducer).toHaveBeenCalled();
    });
  });
});
