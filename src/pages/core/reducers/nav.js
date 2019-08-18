import { fromJS, Map } from 'immutable';

const initialState = Map();

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CORE_NAV_TO_PAGE':
      return state.set('page', action.page)
        .set('data', fromJS(action.data));
    default:
      return state
  }
};

export default data;