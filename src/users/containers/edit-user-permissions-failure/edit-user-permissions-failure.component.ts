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
    constructor(
      private readonly userStore: Store<fromStore.UserState>,
    ) {
    }
    // public ngOnDestroy(): void {
    //     // this.store.dispatch(new fromAppStore.ClearGlobalError());
    // }
    public ngOnInit(): void {
      console.log('EditUserFailureComponent');

      this.userStore.dispatch(new fromStore.EditUserFailureReset());
        // this.currentError = {
        //     errors: [{bodyText: 'Try again later.', urlText: null, url: null, newTab: null}],
        //     header: 'Sorry, there is a problem with the service'
        // };
        // this.store.pipe(select(fromAppStore.getCurrentError))
        // .subscribe(error => {
        //     if (error) {
        //         this.currentError = error;
        //     }
        // });
    }

    // public showErrorLinkWithNewTab(newTab?: boolean): string {
    //     return (newTab !== null && newTab === true) ? '_blank' : '_self';
    // }
}
