import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import classNames from 'classnames';

import { selectAlternativesByPositionId } from '../../../redux/alternatives';

import styles from '../Position/Position.module.scss';

const NoOfAlternatives = ({ positionId }) => {
  const alternativesCount = useSelector(
    (state) => selectAlternativesByPositionId(state, positionId).length,
  );

  if (!alternativesCount) {
    return null;
  }

  return (
    <Stack
      horizontal
      disableShrink
      horizontalAlign="center"
      className={classNames(styles.alternativeText)}
    >
      <Stack.Item className={styles.sideContainer}>
        <Text />
      </Stack.Item>
      <Stack.Item className={styles.centerContainer}>
        <Text variant="small">
          {alternativesCount} Alternative
          {alternativesCount > 1 ? 'n' : ''}
        </Text>
      </Stack.Item>
      <Stack.Item className={styles.sideContainer}>
        <Text />
      </Stack.Item>
    </Stack>
  );
};

NoOfAlternatives.propTypes = {
  positionId: PropTypes.string.isRequired,
};

export default React.memo(NoOfAlternatives);
