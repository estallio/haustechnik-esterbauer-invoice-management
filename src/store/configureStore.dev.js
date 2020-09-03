import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { createBrowserHistory, createHashHistory } from 'history';
import {
  routerMiddleware as createRouterMiddleware,
  routerActions,
} from 'connected-react-router';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

import * as appActions from '../actions';

let history = createBrowserHistory({ basename: process.env.BASE_PATH });

if (process.env.USE_HASH_HISTORY) {
  history = createHashHistory({ basename: process.env.BASE_PATH });
}

const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Saga Middleware
  middleware.push(sagaMiddleware);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const routerMiddleware = createRouterMiddleware(history);
  middleware.push(routerMiddleware);

  // Redux DevTools Configuration
  const actionCreators = {
    ...appActions,
    ...routerActions,
  };

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
        trace: true,
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  // Start the saga
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(createRootReducer(history)),
    );
  }

  return store;
}

export default { configureStore, history };
