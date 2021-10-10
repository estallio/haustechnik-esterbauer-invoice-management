import faker from 'faker';
import moment from 'moment';
import _ from 'lodash';
import { nanoid } from 'nanoid';

import { GROUP, INVOICE, OFFER, POSITION, UNITS } from '../database/constants';

import {
  createDocument,
  deleteDocument,
  loadDocuments,
  saveDocument,
} from '../database/documents';

faker.locale = 'de_AT';
const { random, date, name, fake, lorem } = faker;

const createFakeTestData = () => {
  const positions = _.range(0, random.number({ min: 0, max: 20 })).map(() => ({
    id: nanoid(),
    type: random.arrayElement([
      GROUP,
      POSITION,
      POSITION,
      POSITION,
      POSITION,
      POSITION,
    ]),
    title: lorem.words(random.number({ min: 1, max: 3 })),
    price: parseFloat((Math.random() * 1000).toFixed(2)),
    amount: random.number({ min: 1, max: 5 }),
    unit: random.arrayElement(UNITS),
    text: random.arrayElement([lorem.sentence(), '']),
    alternatives: _.range(0, random.number({ min: 0, max: 2 })).map(
      (value, index) => ({
        id: nanoid(),
        pos: `${index + 1}`,
        title: lorem.words(random.number({ min: 1, max: 3 })),
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        amount: random.number({ min: 1, max: 5 }),
        unit: random.arrayElement(UNITS),
        text: random.arrayElement([lorem.sentence(), '']),
      }),
    ),
  }));

  const groupHeaders = _.filter(positions, (item) => item.type === GROUP);
  let counter = 0;
  let subCounter = 0;

  if (groupHeaders.length > 0) {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].type === GROUP) {
        counter++;
        subCounter = 0;
        positions[i].pos = `${counter}.`;
      } else {
        subCounter++;
        positions[i].pos = `${counter}.${subCounter}`;
      }
    }
  } else {
    for (let i = 0; i < positions.length; i++) {
      counter++;
      positions[i].pos = `${counter}.`;
    }
  }

  const amount = positions
    .filter((item) => item.type !== GROUP)
    .reduce((acc, current) => acc + current.price * current.amount, 0);

  return {
    type: random.arrayElement([INVOICE, OFFER]),
    documentId: `${random.number({ min: 100000, max: 999999 })}`,
    date: moment(date.between(new Date('2019-01-01'), new Date())).unix(),
    customer: {
      name: name.findName(),
      address: fake(
        '{{address.streetName}} {{address.streetAddress}}\n{{address.zipCode}} {{address.city}}',
      ),
    },
    subject: lorem.words(random.number({ min: 1, max: 3 })),
    headline: lorem.words(random.number({ min: 1, max: 3 })),
    headerText: lorem.sentences(random.number({ min: 1, max: 3 })),
    positions,
    tax: random.number({ min: 0, max: 20 }),
    footerText: lorem.sentences(random.number({ min: 1, max: 3 })),
    amount,
  };
};

export const setUpDatabase = async (updateDatabase = false) => {
  if (updateDatabase) {
    const oldDocuments = await loadDocuments();

    const deletePromises = [];

    _.forEach(oldDocuments.response.documents, (doc) => {
      deletePromises.push(deleteDocument(doc.id));
    });

    await Promise.all(deletePromises);

    const emptyArray = Array(50).fill(null);

    const createPromises = _.map(emptyArray, () => {
      return createDocument().then((doc) => {
        return saveDocument({
          ...doc.response.document,
          ...createFakeTestData(),
        });
      });
    });

    await Promise.all(createPromises);
  }
};
