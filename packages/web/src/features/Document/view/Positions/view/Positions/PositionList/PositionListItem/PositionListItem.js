import React from 'react';
import PropTypes from 'prop-types';

import { Draggable } from 'react-beautiful-dnd';

import PositionContainer from '../../PositionContainer';

import styles from './PositionListItem.module.scss';

const PositionListItem = ({ positionId, index }) => {
  return (
    <Draggable
      key={`positionListItem-${positionId}`}
      draggableId={positionId}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          key={`draggableWrapper-${positionId}`}
          ref={provided.innerRef}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...provided.draggableProps}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...provided.dragHandleProps}
          tabIndex={-1}
          className={styles.hoverContainer}
        >
          <PositionContainer
            isDragging={snapshot.isDragging}
            positionId={positionId}
          />
        </div>
      )}
    </Draggable>
  );
};

PositionListItem.propTypes = {
  positionId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(PositionListItem);
