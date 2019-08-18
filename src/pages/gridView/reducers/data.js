import { fromJS, Map } from 'immutable';

const initialState = Map();

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'GRID_VIEW_UPDATE':
      return state.mergeDeepIn(['info', action.id], action.form);
    case 'GRID_VIEW_DELETE':
      const list = state.get('list');
      return list ? state.set('list', list.delete(list.findIndex(value => value === action.id), 1))
        .deleteIn(['info', action.id]) : state;
    case 'GRID_VIEW_ADD_NEW':
      return state.update('list', list => list.push(action.id))
        .setIn(['info', action.id], fromJS(action.form))
        .setIn(['info', action.id, 'id'], action.id);
    case 'GRID_VIEW_USERS_FETCH':
      return state.set('list', fromJS(action.list))
        .set('info', fromJS(action.info));
    default:
      return state
  }
};

export default data;