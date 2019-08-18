import { combineReducers } from 'redux-immutable';
import data from './reducers/data';

// Can be added other reducers in future development
export default combineReducers({
  data,
});