import { UserDetailsComponent } from './user-details.component';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from '../../services';



const userStateDummy = {
    invitedUsers: {
        userList: [],
        loaded: false,
        loading: false
    },
    inviteUser: {
        inviteUserFormData: {},
        errorMessages: {},
        isFormValid: true,
        errorHeader: '',
        isUserConfirmed: false
    }
};

const routerStateDummy = {
    routerReducer: {
        state: {
            url: '/users',
            queryParams: {},
            params: {}
        },
        navigationId: 1
    },
    appState: {
        allNavItems: {
            'pui-organisation-manager': {
                text: 'Organisation',
                href: '/organisation',
                active: false,
                orderId: 1
            },
            'pui-user-manager': {
                text: 'Users',
                href: '/users',
                active: false,
                orderId: 2
            },
            'pui-finance-manager': {
                text: 'Fee Accounts',
                href: '/fee-accounts',
                active: false,
                orderId: 3
            }
        },
        pageTitle: 'Users - Manage organisation',
        userNav: {
            label: 'Account navigation',
            items: [
                {
                    text: 'Sign out',
                    emit: 'sign-out'
                }
            ]
        },
        navItems: [
            {
                text: 'Organisation',
                href: '/organisation',
                active: false,
                orderId: 1
            },
            {
                text: 'Users',
                href: '/users',
                active: false,
                orderId: 2
            },
            {
                text: 'Fee Accounts',
                href: '/fee-accounts',
                active: false,
                orderId: 3
            }
        ],
        headerTitle: {
            regOrg: {
                name: 'Register to manage civil and family law cases',
                url: '/register-org/register/'
            },
            manageOrg: {
                name: 'Manage organisation details for civil and family law cases',
                url: '/'
            }
        },
        jurisdictions: []
    }
};

const usersServiceMock = jasmine.createSpyObj('UserService', [
    'getListOfUsers'
]);

export class MockedStore {
    private state: BehaviorSubject<any> = new BehaviorSubject(undefined);

    setState(data) {
        this.state.next(data);
    }

    pipe(selector?: any): Observable<any> {
        return this.state.asObservable();
    }

    dispatch(action: any) { }
}

fdescribe('User Details Component', () => {

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

    it('should have a component', inject([Store, Store], (
        testUserStore: MockedStore,
        testRouterStore: MockedStore
    ) => {
        testUserStore.setState(userStateDummy);
        testRouterStore.setState(routerStateDummy);
        component.user$ = of({
            userIdentifier: 'cfeba78e-ff81-49d5-8a65-55fa2a9c2424',
            firstName: 'Philip',
            lastName: 'james',
            email: 'philip.aberneithy@gmail.com',
            idamStatus: 'PENDING',
            idamStatusCode: ' ',
            idamMessage: '19 No call made to SIDAM to get the user roles as user status is ‘Pending’',
            fullName: 'Philip james',
            selected: false,
            status: 'Active'
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));
});
