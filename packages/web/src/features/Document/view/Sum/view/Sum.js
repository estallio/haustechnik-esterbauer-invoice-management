import React from 'react';

import _ from 'lodash';

import { useSelector } from 'react-redux';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import { selectAllPositions } from '../../../redux/Positions';

import { currencyFormat, textToNumber } from '../../../../../utils/numberUtils';

import { GROUP } from '../../../../../database/constants';

import styles from './Sum.module.scss';

const horizontalStackTokens = { childrenGap: 20 };

const Sum = () => {
  const amount = useSelector((state) => {
    const positions = selectAllPositions(state);
    return _.reduce(
      positions,
      (sum, position) => {
        if (position.type === GROUP) {
          return sum;
        }

        return (
          sum +
          textToNumber(position.price || 0) * textToNumber(position.amount || 0)
        );
      },
      0,
    );
  });

  return (
    <Stack
      tokens={horizontalStackTokens}
      horizontal
      horizontalAlign="end"
      className={styles.wrapper}
    >
      <Stack.Item align="center">
        <Text variant="medium">Gesamt</Text>
      </Stack.Item>

      <Stack.Item>
        <Text variant="xLarge">{currencyFormat(amount, true)}</Text>
      </Stack.Item>
    </Stack>
  );
};

export default Sum;
