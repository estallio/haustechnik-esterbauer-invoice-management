import React from 'react';
import { render } from 'react-dom';

import './init';

import './global.scss';

import Root from './containers/Root';

import { configureStore, history } from './store/configureStore';

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);

/*
import {
  Stack,
  CommandBarButton,
  PrimaryButton,
  ShimmeredDetailsList,
  SelectionMode,
} from '@fluentui/react';

const stackTokens = { childrenGap: 40 };

const columns = [
  {
    key: 'a',
    name: 'A',
    iconName: 'edit',
    fieldName: 'a',
  },
  {
    key: 'b',
    name: 'B',
    iconName: 'edit',
    fieldName: 'b',
  },
];

let items = null;

// not working because items-array is not a prop of the ShimmeredDetailsList
setTimeout(() => {
  items = [];
  items.push({ a: 'a', b: 'b' });
  items.push({ a: 'a', b: 'b' });
}, 5000);

render(
  <Stack horizontal tokens={stackTokens}>
    <CommandBarButton
      text="New item"
      iconProps={{ iconName: 'edit' }}
      title="Emoji"
    />
    <PrimaryButton text="Primary" allowDisabledFocus />
    <ShimmeredDetailsList
      setKey="items"
      items={items || []}
      columns={columns}
      selectionMode={SelectionMode.none}
      enableShimmer={!items}
    />
  </Stack>,
  document.getElementById('root'),
);
*/
