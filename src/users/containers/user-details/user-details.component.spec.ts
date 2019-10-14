import { UserDetailsComponent } from './user-details.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRoot from '../../../app/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsersService } from '../../services';

const storeMock = jasmine.createSpyObj('Store', [
    'dispatch', 'pipe'
]);

const usersServiceMock = jasmine.createSpyObj('UserService', [
    'getListOfUsers'
]);

fdescribe('Invite User Success Component', () => {

    let fixture: ComponentFixture<UserDetailsComponent>;
    let component: UserDetailsComponent;
    let store: Store<fromStore.UserState>;

    beforeEach((() => {
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
                { provide: Store, useValue: storeMock},
                { provide: UsersService, useValue: usersServiceMock }
            ]
        }).compileComponents();

        store = TestBed.get(Store);

        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should have a component', () => {
        usersServiceMock.pipe.and.returnValue([]);
        storeMock.pipe.and.and.returnValue(of('value')).returnValue(of(true));
        expect(component).toBeTruthy();
    });
});
