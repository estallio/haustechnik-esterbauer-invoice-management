import React from 'react';

import { useSelector } from 'react-redux';

import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

import { selectDocumentData } from '../../../redux/DocumentData';

import styles from './Id.module.scss';

const Id = () => {
  const id = useSelector((state) => selectDocumentData(state).id || '');

  return (
    <Stack className={styles.wrapper}>
      <Text variant="xSmall" nowrap block>
        Id: {id}
      </Text>
    </Stack>
  );
};

export default Id;
