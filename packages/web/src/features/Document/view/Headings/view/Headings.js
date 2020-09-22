import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';

import Headline from './Headline';
import HeaderText from './HeaderText';

import styles from './Headings.module.scss';

const stackTokens = { childrenGap: 10 };

const Headings = () => {
  return (
    <Stack tokens={stackTokens} className={styles.wrapper}>
      <Headline />
      <HeaderText />
    </Stack>
  );
};

export default Headings;
