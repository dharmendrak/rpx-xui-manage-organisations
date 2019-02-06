import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

/**
 * Using health to check that outbound http calls from this application
 * to the Node layer work.
 */
export const ENVIRONMENT = {
  health: '/api/organisation/address'
}

const dummy = {
  name: 'xyz solicitors Ltd',
  address1: '11 Oxford Street',
  town: 'London',
  postcode: 'SE1 ABC',
}

@Injectable()
export class OrganisationService {
  constructor(private http: HttpClient) { }

  fetchOrganisation(): Observable<any> {
    console.log('fetch organisation')
    return this.http.get<any>(`${ENVIRONMENT.health}`);
    // return of(dummy)
  }
}
