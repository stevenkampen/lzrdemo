import { cleanupMockEndpoints, mockGetContactsEndpoint } from '../../test';

import { getContactsMockResponse } from './get-contacts.mocks';
import { getContactsService } from './get-contacts.service';

describe('get contacts test', () => {
  beforeAll(() => {
    mockGetContactsEndpoint({ status: 200, body: getContactsMockResponse });
  });
  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should bootstrap a service that calls the get contacts endpoint', async () => {
    const data = await getContactsService({ page: 1 });
    expect(data).toEqual(getContactsMockResponse);
  });
});
