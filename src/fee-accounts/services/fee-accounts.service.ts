import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map} from '../../../node_modules/rxjs/operators';
import {Payment, Payments} from '../models/pba-transactions';
import {feeAccountsDummy, PbaAccountsMock} from '../mock/pba-accounts.mock';
import {PbaAccounts} from '../models/pba-accounts';
import {SingleAccontSummary} from '../models/single-account-summary';
import {SingleAccontSummaryMock} from '../mock/sngleAccontSummary.mock';

@Injectable()
export class FeeAccountsService {
  constructor(private http: HttpClient) {
  }

  fetchFeeAccounts(): Observable<Array<PbaAccounts>> {
    const obj: PbaAccounts[] = PbaAccountsMock;
    return of(obj);
  }
  // Overview load
  fetchSingleFeeAccount(payload): Observable<SingleAccontSummary> {
    const obj: SingleAccontSummary = SingleAccontSummaryMock;
    return of(obj);
  }
  fetchPbAAccountTransactions(payload): Observable<any> {
    return of({});
  }

}
