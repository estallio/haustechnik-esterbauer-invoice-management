import React from 'react';
import { render } from 'react-dom';

import './init';

import './global.scss';

import Root from './containers/Root';

import { configureStore, history } from './store/configureStore';

import { setUpDatabase } from './utils/testDataInserter';

const store = configureStore();

setUpDatabase(false).then(() => {
  render(
    <Root store={store} history={history} />,
    document.getElementById('root'),
  );
});
