// load login form
import { Action } from '@ngrx/store';
import {UserListApiModel} from '../../models/userform.model';

export const ADD_FORM_DATA = '[Invite User] Load From Data';
export const UPDATE_ERROR_MESSAGES = '[Invite User] Update Error Messages';

export class AddFromData {
  readonly type = ADD_FORM_DATA;
  constructor(public payload: any) {}
}

export class UpdateErrorMessages implements Action {
  readonly type = UPDATE_ERROR_MESSAGES;
  constructor(public payload: any) { }
}

export const SEND_INVITE_USER = '[User] Invite Users';
export const INVITE_USER_SUCCESS = '[User] Invite Users Success';
export const INVITE_USER_FAIL = '[User] Invite Users Fail';

export class SendInviteUser {
  readonly type = SEND_INVITE_USER;
  constructor(public payload: UserListApiModel) {}
}

export class InviteUserSuccess implements Action {
  readonly type = INVITE_USER_SUCCESS;
  constructor(public payload: any) { }  // TODO add type list of users
}

export class InviteUserFail implements Action {
  readonly type = INVITE_USER_FAIL;
  constructor(public payload: any) { }
}

export type InviteUserActions =
  | AddFromData
  | UpdateErrorMessages
  | SendInviteUser
  | InviteUserSuccess
  | InviteUserFail;
