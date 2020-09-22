// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import _ from 'lodash';

import { GROUP } from '../../../../database/constants';

export const updatePositionIndexes = (ids, entities) => {
  let counter = 0;
  let subCounter = 0;

  const groupHeaders = _.filter(ids, (id) => entities[id].type === GROUP);

  if (_.isEmpty(groupHeaders)) {
    for (let i = 0; i < ids.length; i += 1) {
      counter += 1;
      entities[ids[i]].pos = `${counter}.`;
    }

    return;
  }

  for (let i = 0; i < ids.length; i += 1) {
    if (entities[ids[i]].type === GROUP) {
      counter += 1;
      subCounter = 0;
      entities[ids[i]].pos = `${counter}.`;
    } else {
      subCounter += 1;
      entities[ids[i]].pos = `${counter}.${subCounter}`;
    }
  }
};
