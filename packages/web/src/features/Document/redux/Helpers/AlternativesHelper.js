// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import _ from 'lodash';

export const updateAlternativeIndexes = (positionId, ids, entities) => {
  const alternativesIdsByPositionId = _.filter(
    ids,
    (id) => entities[id].positionId === positionId,
  );

  if (_.isEmpty(alternativesIdsByPositionId)) {
    return;
  }

  for (let i = 0; i < alternativesIdsByPositionId.length; i += 1) {
    entities[alternativesIdsByPositionId[i]].pos = `${i + 1}`;
  }
};
