import * as Actions from '../actions';

const initialSelectedDocumentId = null;

const selectedDocumentIdReducer = (
  state = initialSelectedDocumentId,
  action,
) => {
  switch (action.type) {
    case Actions.SET_SELECTED_DOCUMENT_ID:
      return action.documentId;

    case Actions.LOAD_DOCUMENT_ACTIONS.SUCCESS:
      return action.loadedDocument.id;

    case Actions.DELETE_DOCUMENT_ACTIONS.SUCCESS:
      return null;

    case Actions.CREATE_DOCUMENT_ACTIONS.SUCCESS:
      return action.createdDocument.id;

    default:
      return state;
  }
};

export default selectedDocumentIdReducer;
