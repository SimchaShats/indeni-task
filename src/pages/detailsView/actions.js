export const detailsViewUserFetch = ({ user, id }) => ({
  type: 'DETAILS_VIEW_USER_FETCH',
  user,
  id,
});

export const detailsViewUpdate = ({ id, form }) => ({
  type: 'DETAILS_VIEW_UPDATE',
  form,
  id,
});

export const detailsViewDelete = ({ id }) => ({
  type: 'DETAILS_VIEW_DELETE',
  id,
});

