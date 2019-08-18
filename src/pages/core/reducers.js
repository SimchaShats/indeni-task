import { combineReducers } from 'redux-immutable';
import nav from './reducers/nav';
import ui from './reducers/ui';

export default combineReducers({
  nav,
  ui,
});