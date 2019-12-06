import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { Organisation } from 'src/organisation/organisation.model';
import {Router} from '@angular/router';
import { ChatService } from 'src/organisation/services/chatService';


@Component({
  selector: 'app-prd-organisation-component',
  templateUrl: './organisation.component.html',
})
export class OrganisationComponent implements OnInit, OnDestroy {

  orgData: Organisation;
  organisationSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromStore.OrganisationState>,
    private chatService: ChatService
  ) { }


  ngOnInit(): void {
    this.chatService.onNewMessage().subscribe(msg => {
      console.log('got a msg: ', msg);
    });
    this.organisationSubscription = this.store.pipe(select(fromStore.getOrganisationSel)).subscribe(( data) => {
      this.orgData = data;
    });
    this.chatService.sendMessage('test something something1');
  }

  ngOnDestroy() {
    this.organisationSubscription.unsubscribe();
  }

}
