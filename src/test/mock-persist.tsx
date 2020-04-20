jest.mock('redux-persist/es/integration/react', () => {
  const React = require('react');
  return {
    PersistGate: ({ children }: { children: any }) => <div>{children}</div>,
  };
});
