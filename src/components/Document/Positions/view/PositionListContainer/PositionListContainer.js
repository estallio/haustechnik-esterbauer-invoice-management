import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

import classNames from 'classnames';

import { reorderPositions } from '../../redux/positions';

import PositionList from '../PositionList';
import PositionControls from '../PositionControls/PositionControls';

import styles from './PositionListContainer.module.scss';

const PositionListContainer = () => {
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result) => {
      // if no destination available = dropped outside the list = do nothing
      if (!result.destination) {
        return;
      }

      // let redux do the reorder via an action
      dispatch(reorderPositions(result.source.index, result.destination.index));
    },
    [dispatch],
  );

  return (
    <Stack className={styles.wrapper}>
      <Label>Produkte und Dienstleistungen</Label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="positionDroppableContainer">
          {(provided, snapshot) => (
            <div
              // this is best practice with react-beautiful-dnd, so it's ok for this line
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classNames(styles.droppableContainer, {
                [styles.isDraggingOver]: snapshot.isDraggingOver,
              })}
            >
              <PositionList />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PositionControls />
    </Stack>
  );
};
export default React.memo(PositionListContainer);
