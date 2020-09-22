// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { INVOICE, OFFER } from '../../../database/constants';

import { selectSelectedId } from './ListData';

const documentsAdapter = createEntityAdapter({
  selectId: (document) => document.id,
  sortComparer: (document1, document2) => {
    // if the documents are from the same date, we sort them by createdAt
    if (document1.date === document2.date) {
      return document1.createdAt - document2.createdAt;
    }

    return document1.date - document2.date;
  },
});

const documentsSlice = createSlice({
  name: 'documents',
  initialState: documentsAdapter.getInitialState(),
  reducers: {
    setDocuments: documentsAdapter.setAll,
    addDocument: documentsAdapter.addOne,
    removeDocument: documentsAdapter.removeOne,
  },
});

export const {
  setDocuments,
  addDocument,
  removeDocument,
} = documentsSlice.actions;

const selectDocumentsAdapter = (state) => state.documents;

export const {
  selectAll: selectAllDocuments,
  selectById: selectDocumentById,
  selectIds: selectDocumentIds,
} = documentsAdapter.getSelectors(selectDocumentsAdapter);

export default documentsSlice.reducer;

export const selectOffers = createSelector([selectAllDocuments], (documents) =>
  documents.filter((document) => document.type === OFFER),
);

export const selectInvoices = createSelector(
  [selectAllDocuments],
  (documents) => documents.filter((document) => document.type === INVOICE),
);

export const selectSelectedDocumentType = (state) => {
  const selectedDocumentId = selectSelectedId(state);

  if (!selectedDocumentId) {
    return null;
  }

  const selectedDocument = selectDocumentById(state, selectedDocumentId);

  if (!selectedDocument) {
    return null;
  }

  return selectedDocument.type;
};
