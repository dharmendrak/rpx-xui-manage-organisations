import { UserInviteConfirmationComponent } from './components/user-invite-confirmation/user-invite-confirmation.component';
// routes
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UsersComponent } from './containers';
import { UserFormComponent } from './containers/userform/user-form.component';
import {AuthGuard} from '../auth/guards/auth.guard';

export const ROUTES: Routes = [
    {
      path: '',
      component: UsersComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'invite-user',
      canActivate: [AuthGuard],
      children: [
        { path: '', component: UserFormComponent},
        { path: 'invite-confirmation', component: UserInviteConfirmationComponent }
      ]
    }
];


export const usersRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
