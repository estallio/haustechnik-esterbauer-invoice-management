import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';

import Headings from '../Headings';
import BottomFields from '../BottomFields';
import MetaFields from '../MetaFields';
import DocumentType from '../DocumentType';
import PositionListContainer from '../Positions';

import styles from './styles.module.scss';

const WhitePageContainer = () => (
  <Stack disableShrink className={styles.minHeight100}>
    <Stack className={styles.root} horizontalAlign="center" disableShrink>
      <Stack className={styles.whitePageContainer}>
        <Stack.Item>
          <DocumentType />
        </Stack.Item>

        <Stack.Item>
          <MetaFields />
        </Stack.Item>

        <Stack.Item>
          <Headings />
        </Stack.Item>

        <Stack.Item grow>
          <PositionListContainer />
        </Stack.Item>

        <Stack.Item>
          <BottomFields />
        </Stack.Item>
      </Stack>
    </Stack>
  </Stack>
);

export default WhitePageContainer;
