import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-prd-user-details-component',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user$: Observable<any>;
  isLoading$: Observable<boolean>;
  user: any;

  userSubscription: Subscription;
  dependanciesSubscription: Subscription;

  actionButtons: {name: string, class: string, action: any}[];

  constructor(
    private userStore: Store<fromStore.UserState>,
    private routerStore: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.userStore.pipe(select(fromStore.getGetUserLoading));

    this.dependanciesSubscription = combineLatest([
      this.routerStore.pipe(select(fromRoot.getRouterState)),
      this.userStore.pipe(select(fromStore.getGetUserLoaded))
    ]).subscribe(([route, users]) => {
      if (users === false) {
        this.userStore.dispatch(new fromStore.LoadUsers());
      }
      const userId = route.state.params.userId;
      this.user$ = this.userStore.pipe(select(fromStore.getGetSingleUser, { userIdentifier: userId }));
    });

    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;

      if (this.user && this.user.status === 'Active') {

        this.actionButtons = [
          {
            name: 'Suspend access',
            class: 'hmcts-menu__item hmcts-button--secondary hmcts-page-heading__action',
            action: this.goToSuspendConfirmation
          }
        ];
      }
    });


  }

  ngOnDestroy() {

    if (this.dependanciesSubscription) {
      this.dependanciesSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  isSuspended(status) {
    return status === 'Suspended';
  }

  goToSuspendConfirmation() {
    alert();
  }

}

