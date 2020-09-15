import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import Pos from '../../Shared/Pos';
import Title from '../../Shared/Title';
import Unit from '../../Shared/Unit';
import Amount from '../../Shared/Amount';
import Sum from '../../Shared/Sum';
import Price from '../../Shared/Price';
import Delete from '../../Shared/Delete';

import NoOfAlternatives from '../PositionRows/NoOfAlternatives';

import AdditionalText from '../../Shared/AdditionalText';

import AlternativeList from '../../Alternatives/AlternativeList';
import AddAlternative from '../../Alternatives/AlternativeRows/AddAlternative';

import {
  removePosition,
  updatePosition,
  selectPositionById,
} from '../../../redux/positions';

import styles from './Position.module.scss';

const multilineTokens = { childrenGap: 4 };

const Position = ({ positionId }) => {
  return (
    <Stack
      key={`positionWrapper-${positionId}`}
      tokens={multilineTokens}
      className={styles.rowWrapper}
    >
      <Stack
        horizontal
        disableShrink
        horizontalAlign="center"
        verticalAlign="center"
      >
        <Stack.Item className={styles.sideContainer}>
          <Pos select={selectPositionById} id={positionId} />
        </Stack.Item>

        <Stack.Item className={styles.centerContainer}>
          <Stack horizontal tokens={multilineTokens}>
            <Stack.Item>
              <Title
                id={positionId}
                select={selectPositionById}
                update={updatePosition}
                className={styles.titleWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Amount
                id={positionId}
                select={selectPositionById}
                update={updatePosition}
                className={styles.amountWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Unit
                id={positionId}
                select={selectPositionById}
                update={updatePosition}
                className={styles.unitWidth}
              />
            </Stack.Item>

            <Stack.Item>
              <Price
                id={positionId}
                select={selectPositionById}
                update={updatePosition}
              />
            </Stack.Item>

            <Stack.Item>
              <Sum
                id={positionId}
                select={selectPositionById}
                update={updatePosition}
              />
            </Stack.Item>
          </Stack>
        </Stack.Item>

        <Stack.Item className={styles.sideContainer}>
          <Delete id={positionId} remove={removePosition} />
        </Stack.Item>
      </Stack>

      <NoOfAlternatives positionId={positionId} />

      <Stack className={styles.additionalText}>
        <Stack horizontal disableShrink horizontalAlign="center">
          <Stack.Item className={styles.sideContainer}>
            <Text />
          </Stack.Item>
          <Stack.Item className={styles.centerContainer}>
            <AdditionalText
              id={positionId}
              select={selectPositionById}
              update={updatePosition}
            />
          </Stack.Item>
          <Stack.Item className={styles.sideContainer}>
            <Text />
          </Stack.Item>
        </Stack>

        <AlternativeList positionId={positionId} />

        <Stack horizontal disableShrink horizontalAlign="center">
          <Stack.Item className={styles.sideContainer}>
            <Text />
          </Stack.Item>
          <Stack.Item className={styles.centerContainer}>
            <AddAlternative positionId={positionId} />
          </Stack.Item>
          <Stack.Item className={styles.sideContainer}>
            <Text />
          </Stack.Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

Position.propTypes = {
  positionId: PropTypes.string.isRequired,
};

export default React.memo(Position);
