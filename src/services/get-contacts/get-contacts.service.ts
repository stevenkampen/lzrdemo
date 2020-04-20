import { getJSON } from 'src/utils/service';

import { createService } from 'src/services/service';

import { getContactsMockResponse } from './get-contacts.mocks';
import {
  GetContactsOptions,
  GetContactsResponse,
  GetContactsResult,
  GetContactsService,
} from './get-contacts.types';

const getContactsTransform: (response: GetContactsResponse) => GetContactsResult = response =>
  [response.data.map(row => ({
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    avatar: row.avatar,
  })), response.page, response.total_pages];

const getContactsRequest = ({ page }: GetContactsOptions): Promise<GetContactsResponse> =>
  getJSON(`https://reqres.in/api/users?page=${page}&per_page=3`);

const mockGetContactsRequest = ({ page }: GetContactsOptions): Promise<GetContactsResponse> =>
  Promise.resolve(getContactsMockResponse);

export const getContactsService: GetContactsService = createService<
  GetContactsOptions,
  GetContactsResponse,
  GetContactsResult
>(getContactsRequest, getContactsTransform);

export const mockGetContactsService: GetContactsService = createService<
  GetContactsOptions,
  GetContactsResponse,
  GetContactsResult
>(mockGetContactsRequest, getContactsTransform);
