import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { Stack } from '@fluentui/react/lib/Stack';

import Group from '../Group';
import Position from '../Position';

import { GROUP } from '../../../../../../../database/constants';

import { selectPositionById } from '../../../../../redux/Positions';

import styles from './PositionContainer.module.scss';

const PositionContainer = ({ positionId, isDragging }) => {
  const positionType = useSelector(
    (state) => selectPositionById(state, positionId).type,
  );

  return (
    <Stack
      key={`positionContainer-${positionId}`}
      className={classNames(styles.positionWrapper, {
        [styles.isDragging]: isDragging,
        [styles.group]: positionType === GROUP,
      })}
    >
      {positionType === GROUP ? (
        <Group positionId={positionId} />
      ) : (
        <Position positionId={positionId} />
      )}
    </Stack>
  );
};

PositionContainer.propTypes = {
  positionId: PropTypes.string.isRequired,
  isDragging: PropTypes.bool,
};

PositionContainer.defaultProps = {
  isDragging: false,
};

export default React.memo(PositionContainer);
