import AsyncLock from 'async-lock';

import { createRxDatabase, addRxPlugin, isRxDatabase } from 'rxdb';

import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';

// the following import points to the old implementation of indexDBAdapter
// if there are some problems with indexes and range queries try to look at https://github.com/pouchdb/pouchdb/tree/master/packages/node_modules/pouchdb-adapter-indexeddb#differences-between-couchdb-and-pouchdbs-find-implementations-under-indexeddb
// import * as IndexDBAdapter from 'pouchdb-adapter-idb';

// this is the newer/faster reimplementation
import * as IndexDBAdapter from 'pouchdb-adapter-indexeddb';

addRxPlugin(RxDBValidatePlugin);
if (process.env.NODE_ENV !== 'production') {
  addRxPlugin(RxDBDevModePlugin);
}
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBReplicationPlugin);
addRxPlugin(RxDBAttachmentsPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(IndexDBAdapter);
addRxPlugin(RxDBJsonDumpPlugin);

let databaseSingleton;

const databaseLock = new AsyncLock();
const DATABASE_LOCK_KEY = 'DATABASE_LOCK_KEY';

const getDatabaseAsync = async () => {
  if (isRxDatabase(databaseSingleton)) {
    return databaseSingleton;
  }

  databaseSingleton = await createRxDatabase({
    name: 'invoices',
    adapter: 'indexeddb',
    // old version
    // adapter: 'idb',
  });

  return databaseSingleton;
};

export const getDatabase = async () =>
  // editor may require 4 arguments, but that's wrong
  // the library handles the case without callback and
  // returns correctly a promise that we need in this case
  databaseLock.acquire(DATABASE_LOCK_KEY, getDatabaseAsync);
