import React, { useCallback } from 'react';

import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import { TextField } from '@fluentui/react/lib/TextField';
import { selectAllPositions } from '../../../redux/Positions';

import {
  currencyFormat,
  getNumberErrorMessage,
  textToNumber,
} from '../../../../../utils/numberUtils';

import { GROUP } from '../../../../../database/constants';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

import styles from './Sum.module.scss';

const horizontalStackTokens = { childrenGap: 20 };

const Sum = () => {
  const dispatch = useDispatch();

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

  const tax = useSelector((state) => selectDocumentData(state).tax);

  const taxChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('tax', v)),
    [dispatch],
  );

  return (
    <Stack horizontal horizontalAlign="end">
      <Stack className={styles.widthWrapper}>
        <Stack
          tokens={horizontalStackTokens}
          horizontal
          horizontalAlign="space-between"
          className={styles.lineWrapper}
          verticalAlign="center"
        >
          <Stack.Item>
            <Text variant="medium">Netto</Text>
          </Stack.Item>

          <Stack.Item className={styles.textField}>
            <TextField
              suffix="€"
              value={currencyFormat(textToNumber(amount || 0), false)}
              readOnly
            />
          </Stack.Item>
        </Stack>

        <Stack
          tokens={horizontalStackTokens}
          horizontal
          horizontalAlign="space-between"
          className={styles.lineWrapper}
          verticalAlign="center"
        >
          <Stack.Item>
            <Text variant="medium">MwSt.</Text>
          </Stack.Item>

          <Stack.Item className={styles.textField}>
            <TextField
              suffix="%"
              onGetErrorMessage={getNumberErrorMessage}
              value={tax}
              onChange={taxChanged}
            />
          </Stack.Item>
        </Stack>

        <Stack
          tokens={horizontalStackTokens}
          horizontal
          horizontalAlign="space-between"
          className={[styles.lineWrapper, styles.resultLineWrapper]}
          verticalAlign="center"
        >
          <Stack.Item>
            <Text variant="medium">Gesamt</Text>
          </Stack.Item>

          <Stack.Item className={[styles.textField, styles.total]}>
            <Text variant="xLarge">
              {currencyFormat(
                (textToNumber(amount || 0) * (100 + textToNumber(tax || 0))) /
                  100,
                true,
              )}
            </Text>
          </Stack.Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Sum;
