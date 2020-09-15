import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import HeaderRow from '../AlternativeRows/HeaderRow';
import TextRow from '../AlternativeRows/TextRow';

import Title from '../../Shared/Title';
import Amount from '../../Shared/Amount';
import Unit from '../../Shared/Unit';
import Price from '../../Shared/Price';
import Sum from '../../Shared/Sum';
import Delete from '../../Shared/Delete';

import {
  selectAlternativeById,
  updateAlternative,
  removeAlternative,
} from '../../../redux/alternatives';

import styles from './AlternativeListItem.module.scss';

const multilineTokens = { childrenGap: 4 };

const AlternativeListItem = ({ alternativeId }) => {
  return (
    <>
      <Stack
        key={`alternativeWrapper-${alternativeId}`}
        horizontal
        disableShrink
        horizontalAlign="center"
        className={styles.wrapper}
      >
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>
        <Stack.Item className={styles.centerContainer}>
          <HeaderRow alternativeId={alternativeId} />
        </Stack.Item>
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>
      </Stack>

      <Stack
        horizontal
        disableShrink
        horizontalAlign="center"
        verticalAlign="center"
        className={styles.innerWrapper}
      >
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>

        <Stack.Item className={styles.centerContainer}>
          <Stack horizontal tokens={multilineTokens}>
            <Stack.Item>
              <Title
                id={alternativeId}
                select={selectAlternativeById}
                update={updateAlternative}
                className={styles.titleWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Amount
                id={alternativeId}
                select={selectAlternativeById}
                update={updateAlternative}
                className={styles.amountWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Unit
                id={alternativeId}
                select={selectAlternativeById}
                update={updateAlternative}
                className={styles.unitWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Price
                id={alternativeId}
                select={selectAlternativeById}
                update={updateAlternative}
              />
            </Stack.Item>

            <Stack.Item>
              <Sum id={alternativeId} select={selectAlternativeById} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item className={styles.sideContainer}>
          <Delete id={alternativeId} remove={removeAlternative} />
        </Stack.Item>
      </Stack>

      <Stack horizontal disableShrink horizontalAlign="center">
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>
        <Stack.Item className={styles.centerContainer}>
          <TextRow alternativeId={alternativeId} />
        </Stack.Item>
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>
      </Stack>
    </>
  );
};

AlternativeListItem.propTypes = {
  alternativeId: PropTypes.string.isRequired,
};

export default React.memo(AlternativeListItem);
