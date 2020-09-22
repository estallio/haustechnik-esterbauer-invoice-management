import { configureStore as configureStoreRTK } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { createBrowserHistory, createHashHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

let history = createBrowserHistory({ basename: process.env.BASE_PATH });

if (process.env.USE_HASH_HISTORY) {
  history = createHashHistory({ basename: process.env.BASE_PATH });
}

const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

function configureStore(initialState) {
  const middleware = [];

  middleware.push(sagaMiddleware);
  middleware.push(routerMiddleware);

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(
      createLogger({
        level: 'info',
        collapsed: true,
      }),
    );
  }

  // Create Store with the redux toolkit helper
  // Advantage: serializable and immutable checks as well as dev tools are included
  const store = configureStoreRTK({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...middleware,
    ],
    preloadedState: initialState,
  });

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
