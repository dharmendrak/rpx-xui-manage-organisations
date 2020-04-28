import {EditUserPermissionsFailureComponent} from './edit-user-permissions-failure.component';

describe('EditUserPermissionsFailureComponent', () => {
    it('Should create component', () => {
        const appStore = jasmine.createSpyObj('store', ['pipe']);
        const component = new EditUserPermissionsFailureComponent(appStore);
        expect(component).toBeTruthy();
    });

    it('showErrorLinkWithNewTab', () => {
        const appStore = jasmine.createSpyObj('store', ['pipe']);
        const component = new EditUserPermissionsFailureComponent(appStore);
        let result = component.showErrorLinkWithNewTab(null);
        expect(result).toEqual('_self');

        result = component.showErrorLinkWithNewTab(false);
        expect(result).toEqual('_self');

        result = component.showErrorLinkWithNewTab(true);
        expect(result).toEqual('_blank');
    });
});
