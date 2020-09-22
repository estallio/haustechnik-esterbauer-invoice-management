import * as Actions from '../actions';

const initialSelectedDocumentType = null;

const selectedDocumentTypeReducer = (
  state = initialSelectedDocumentType,
  action,
) => {
  switch (action.type) {
    case Actions.SET_SELECTED_DOCUMENT_TYPE:
      return action.documentType;

    case Actions.LOAD_DOCUMENT_ACTIONS.SUCCESS:
      return action.loadedDocument.type;

    case Actions.DELETE_DOCUMENT_ACTIONS.SUCCESS:
      return null;

    case Actions.CREATE_DOCUMENT_ACTIONS.SUCCESS:
      return action.createdDocument.type;

    default:
      return state;
  }
};

export default selectedDocumentTypeReducer;
