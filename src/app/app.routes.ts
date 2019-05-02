import { Routes } from '@angular/router';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'fee-accounts',
    pathMatch: 'full',
  },
  {
    path: 'fee-accounts',
    loadChildren: '../fee-accounts/fee-accounts.module#FeeAccountsModule'
  },
  {
    path: '**',
    redirectTo: '/fee-accounts',
    pathMatch: 'full'
  }
];

