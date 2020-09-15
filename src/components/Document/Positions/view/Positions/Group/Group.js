import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@fluentui/react/lib/Stack';

import Pos from '../../Shared/Pos';
import Title from '../../Shared/Title';
import Delete from '../../Shared/Delete';

import {
  removePosition,
  selectPositionById,
  updatePosition,
} from '../../../redux/positions';

import styles from './Group.module.scss';

const Group = ({ positionId }) => {
  return (
    <Stack key={`groupWrapper-${positionId}`}>
      <Stack
        horizontal
        disableShrink
        horizontalAlign="center"
        verticalAlign="center"
      >
        <Stack.Item className={styles.sideContainer}>
          <Pos id={positionId} select={selectPositionById} />
        </Stack.Item>
        <Stack.Item className={styles.centerContainer}>
          <Title
            id={positionId}
            select={selectPositionById}
            update={updatePosition}
          />
        </Stack.Item>
        <Stack.Item className={styles.sideContainer}>
          <Delete id={positionId} remove={removePosition} />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

Group.propTypes = {
  positionId: PropTypes.string.isRequired,
};

export default React.memo(Group);
