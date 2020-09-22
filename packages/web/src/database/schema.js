import { GROUP, INVOICE, OFFER, POSITION, UNITS } from './constants';

export default {
  // disable key compression, because it doesn't pay the information loose
  keyCompression: false,
  // title of a document
  title: 'document',
  // version of schema
  version: 0,
  // wrapper is a json-object
  type: 'object',
  // all properties are required for consistency reasons
  required: [
    // id is primary and thus not in this array
    'type',
    'documentId',
    'date',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'customer',
    'subject',
    'headline',
    'headerText',
    'positions',
    'footerText',
    'amount',
  ],
  // set indexes on search-fields
  indexes: ['documentId', 'date', 'amount'],
  // object-wrapper-properties
  properties: {
    // id for unique identification
    id: {
      type: 'string',
      primary: true,
    },
    // type of document (offer or invoice)
    type: {
      enum: [OFFER, INVOICE],
    },
    // id of document
    // not the primary value as maybe there are multiple versions of the same document with the same documentId
    documentId: {
      type: 'string',
    },
    // date of document
    date: {
      type: 'number',
    },
    // date when document was created
    createdAt: {
      type: 'number',
      final: true,
    },
    // date when document was updated
    updatedAt: {
      type: 'number',
    },
    // a document was deleted at a positive timestamp or 0, or is negative if it was not deleted
    deletedAt: {
      type: 'number',
    },
    // wrapper object for customer
    customer: {
      type: 'object',
      properties: {
        // name
        name: {
          type: 'string',
        },
        // address
        address: {
          type: 'string',
        },
      },
      // name is required
      required: ['name'],
    },
    // subject
    subject: {
      type: 'string',
    },
    // headline
    headline: {
      type: 'string',
    },
    // headerText
    headerText: {
      type: 'string',
    },
    // positions of document
    positions: {
      type: 'array',
      items: {
        type: 'object',
        // position-wrapper-properties
        properties: {
          // id to uniquely identify a position
          // this could be prevented, but in RDBMS there are always ids
          // so the frontend should be designed as if there are ids
          // maybe this is not the same, as in RDBMS the ids are generated
          // on DB-end, but I'll try to make it more interoperable
          id: {
            type: 'string',
          },
          // type of position (position or group)
          type: {
            enum: [GROUP, POSITION],
          },
          // pos
          pos: {
            type: 'string',
          },
          // title
          title: {
            type: 'string',
          },
          // price
          price: {
            type: 'number',
          },
          // amount
          amount: {
            type: 'number',
          },
          // unit
          unit: {
            enum: UNITS,
          },
          // text - some additional text below the title
          text: {
            type: 'string',
          },
          // alternatives
          alternatives: {
            type: 'array',
            items: {
              type: 'object',
              // an alternative can not have other properties, so all properties are required
              required: ['id', 'title', 'price', 'amount', 'unit', 'text'],
              properties: {
                // id
                id: {
                  type: 'string',
                },
                // title
                title: {
                  type: 'string',
                },
                // price
                price: {
                  type: 'number',
                },
                // amount
                amount: {
                  type: 'number',
                },
                // type of unit
                unit: {
                  enum: UNITS,
                },
                // text
                text: {
                  type: 'string',
                },
              },
            },
          },
          // required properties: id to identify, type for type-identification, pos for ordering reasons
          // title should be there as every position-type has a title
          required: ['id', 'type', 'pos', 'title'],
        },
      },
    },
    // footerText
    footerText: {
      type: 'string',
    },
    // amount for search enhancements (denormalization), is updated on every change in db via hooks
    // only for the purpose of search queries
    amount: {
      type: 'number',
    },
  },
};
