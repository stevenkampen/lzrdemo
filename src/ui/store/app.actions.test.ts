import { createAction, createPayloadAction } from './app.actions';

describe('app.actions tests', () => {
  it('should create an action', () => {
    expect(createAction('TEST_ACTION', { someMetaProp: true })).toEqual({
      meta: { someMetaProp: true },
      type: 'TEST_ACTION',
    });
  });

  it('should create an action with payload', () => {
    expect(createPayloadAction('TEST_ACTION_PAYLOAD', 123, { someMetaProp: true })).toEqual({
      meta: { someMetaProp: true },
      payload: 123,
      type: 'TEST_ACTION_PAYLOAD',
    });
  });
});
