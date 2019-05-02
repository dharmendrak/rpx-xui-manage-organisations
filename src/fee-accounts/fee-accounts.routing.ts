// routes
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../auth/guards/auth.guard';
import {OrganisationAccountsComponent} from './containers/overview/account-overview.component';
import {AccountsGuard} from './guards/accounts.guard';
import {editorRouting} from '@hmcts/ccd-case-ui-toolkit';
export const ROUTES: Routes = [
  {
    path: '',
    component: OrganisationAccountsComponent,
    canActivate: [
      AuthGuard,
      AccountsGuard
    ],
    children: editorRouting
  },
];


export const feeAccountsRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
