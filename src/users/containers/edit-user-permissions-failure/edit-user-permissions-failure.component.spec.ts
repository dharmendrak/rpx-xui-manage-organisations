import { EditUserPermissionsFailureComponent } from './edit-user-permissions-failure.component';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';

describe('Edit User Permission Component Component', () => {

  let component: EditUserPermissionsFailureComponent;
  let userStoreSpy;
  let routerStoreSpy;

  beforeEach(() => {
    userStoreSpy = jasmine.createSpyObj('Store', ['pipe', 'select', 'dispatch']);
    routerStoreSpy = jasmine.createSpyObj('Store', ['pipe', 'select', 'dispatch']);
    component = new EditUserPermissionsFailureComponent(userStoreSpy, routerStoreSpy);
  });

  describe('EditUserPermissionsFailureComponent is Truthy', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('getEditUserPermissionsLink()', () => {
    it('should return a link to the user page', () => {

      const USER_ID = '5fe34csdf-dfs9-424c-x0sd2-23test';
      const editUserPermissionsLink = `/users/user/${USER_ID}`;
      expect(component.getEditUserPermissionsLink(USER_ID)).toEqual(editUserPermissionsLink);
    });
  });

  describe('ngOnInit()', () => {
    it('should call dispatch on the store with an action.', () => {

      userStoreSpy.dispatch.and.returnValue('j:["caseworker", "pui-case-manager"]');

      component.ngOnInit();
      expect(userStoreSpy).toHaveBeenCalled();
    });
  });
  // describe('EditUserPermissionComponent', () => {
  //   it('getbackUrl', () => {
  //     expect(component.getBackurl('1234')).toEqual('/users/user/1234');
  //   });
  // });
  //
  // describe('EditUserPermissionComponent', () => {
  //   it('getIsPuiCaseManager', () => {
  //     const user = {manageCases: 'Yes'};
  //     expect(component.getIsPuiCaseManager(user)).toEqual(true);
  //   });
  // });
  //
  // describe('EditUserPermissionComponent', () => {
  //   it('getIsPuiOrganisationManager', () => {
  //     const user = {manageOrganisations: 'Yes'};
  //     expect(component.getIsPuiOrganisationManager(user)).toEqual(true);
  //   });
  // });
  //
  // describe('EditUserPermissionComponent', () => {
  //   it('getIsPuiUserManager', () => {
  //     const user = {manageUsers: 'Yes'};
  //     expect(component.getIsPuiUserManager(user)).toEqual(true);
  //   });
  // });
  //
  // describe('EditUserPermissionComponent', () => {
  //   it('unsubscribe', () => {
  //     const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
  //     expect(component.unsubscribe(subscription));
  //     expect(subscription.unsubscribe).toHaveBeenCalled();
  //   });
  // });
});
