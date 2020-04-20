import { mount } from 'enzyme';
import * as React from 'react';

import { of } from 'rxjs';

import { Bundle } from './bundle.component';

describe('bundle.component tests', () => {
  const TestComponent: React.StatelessComponent<any> = () => <h1>Test</h1>;

  it('should resolve an async function to load a bundle', () => {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      const mounted = mount(
        <Bundle
          bundleWillLoad={() => {
            resolve({
              component: TestComponent,
              reducerEntry: {
                key: 'counter',
                reducer: () => null,
              },
              rootEpic: () => of(null),
            });
            return promise;
          }}
          bundleDidLoad={(Component: React.StatelessComponent<any>) => <Component />}
        />,
      );
      return promise.then(() => mounted.update()).then(() => {
        expect(mounted.contains(<h1>Test</h1>)).toBeTruthy();
      });
    });
  });
});
