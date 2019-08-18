import { createSelector } from 'reselect'

export const makeComplexUsersList = () => createSelector(
  state => state.getIn(['gridView', 'data', 'list']),
  state => state.getIn(['gridView', 'data', 'info']),
  (list, info) => list && list.map(id => info.get(id)),
);