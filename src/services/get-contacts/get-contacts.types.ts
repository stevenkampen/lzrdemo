import { Service } from '../service.types';

export type Contact = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type ContactTransportType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type GetContactsOptions = { page: number };

export type GetContactsResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ContactTransportType[];
};

export type GetContactsResult = [Contact[], number, number];

export type GetContactsService = Service<GetContactsOptions, GetContactsResult>;
