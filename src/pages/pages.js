import { routes as gridViewRoutes } from './gridView/gridView.js';
import { routes as detailsViewRoutes } from './detailsView/detailsView.js';

export const routes = {
  ...gridViewRoutes,
  ...detailsViewRoutes,
};