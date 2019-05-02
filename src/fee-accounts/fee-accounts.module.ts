import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {feeAccountsRouting} from './fee-accounts.routing';
import {SharedModule} from '../shared/shared.module';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';
import {StoreModule} from '@ngrx/store';

import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
// import { AccountOverviewComponent } from './containers/account-overview/account-overview.component';
// import { AccountSummaryComponent } from './containers/account-summary/account-summary.component';
// import { AccountTransactionsComponent } from './containers/account-transactions/account-transactions.component';
import {AccountsGuard} from './guards/accounts.guard';
import {AccountSummaryGuard} from './guards/acccounts-summary.guards';

export const GUARDS = [AccountsGuard, AccountSummaryGuard];
export const COMPONENTS = [
  // AccountOverviewComponent, AccountSummaryComponent, AccountTransactionsComponent
];

import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';
import { MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { AppConfig } from './app.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import {HttpModule} from '../../node_modules/@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    feeAccountsRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('feeAccounts', reducers),
    EffectsModule.forFeature(effects),
    CaseUIToolkitModule,
    MatDialogModule,
    CdkTableModule,
  ],
  exports: [...fromContainers.containers],
  declarations: [...fromContainers.containers, ...COMPONENTS],
  providers: [...fromServices.services, ...GUARDS,

    PlaceholderService,
    CasesService,
    CCDAuthService,
    HttpService,
    HttpErrorService,
    AlertService,
    DraftService,
    PageValidationService,
    CaseEditWizardGuard,
    RouterHelperService,
    DocumentManagementService,
    AppConfig,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    ScrollToService
  ]
})

/**
 * Entry point to FeeAccountsModule
 */

export class FeeAccountsModule {

}
