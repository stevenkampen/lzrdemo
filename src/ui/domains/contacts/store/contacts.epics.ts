import { ActionsObservable, combineEpics, Epic, StateObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UIAppState } from 'src/ui/store/app.types';
import { apiError, getContacts, addNewContactsPage } from './contacts.actions';
import {
  APIErrorAction,
  ContactsActions,
  ContactsActionType,
  GetContactsAction,
} from './contacts.types';

import { getContactsService } from 'src/services/get-contacts';

import { GetContactsResult } from 'src/services/get-contacts/get-contacts.types';

export const handleInitContactsDataEpic: Epic<ContactsActions, ContactsActions, UIAppState> = (
  action$: ActionsObservable<ContactsActions>,
  store: StateObservable<UIAppState>,
) =>
  action$
    .ofType(ContactsActionType.INIT_CONTACTS_DATA)
    .pipe(map(() => getContacts({ page: 1 })));


export const getContactsEpic: Epic<GetContactsAction, any, UIAppState> = (action$, store$) =>
  action$.ofType(ContactsActionType.GET_CONTACTS).pipe(
    mergeMap<GetContactsAction, any>((action: GetContactsAction | APIErrorAction) =>
      from(
        getContactsService({ page: action.payload.page }),
      ).pipe(
        map((response: GetContactsResult) => addNewContactsPage(response)),
        catchError(e => {
          const a: APIErrorAction = apiError(e);
          return of(a);
        }),
      ),
    ),
  );

export const contactsRootEpic = combineEpics(
  handleInitContactsDataEpic,
  getContactsEpic,
);
