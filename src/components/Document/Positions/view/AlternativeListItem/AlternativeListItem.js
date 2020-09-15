import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import styles from '../Position/Position.module.scss';
import TitleColumn from '../AlternativeColumns/TitleColumn';
import AmountColumn from '../AlternativeColumns/AmountColumn';
import UnitColumn from '../AlternativeColumns/UnitColumn';
import PriceColumn from '../AlternativeColumns/PriceColumn';
import SumColumn from '../AlternativeColumns/SumColumn';
import DeleteColumn from '../AlternativeColumns/DeleteColumn';

import HeaderRow from '../AlternativeRows/HeaderRow';
import TextRow from '../AlternativeRows/TextRow';

const multilineTokens = { childrenGap: 4 };

const AlternativeListItem = ({ alternativeId }) => {
  return (
    <>
      <Stack
        key={`alternativeWrapper-${alternativeId}`}
        horizontal
        disableShrink
        horizontalAlign="center"
        style={{ paddingTop: 8 }}
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
        style={{ paddingTop: 8, paddingBottom: 5 }}
      >
        <Stack.Item className={styles.sideContainer}>
          <Text />
        </Stack.Item>

        <Stack.Item className={styles.centerContainer}>
          <Stack horizontal tokens={multilineTokens}>
            <Stack.Item>
              <TitleColumn
                alternativeId={alternativeId}
                className={styles.width360}
              />
            </Stack.Item>

            <Stack.Item>
              <AmountColumn
                alternativeId={alternativeId}
                className={styles.width60}
              />
            </Stack.Item>

            <Stack.Item>
              <UnitColumn
                alternativeId={alternativeId}
                className={styles.width120}
              />
            </Stack.Item>

            <Stack.Item>
              <PriceColumn alternativeId={alternativeId} />
            </Stack.Item>

            <Stack.Item>
              <SumColumn alternativeId={alternativeId} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item className={styles.sideContainer}>
          <DeleteColumn alternativeId={alternativeId} />
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
