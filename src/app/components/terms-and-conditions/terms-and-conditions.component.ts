import { Component, OnDestroy, OnInit } from '@angular/core';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TermsConditionsService } from 'src/shared/services/termsConditions.service';
import * as fromRoot from '../../store';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html'
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {
    public document: TCDocument = null;

    private readonly subscriptions: Subscription[] = [];

    public isTandCEnabled: boolean = false;

    constructor(private readonly store: Store<fromRoot.State>,
                private readonly termsAndConditionsService: TermsConditionsService) {
    }

    public ngOnInit() {
      this.termsAndConditionsService.isTermsConditionsFeatureEnabled().subscribe(enabled => {
        if (enabled) {
          this.isTandCEnabled = true;
          const s = this.store.pipe(
            select(fromRoot.getTermsAndConditions)
        ).subscribe(doc => {
            if (doc) {
                this.document = doc;
            } else {
                this.store.dispatch(new fromRoot.LoadTermsConditions());
            }
          });
          this.subscriptions.push(s);
          }
      });
    }

    public ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
