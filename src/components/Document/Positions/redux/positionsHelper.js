import _ from 'lodash';

import { GROUP } from '../../../../database/constants';

export const updatePositionIndexes = (ids, entities) => {
  let counter = 0;
  let subCounter = 0;

  const groupHeaders = _.filter(ids, (id) => entities[id].type === GROUP);

  if (_.isEmpty(groupHeaders)) {
    for (let i = 0; i < ids.length; i += 1) {
      counter += 1;
      // valid as redux-toolkit handles this with an immutable-object-library
      // eslint-disable-next-line no-param-reassign
      entities[ids[i]].pos = `${counter}.`;
    }
  }

  for (let i = 0; i < ids.length; i += 1) {
    if (entities[ids[i]].type === GROUP) {
      counter += 1;
      subCounter = 0;
      // valid as redux-toolkit handles this with an immutable-object-library
      // eslint-disable-next-line no-param-reassign
      entities[ids[i]].pos = `${counter}.`;
    } else {
      subCounter += 1;
      // valid as redux-toolkit handles this with an immutable-object-library
      // eslint-disable-next-line no-param-reassign
      entities[ids[i]].pos = `${counter}.${subCounter}`;
    }
  }
};
