import _ from 'lodash';
import * as Actions from '../actions';

const initialStatus = {
  isLoading: false,
  isCreatingDocument: false,
  isLoadingDocuments: false,
  isDeletingDocument: false,
  isSavingDocument: false,
  isCreatingPDF: false,
};

// TODO: fix loading states

const statusReducer = (state = initialStatus, action) => {
  switch (action.type) {
    // creating a document
    case Actions.CREATE_DOCUMENT_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isCreatingDocument: true,
      });
    case Actions.CREATE_DOCUMENT_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isCreatingDocument: false,
      });
    case Actions.CREATE_DOCUMENT_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isCreatingDocument: false,
      });

    // saving a document
    case Actions.SAVE_DOCUMENT_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isSavingDocument: true,
      });
    case Actions.SAVE_DOCUMENT_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isSavingDocument: false,
      });
    case Actions.SAVE_DOCUMENT_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isSavingDocument: false,
      });

    // deleting a document
    case Actions.DELETE_DOCUMENT_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isDeletingDocument: true,
      });
    case Actions.DELETE_DOCUMENT_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isDeletingDocument: false,
      });
    case Actions.DELETE_DOCUMENT_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isDeletingDocument: false,
      });

    // loading all documents
    case Actions.LOAD_DOCUMENTS_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isLoadingDocuments: true,
        isLoading: true,
      });
    case Actions.LOAD_DOCUMENTS_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isLoadingDocuments: false,
        isLoading: false,
      });
    case Actions.LOAD_DOCUMENTS_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isLoadingDocuments: false,
        isLoading: false,
      });

    // load single document
    case Actions.LOAD_DOCUMENT_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isLoadingDocument: true,
        isLoading: true,
      });
    case Actions.LOAD_DOCUMENT_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isLoadingDocument: false,
        isLoading: false,
      });
    case Actions.LOAD_DOCUMENT_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isLoadingDocument: false,
        isLoading: false,
      });

    // creating a pdf
    case Actions.CREATE_PDF_ACTIONS.REQUEST:
      return _.merge({}, state, {
        isCreatingPDF: true,
      });
    case Actions.CREATE_PDF_ACTIONS.FAILURE:
      return _.merge({}, state, {
        isCreatingPDF: false,
      });
    case Actions.CREATE_PDF_ACTIONS.SUCCESS:
      return _.merge({}, state, {
        isCreatingPDF: false,
      });

    default:
      return state;
  }
};

export default statusReducer;
