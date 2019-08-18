export const gridViewUsersFetch = ({ list, info }) => ({
  type: 'GRID_VIEW_USERS_FETCH',
  list,
  info,
});

export const gridViewUpdate = ({ id, form }) => ({
  type: 'GRID_VIEW_UPDATE',
  form,
  id,
});

export const gridViewAddNew = ({ id, form }) => ({
  type: 'GRID_VIEW_ADD_NEW',
  form,
  id,
});

export const gridViewDelete = ({ id }) => ({
  type: 'GRID_VIEW_DELETE',
  id,
});
