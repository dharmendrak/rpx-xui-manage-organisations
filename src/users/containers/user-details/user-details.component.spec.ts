import { UserDetailsComponent } from './user-details.component';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from '../../services';

const usersServiceMock = jasmine.createSpyObj('UserService', [
    'getListOfUsers'
]);

export class MockedStore {

    select(...params) {
        return params[0].name;
    }

    pipe(selector?: any): Observable<any> {
        let response: any = false;
        console.log(selector.arguments[0].name);
        // if (selector.includes('select(fromRoot.getRouterState)')) {
        //     response = { state: { params: { userId: 'user' } } };
        // } else {
        //     response = false;
        // }
        return of(response);
    }

    dispatch(action: any) { }
}

describe('User Details Component', () => {

    let fixture: ComponentFixture<UserDetailsComponent>;
    let component: UserDetailsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    feature: combineReducers(fromStore.reducers),
                }),
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                UserDetailsComponent
            ],
            providers: [
                { provide: Store, useClass: MockedStore },
                { provide: UsersService, useValue: usersServiceMock },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should have a component', () => {
        component.user$ = of({
            userIdentifier: 'cfeba78e',
            firstName: 'John',
            lastName: 'James',
            email: 'aaaa@gmail.com',
            idamStatus: 'PENDING',
            idamStatusCode: ' ',
            idamMessage: 'Doh',
            fullName: 'john james',
            selected: false,
            status: 'Active'
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
