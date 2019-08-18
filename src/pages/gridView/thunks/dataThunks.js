import { coreNavToPage, coreUIModalOpen } from '../../core/actions';
import { gridViewAddNew, gridViewUsersFetch } from '../actions';
import { detailsViewUpdate, detailsViewUserFetch } from '../../detailsView/actions';
import { mockFetch } from '../../../mockData/mockUtils';
import uuid from 'uuid';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5hVKP3zB2XTgLGtLvDbczF3ZDWbjD5ki9uxZGkUD7AIhRr-n';

export function gridViewNavThunk({ page }) {
  return async (dispatch, getState) => {
    dispatch(coreNavToPage({ page }));

    if (getState().getIn(['gridView', 'data', 'list'])) return; // <-- In order to not override user updates on client; (because we don't have server update)
    //  <- It's not account a case if app started from user details page (but it's an edge case so we ignore for demo app)

    const { list, info } = await mockFetch('getUsers');
    dispatch(gridViewUsersFetch({ list, info }));
  };
}

export function gridViewUserOpenThunk({ id }) {
  return async (dispatch, getState) => {
    dispatch(coreUIModalOpen({ name: 'gridView', data: { id } }));

    if (getState().getIn(['detailsView', 'data', 'user', id])) return; // <-- In order to not override user updates on client
    const user = await mockFetch('getUser', id);
    dispatch(detailsViewUserFetch({ user, id }));
  };
}

export function gridViewAddRandomThunk() {
  return async (dispatch) => {
    // Edge case: Not working when reloding on Random user (because there is no server data)
    const id = uuid();
    const form = {
      id,
      address: `Some random address, ${ Math.floor(Math.random() * 120) + 1 }`,
      birthday: `${ Math.floor(Math.random() * 12) + 1 }/${ Math.floor(Math.random() * 12) + 1 }/${ Math.floor(
        Math.random() * 2000) + 1000 }`,
      imageUrl: DEFAULT_IMAGE,
      fullName: id.slice(0, 5),
      email: `${ id.slice(0, 4) }@email.com`,
    };
    dispatch(gridViewAddNew({ id, form }));
    dispatch(detailsViewUpdate({ id, form }));
  };
}