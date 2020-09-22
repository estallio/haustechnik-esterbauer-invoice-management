// valid as redux-toolkit handles this with an immutable-object-library
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';

import { LOAD_DOCUMENT_ACTIONS, SAVE_DOCUMENT_ACTIONS } from '../../../actions';

import { MutationActions as DocumentMutationActions } from './DocumentData';
import { MutationActions as PositionMutationActions } from './Positions';
import { MutationActions as AlternativesMutationActions } from './Alternatives';

const MutationActions = {
  ...DocumentMutationActions,
  ...PositionMutationActions,
  ...AlternativesMutationActions,
};

const documentStatusSlice = createSlice({
  name: 'documentStatus',
  initialState: {
    isDocumentDirty: false,
    isDocumentReady: false,
    isDocumentValid: true,
    validationErrors: [],
  },
  reducers: {
    setDocumentStatus: (state, action) => action.payload,
    setIsDocumentDirty: (state, action) => {
      state.isDocumentDirty = action.payload;
    },
    setIsDocumentReady: (state, action) => {
      state.isDocumentReady = action.payload;
    },
    setIsDocumentValid: (state, action) => {
      state.isDocumentValid = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    addValidationError: (state, action) => {
      state.validationErrors.push(action.payload);
    },
  },
  // TODO: maybe it is nicer to handle this with redux-saga and compare the state
  //  before with the state after an interaction to know if things have really changed
  //  At the moment, the state is set in the saga and here, delete one...
  extraReducers: (builder) => {
    _.forEach(MutationActions, (mutationAction) => {
      builder.addCase(mutationAction, (state) => {
        state.isDocumentDirty = true;
      });
    });

    builder.addCase(SAVE_DOCUMENT_ACTIONS.SUCCESS, (state) => {
      state.isDocumentDirty = false;
    });

    // TODO: maybe this should be called in a saga after all stuff is loaded and
    //  computed to minimize time between finished loading and first render of document
    //  At the moment, the state is set in the saga and here, delete one...
    builder.addCase(LOAD_DOCUMENT_ACTIONS.SUCCESS, (state) => {
      // LOAD_DOCUMENT_ACTIONS-SUCCESS is triggered before document is set and the user sees the old document before
      // move this into saga or trigger a real finished event
      // state.isDocumentReady = true;
    });
  },
});

export const {
  setDocumentStatus,
  setIsDocumentDirty,
  setIsDocumentReady,
  setIsDocumentValid,
  setValidationErrors,
  addValidationError,
} = documentStatusSlice.actions;

export default documentStatusSlice.reducer;

export const selectDocumentStatus = (state) => state.documentStatus;

export const selectIsDocumentDirty = (state) =>
  selectDocumentStatus(state).isDocumentDirty;

export const selectIsDocumentReady = (state) =>
  selectDocumentStatus(state).isDocumentReady;

export const selectIsDocumentValid = (state) =>
  selectDocumentStatus(state).isDocumentValid;

export const selectValidationErrors = (state) =>
  selectDocumentStatus(state).validationErrors;
