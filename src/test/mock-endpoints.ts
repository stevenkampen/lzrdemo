const nock = require('nock');

export const cleanupMockEndpoints = () => nock.cleanAll();

export const mockEndpointUrls = {
  contacts: `https://reqres.in/api/users?page=1&per_page=3`,
};

export type MockEndpointOptions = {
  status: number;
  body: any;
};

export const mockGetContactsEndpoint = ({ status, body }: MockEndpointOptions) =>
  nock(mockEndpointUrls.contacts)
    .persist()
    .get('')
    .reply(status, body);
