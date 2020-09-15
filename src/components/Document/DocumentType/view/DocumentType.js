import React from 'react';

import { useSelector } from 'react-redux';

import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

import { OFFER } from '../../../../database/constants';

import { getDocumentType } from '../redux/documentType';

import styles from './DocumentType.module.scss';

const DocumentType = () => {
  const documentType = useSelector(getDocumentType);

  return (
    <Stack className={styles.wrapper}>
      <Text variant="mega" nowrap block>
        {documentType === OFFER ? 'Angebot' : 'Rechnung'}
      </Text>
    </Stack>
  );
};

export default DocumentType;
