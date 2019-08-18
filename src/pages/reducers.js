import { combineReducers } from 'redux-immutable';
import core from './core/reducers';
import gridView from './gridView/reducers';
import detailsView from './detailsView/reducers';

export default combineReducers({
  core,
  gridView,
  detailsView,
});