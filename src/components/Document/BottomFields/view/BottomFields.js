import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';

import FooterText from './FooterText';

import styles from './BottomFields.module.scss';

const stackTokens = { childrenGap: 10 };

const BottomFields = () => {
  return (
    <Stack tokens={stackTokens} className={styles.wrapper}>
      <FooterText />
    </Stack>
  );
};

export default BottomFields;
