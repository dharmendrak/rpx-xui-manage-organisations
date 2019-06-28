import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as jwtDecode from 'jwt-decode';
import config from '../../../api/lib/config';

import * as fromAuth from '../store';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_BASE_URL: string;
  COOKIE_KEYS: { TOKEN: string; USER: string };

  constructor(
    private httpCilent: HttpClient,
    private cookieService: CookieService,
    private store: Store<fromAuth.AuthState>
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };
    this.API_BASE_URL = window.location.protocol + '//' + window.location.hostname;
    this.API_BASE_URL += window.location.port ? ':' + window.location.port : '';
  }

  generateLoginUrl() {
    const base = config.services.idamWeb;
    const clientId = config.idamClient;
    const callback = `${this.API_BASE_URL}${config.oauthCallbackUrl}`;
    return `${base}?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
  }

  getAuthHeaders() {
    interface HeaderObject {
      [key: string]: string;
    }
    const headers: HeaderObject = {
      Authorization: this.cookieService.get(this.COOKIE_KEYS.TOKEN),
      [this.COOKIE_KEYS.USER]: this.cookieService.get(this.COOKIE_KEYS.USER)
    };
    return headers;
  }
  // TODO ADD THIS TO ACTION AND DISPATCH
  loginRedirect() {
    window.location.href = this.generateLoginUrl();
  }

  decodeJwt(jwt) {
    // console.log('---JWT', jwtDecode(jwt))
    return jwtDecode(jwt);
  }

  isAuthenticated(): boolean {
    const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
    if (!jwt) {
      return false;
    }
    const jwtData = this.decodeJwt(jwt);
    const notExpired = jwtData.exp > Math.round(new Date().getTime() / 1000);

    if (notExpired) {
      this.store
        .pipe(
          select(fromAuth.getIsAuthenticated),
          take(1)
        )
        .subscribe(isAuthenticated => {
          if (!isAuthenticated) {
            this.store.dispatch(new fromAuth.LogInSuccess(jwtData));
          }
        });
    } else {
      this.store.dispatch(new fromAuth.LogOut());
    }
    return notExpired;
  }
}
