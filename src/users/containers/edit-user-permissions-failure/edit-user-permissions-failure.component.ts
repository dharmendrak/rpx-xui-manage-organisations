import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-edit-user-permissions-failure',
  templateUrl: './edit-user-permissions-failure.component.html'
})
export class EditUserPermissionsFailureComponent implements OnInit {

  public userId: string;

  constructor(private readonly userStore: Store<fromStore.UserState>,
              private readonly route: ActivatedRoute) {
  }

  /**
   * ngOnInit
   *
   * We reset the edit user failure state so that the User can Edit a user permissions again.
   *
   * We use the userId from the url parameters so that we are able to direct the User back
   * to the Edit Permissions page when they click on the User permissions link.
   */
  public ngOnInit(): void {
    this.userStore.dispatch(new fromStore.EditUserFailureReset());

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
  }

  public getEditUserPermissionsLink = (userId: string) => `/users/user/${userId}`;
}
