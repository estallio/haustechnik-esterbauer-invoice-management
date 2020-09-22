/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import * as Actions from '../actions';

const initialDocuments = [];

const documentsSorter = (documents) => {
  return _.sortBy(documents, (document) => -document.date);
};

const documentsReducer = (state = initialDocuments, action) => {
  const {
    createdDocument,
    savedDocument,
    deletedDocument,
    loadedDocuments,
  } = action;

  /* TODO: ground of truth is not the db here - maybe change this with reactive programming */
  /* TODO: little searching bug when adding new documents which do not fulfill the search request */

  switch (action.type) {
    case Actions.CREATE_DOCUMENT_ACTIONS.SUCCESS:
      return documentsSorter(_.concat([...state], createdDocument));

    case Actions.SAVE_DOCUMENT_ACTIONS.SUCCESS:
      return documentsSorter(
        _.concat(
          _.pullAllBy([...state], [{ id: savedDocument.id }], 'id'),
          savedDocument,
        ),
      );

    case Actions.DELETE_DOCUMENT_ACTIONS.SUCCESS:
      return documentsSorter(
        _.pullAllBy([...state], [{ id: deletedDocument.id }], 'id'),
      );

    case Actions.LOAD_DOCUMENTS_ACTIONS.SUCCESS:
      return documentsSorter(loadedDocuments);

    default:
      return state;
  }
};

export default documentsReducer;
