import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createBrowserHistory, createHashHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

let history = createBrowserHistory({ basename: process.env.BASE_PATH });

if (process.env.USE_HASH_HISTORY) {
  history = createHashHistory({ basename: process.env.BASE_PATH });
}

const rootReducer = createRootReducer(history);
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}

export default { configureStore, history };
