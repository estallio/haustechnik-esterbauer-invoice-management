import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

// documents reducers
import documentsReducer from '../features/Documents/redux/Documents';
import searchBarDataReducer from '../features/Documents/redux/SearchBarData';
import listDataReducer from '../features/Documents/redux/ListData';

// document reducers
import documentStatusReducer from '../features/Document/redux/DocumentStatus';
import documentDataReducer from '../features/Document/redux/DocumentData';
import positionReducer from '../features/Document/redux/Positions';
import alternativesReducer from '../features/Document/redux/Alternatives';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    // documents reducers
    documents: documentsReducer,
    searchBarData: searchBarDataReducer,
    listData: listDataReducer,

    // document reducers
    documentStatus: documentStatusReducer,
    documentData: documentDataReducer,
    positions: positionReducer,
    alternatives: alternativesReducer,
  });

export default createRootReducer;
