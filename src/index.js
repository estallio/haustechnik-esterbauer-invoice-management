import React from 'react';
import { render } from 'react-dom';

import 'moment/locale/de';

import './global.scss';

import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';

const stackTokens = { childrenGap: 40 };

render(
  <Stack horizontal tokens={stackTokens}>
    <DefaultButton text="Standard" allowDisabledFocus />
    <PrimaryButton text="Primary" allowDisabledFocus />
  </Stack>,
  document.getElementById('root'),
);
