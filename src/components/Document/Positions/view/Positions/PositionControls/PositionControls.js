import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import AddPositionButton from './AddPositionButton';
import AddGroupButton from './AddGroupButton';

import styles from './PositionControls.module.scss';

const PositionControls = () => {
  return (
    <Stack
      horizontal
      disableShrink
      horizontalAlign="center"
      className={styles.wrapper}
    >
      <Stack.Item className={styles.sideContainer}>
        <Text />
      </Stack.Item>
      <Stack.Item className={styles.centerContainer}>
        <AddPositionButton />
        <AddGroupButton />
      </Stack.Item>
      <Stack.Item className={styles.sideContainer}>
        <Text />
      </Stack.Item>
    </Stack>
  );
};

export default React.memo(PositionControls);
