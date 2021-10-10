/* eslint-disable no-param-reassign */

import { isRxCollection } from 'rxdb';
import AsyncLock from 'async-lock';

import moment from 'moment';
import _ from 'lodash';

import { getDatabase } from './database';
import { POSITION } from './constants';

import documentSchema from './schema';

let collectionSingleton;

const collectionLock = new AsyncLock();
const COLLECTION_LOCK_KEY = 'COLLECTION_LOCK_KEY';

const updateHook = (data) => {
  const positions = _.filter(data.positions, (item) => item.type === POSITION);

  data.amount = _.reduce(
    positions,
    (accumulator, current) => accumulator + current.amount * current.price,
    0,
  );

  data.updatedAt = moment().unix();
};

const getCollectionAsync = async () => {
  if (isRxCollection(collectionSingleton)) {
    return collectionSingleton;
  }

  const db = await getDatabase();

  collectionSingleton = await db.collection({
    name: 'documents',
    schema: documentSchema,
    migrationStrategies: {
      1(oldDoc) {
        oldDoc.tax = 20;
        return oldDoc;
      },
    },
  });

  // amounts should always be updated, doesn't matter
  collectionSingleton.preInsert(updateHook, false);
  collectionSingleton.preSave(updateHook, false);

  return collectionSingleton;
};

export const getCollection = async () =>
  collectionLock.acquire(COLLECTION_LOCK_KEY, getCollectionAsync);
