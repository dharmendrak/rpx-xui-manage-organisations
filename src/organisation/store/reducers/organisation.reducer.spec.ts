import * as fromOrganisation from './organisation.reducer';
import * as fromActions from '../actions/organisation.actions';
import { Organisation } from 'src/organisation/organisation.model';


describe('OrganisationReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrganisation;
      const action = {} as any;
      const state = fromOrganisation.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });





  describe('LOAD_ORGANISATION action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromOrganisation;
      const action = new fromActions.LoadOrganisation();
      const state = fromOrganisation.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      // untouched props, good to add regardless
      expect(state.loaded).toEqual(false);
      // expect(state.organisation).toEqual([]);
    });
  });



  // fail
  describe('LOAD_ORGANISATION action', () => {
    it('should return the previous state', () => {
      const { initialState } = fromOrganisation;
      const previousState = { ...initialState, loading: false };
      const action = new fromActions.LoadOrganisationFail({});
      const state = fromOrganisation.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });



  // success
  describe('LOAD_ORGANISATION_SUCCESS action', () => {
    it('should populate users from the array', () => {

      const org = new Organisation({
        name: 'a@b.com',
        addressLine1: '10  oxford street',
        townCity: 'London',
        postcode: 'W1',
        houseNoBuildingName: 'house',
        addressLine2: '',
        country: 'UK'
      });

      const { initialState } = fromOrganisation;
      const action = new fromActions.LoadOrganisationSuccess(org);
      const state = fromOrganisation.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.organisationDetails).toEqual(org);
    });
  });


});
