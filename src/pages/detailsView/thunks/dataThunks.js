import { coreNavToPage } from '../../core/actions';
import { detailsViewDelete, detailsViewUpdate, detailsViewUserFetch } from '../actions';
import { gridViewAddNew, gridViewDelete, gridViewUpdate } from '../../gridView/actions';
import { mockFetch } from '../../../mockData/mockUtils';
import uuid from 'uuid';
import { goToPage } from '../../../utils/navUtils';

export function detailsViewNavThunk({ page, data }) {
  return async (dispatch, getState) => {
    dispatch(coreNavToPage({ page, data }));

    if (data.id === 'newUser') {
      return;
    }

    if (getState().getIn(['detailsView', 'data', 'user', data.id])) return; // <-- In order to not override user updates on client
    const user = await mockFetch('getUser', data.id);
    dispatch(detailsViewUserFetch({ user, id: data.id }));
  };
}

export function detailsViewUpdateThunk({ id, form }) {
  return async (dispatch) => {
    if (!id) {
      id = uuid(); // Then need to update server and get from there realId (in real world), here it's only optimistic update
      dispatch(gridViewAddNew({ id, form }));
    } else {
      dispatch(gridViewUpdate({ id, form }));
    }
    dispatch(detailsViewUpdate({ id, form }));
    goToPage({ page: 'gridView' });
  };
}

export function detailsViewDeleteThunk({ id }) {
  return async (dispatch) => {
    dispatch(gridViewDelete({ id }));
    dispatch(detailsViewDelete({ id }));
    goToPage({ page: 'gridView' });
  };
}