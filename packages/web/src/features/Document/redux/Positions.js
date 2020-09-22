// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { nanoid } from 'nanoid';

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { updatePositionIndexes } from './Helpers/PositionsHelper';

const positionsAdapter = createEntityAdapter({
  selectId: (position) => position.id,
  sortComparer: (position1, position2) => {
    const firstPartPosition1 = _.split(position1.pos, '.', 2);
    const firstPartPosition2 = _.split(position2.pos, '.', 2);

    // compare number before '.'
    if (firstPartPosition1[0] !== firstPartPosition2[0]) {
      return firstPartPosition1[0] - firstPartPosition2[0];
    }

    // compare the number after .
    return firstPartPosition1[1] - firstPartPosition2[1];
  },
});

const positionsSlice = createSlice({
  name: 'positions',
  initialState: positionsAdapter.getInitialState(),
  reducers: {
    setPositions: positionsAdapter.setAll,
    addPosition: {
      reducer: (state, action) => {
        const newState = positionsAdapter.addOne(state, action);
        updatePositionIndexes(newState.ids, newState.entities);
      },
      prepare: (position) => {
        // add ids to uniquely identify a position entry in the view
        const id = nanoid();

        return {
          payload: {
            id,
            ...position,
            // set pos to max number = last entry, pos will set in the reducer in every case
            pos: position.pos || `99999999.`,
          },
        };
      },
    },
    // pos can not be edited directly, so no index-update is required on updatePosition
    updatePosition: positionsAdapter.updateOne,
    removePosition: (state, action) => {
      const newState = positionsAdapter.removeOne(state, action);
      updatePositionIndexes(newState.ids, newState.entities);
    },
    reorderPositions: {
      reducer: (state, action) => {
        const { fromIndex, toIndex } = action.payload;
        const [removed] = state.ids.splice(fromIndex, 1);
        state.ids.splice(toIndex, 0, removed);
        updatePositionIndexes(state.ids, state.entities);
      },
      prepare: (fromIndex, toIndex) => {
        return { payload: { fromIndex, toIndex } };
      },
    },
  },
});

export const {
  addPosition,
  updatePosition,
  setPositions,
  removePosition,
  reorderPositions,
} = positionsSlice.actions;

export const MutationActions = {
  addPosition,
  updatePosition,
  setPositions,
  removePosition,
  reorderPositions,
};

const selectPositionsAdapter = (state) => state.positions;

export const {
  selectAll: selectAllPositions,
  selectById: selectPositionById,
  selectIds: selectPositionIds,
} = positionsAdapter.getSelectors(selectPositionsAdapter);

export default positionsSlice.reducer;
