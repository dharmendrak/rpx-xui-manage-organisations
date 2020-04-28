import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ErrorMessage, GlobalError } from 'src/app/store/reducers/app.reducer';
import * as fromStore from '../../store';
import {EditUserFailureReset} from '../../store/actions';
// import {EditUserFailureReset} from '../../store/actions/user.actions';

@Component({
    selector: 'app-edit-user-permissions-failure',
    templateUrl: './edit-user-permissions-failure.component.html'
})
export class EditUserPermissionsFailureComponent implements OnInit {

    public userId: string;

    constructor(
      private readonly userStore: Store<fromStore.UserState>,
      private readonly route: ActivatedRoute,
    ) {
    }
    // public ngOnDestroy(): void {
    //     // this.store.dispatch(new fromAppStore.ClearGlobalError());
    // }
    public ngOnInit(): void {
      console.log('EditUserFailureComponent');

      this.userStore.dispatch(new fromStore.EditUserFailureReset());

      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      });

      console.log(this.userId);
    }

    public getEditUserPermissionsLink = (userId: string) => `/users/user/${userId}`;

    // public showErrorLinkWithNewTab(newTab?: boolean): string {
    //     return (newTab !== null && newTab === true) ? '_blank' : '_self';
    // }
}
