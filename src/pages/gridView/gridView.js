import { gridViewNavThunk } from './thunks/dataThunks';

export const routes = {
  '/gridView': () => dispatch => dispatch(gridViewNavThunk({ page: 'gridView' })),
};
