import { fromJS, Map } from 'immutable';

const initialState = Map();

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CORE_UI_MODAL_OPEN':
      return state.setIn(['modal', action.name, 'open'], true)
        .setIn(['modal', action.name, 'data'], fromJS(action.data));
    case 'CORE_UI_MODAL_CLOSE':
      return state.setIn(['modal', action.name, 'open'], false);
    default:
      return state
  }
};

export default data;