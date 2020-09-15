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
    // valid as redux-toolkit handles this with an immutable-object-library
    // eslint-disable-next-line no-param-reassign
    entities[alternativesIdsByPositionId[i]].pos = `${i + 1}`;
  }
};
