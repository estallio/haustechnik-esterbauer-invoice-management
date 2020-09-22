import _ from 'lodash';
import moment from 'moment';
import { nanoid } from 'nanoid';

import { INVOICE, OFFER } from './constants';
import { getCollection } from './collection';

import { parseUnixFromString } from '../utils/timeUtils';
import { textToNumber } from '../utils/numberUtils';

const createEmptyDocument = (type = INVOICE) => ({
  // necessary, as nanoid produces ids that may start width underscores and pouchdb prohibits this
  id: `${type}-${nanoid()}`,
  documentId: '',
  date: moment().unix(),
  createdAt: moment().unix(),
  updatedAt: moment().unix(),
  deletedAt: -1,
  type,
  customer: {
    name: '',
    address: '',
  },
  subject: '',
  headline: '',
  headerText: '',
  positions: [],
  footerText: '',
  amount: 0,
});

// js/json object as input - document must exist beforehand
export const saveDocument = async (document) => {
  try {
    // TODO: is _id really in the object? this may caused by the migration from _id to id
    const data = _.omit(document, ['_id', '_rev', 'id']);
    const currentTimestamp = moment().unix();

    const collection = await getCollection();
    const query = collection.findOne(document.id);

    const doc = await query.update({
      $set: {
        ...data,
        updatedAt: currentTimestamp,
      },
    });

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    console.log(ex);
    return { error: 'Speichern fehlgeschlagen' };
  }
};

export const createOffer = async () => {
  try {
    const collection = await getCollection();
    const doc = await collection.insert(createEmptyDocument(OFFER));

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    console.log(ex);
    return { error: 'Speichern fehlgeschlagen' };
  }
};

export const createInvoice = async () => {
  const newDoc = createEmptyDocument(INVOICE);

  try {
    const collection = await getCollection();
    const doc = await collection.insert(newDoc);

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    console.log(ex, newDoc);
    return { error: 'Speichern fehlgeschlagen' };
  }
};

export const createDocument = async (type = INVOICE) => {
  if (type === INVOICE) {
    return createInvoice();
  }

  return createOffer();
};

export const loadDocuments = async (searchParams = {}) => {
  try {
    const collection = await getCollection();
    let query = collection.find().sort({ date: 'desc' });

    if (searchParams.documentId) {
      query = query.where('documentId').regex(searchParams.documentId);
    }

    if (searchParams.subject) {
      query = query
        .where('subject')
        .regex(new RegExp(searchParams.subject, 'i'));
    }

    if (searchParams.type) {
      query = query.where('type').eq(searchParams.type);
    }

    if (searchParams.customerName) {
      query = query
        .where('customer.name')
        .regex(new RegExp(searchParams.customerName, 'i'));
    }

    if (searchParams.dateFrom) {
      query = query
        .where('date')
        .gte(parseUnixFromString(searchParams.dateFrom));
    }

    if (searchParams.dateTo) {
      query = query.where('date').lte(parseUnixFromString(searchParams.dateTo));
    }

    if (searchParams.amountFrom) {
      query = query.where('amount').gte(textToNumber(searchParams.amountFrom));
    }

    if (searchParams.amountTo) {
      query = query.where('amount').lte(textToNumber(searchParams.amountTo));
    }

    query = query.where('deletedAt').lt(0);

    const docs = await query.exec();

    // TODO: map to only contain the properties needed in the documents listView which reduces data in the state
    return {
      response: {
        documents: _.map(docs, (doc) =>
          // TODO: optimzie - currently, the items are needed in pdf-generation
          _.omit(doc.toJSON(), [
            /* 'items', 'headerText', 'footerText' */
          ]),
        ),
      },
    };
  } catch (ex) {
    return { error: 'Laden fehlgeschlagen' };
  }
};

export const loadDocument = async (id) => {
  try {
    const collection = await getCollection();
    const query = collection.findOne(id);
    const doc = await query.exec();

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    return { error: 'Laden fehlgeschlagen' };
  }
};

export const deleteDocument = async (id) => {
  try {
    const collection = await getCollection();
    // TODO: db returns valid document if none was found with the specific id
    //  this could be used for creating new documents
    const query = collection.findOne(id);
    const doc = await query.update({
      $set: {
        deletedAt: moment().unix(),
      },
    });

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    return { error: 'Löschen fehlgeschlagen' };
  }
};

export const duplicateDocument = async (id, type = null, date = null) => {
  try {
    const collection = await getCollection();
    const query = collection.findOne(id);
    const oldDoc = await query.exec();
    const data = _.omit(oldDoc.toJSON(), ['_id', '_rev', 'id']);

    const doc = await collection.insert({
      ...createEmptyDocument(),
      ...data,
      updatedAt: moment().unix(),
      createdAt: moment().unix(),
      type: type || data.type,
      date: date || data.date,
    });

    if (_.isEmpty(doc)) {
      throw new Error('Returned document empty');
    }

    return { response: { document: doc.toJSON() } };
  } catch (ex) {
    return { error: 'Duplizieren fehlgeschlagen' };
  }
};

export const createInvoiceFromOffer = async (id) =>
  duplicateDocument(id, INVOICE, moment().unix());

export const exportDump = async () => {
  const collection = await getCollection();
  return collection.dump();
};

export const importDump = async (jsonDump) => {
  const collection = await getCollection();

  await collection.remove();

  await collection.importDump(jsonDump);
};
