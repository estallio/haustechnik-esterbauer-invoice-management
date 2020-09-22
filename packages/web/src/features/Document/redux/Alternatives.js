// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import { nanoid } from 'nanoid';

import {
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

import { updateAlternativeIndexes } from './Helpers/AlternativesHelper';

const alternativesAdapter = createEntityAdapter({
  selectId: (alternative) => alternative.id,
  sortComparer: (alternative1, alternative2) => {
    // if the alternatives are sorted by positionId, we can faster normalize/denormalize
    if (alternative1.positionId === alternative2.positionId) {
      return alternative1.pos - alternative2.pos;
    }

    return alternative1.positionId - alternative2.positionId;
  },
});

const alternativesSlice = createSlice({
  name: 'alternatives',
  initialState: alternativesAdapter.getInitialState(),
  reducers: {
    setAlternatives: alternativesAdapter.setAll,
    addAlternative: {
      reducer: (state, action) => {
        const { positionId } = action.payload;
        const newState = alternativesAdapter.addOne(state, action);
        updateAlternativeIndexes(positionId, newState.ids, newState.entities);
      },
      prepare: (positionId, alternative) => {
        // add ids to uniquely identify an alternative entry in the view
        const id = nanoid();

        return {
          payload: {
            ...alternative,
            id,
            positionId,
            // set pos to max number = last entry, pos will set in the reducer in every case
            pos: alternative.pos || `99999999.`,
          },
        };
      },
    },
    updateAlternative: alternativesAdapter.updateOne,
    removeAlternative: (state, action) => {
      const { positionId } = state.entities[action.payload];
      const newState = alternativesAdapter.removeOne(state, action);
      updateAlternativeIndexes(positionId, newState.ids, newState.entities);
    },
  },
});

export const {
  addAlternative,
  updateAlternative,
  setAlternatives,
  removeAlternative,
} = alternativesSlice.actions;

export const MutationActions = {
  addAlternative,
  updateAlternative,
  setAlternatives,
  removeAlternative,
};

const selectAlternativesAdapter = (state) => state.alternatives;

export const {
  selectAll: selectAllAlternatives,
  selectById: selectAlternativeById,
  selectIds: selectAlternativeIds,
} = alternativesAdapter.getSelectors(selectAlternativesAdapter);

export default alternativesSlice.reducer;

export const selectAlternativesByPositionId = createSelector(
  [selectAllAlternatives, (state, positionId) => positionId],
  (alternatives, positionId) =>
    alternatives.filter((alternative) => alternative.positionId === positionId),
);

export const selectAlternativeIdsByPositionId = createSelector(
  [selectAllAlternatives, (state, positionId) => positionId],
  (alternatives, positionId) =>
    alternatives
      .filter((alternative) => alternative.positionId === positionId)
      .map((alternative) => alternative.id),
);
