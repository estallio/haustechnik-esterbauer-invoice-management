import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';

import Name from './Name';
import Address from './Address';
import Subject from './Subject';
import Date from './Date';
import DocumentId from './DocumentId';

import styles from './SharedStyles.module.scss';

const stackTokens = { childrenGap: 10 };

const horizontalStackTokens = { childrenGap: 40 };

const MetaFields = () => {
  return (
    <Stack tokens={horizontalStackTokens} horizontal className={styles.wrapper}>
      <Stack.Item grow>
        <Stack tokens={stackTokens}>
          <Stack.Item>
            <Name />
          </Stack.Item>

          <Stack.Item>
            <Address />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item grow>
        <Stack tokens={stackTokens}>
          <Subject />
          <Date />
          <DocumentId />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default MetaFields;
