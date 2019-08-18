import { detailsViewNavThunk } from './thunks/dataThunks';

export const routes = {
  '/detailsView/:id': ({ id }) => dispatch => dispatch(detailsViewNavThunk({ page: 'detailsView', data: { id } })),
};
