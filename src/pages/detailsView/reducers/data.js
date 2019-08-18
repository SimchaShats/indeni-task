import { fromJS, Map } from 'immutable';

const initialState = Map();

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAILS_VIEW_USER_FETCH':
      return state.setIn(['user', action.id], fromJS(action.user));
    case 'DETAILS_VIEW_UPDATE':
      return state.mergeDeepIn(['user', action.id], action.form)
        .setIn(['user', action.id, 'id'], action.id);
    case 'DETAILS_VIEW_DELETE':
      return state.deleteIn(['user', action.id]);
    default:
      return state
  }
};

export default data;