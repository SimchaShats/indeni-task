import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './pages/reducers';
import { routes } from './pages/pages';
import createRouterMiddleware, { processCurrentUrl } from 'redux-action-router';

const configureStore = (preloadedState) => {
  let routerMiddleware = createRouterMiddleware(routes);
  const composedEnhancers = composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware),
  );
  return createStore(rootReducer, preloadedState, composedEnhancers);
};

const store = configureStore();
processCurrentUrl();

export default store;
