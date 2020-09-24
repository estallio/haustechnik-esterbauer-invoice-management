import {
  createAction,
  createRequestTypes,
  FAILURE,
  REQUEST,
  SUCCESS,
} from '../utils/actionUtils';

// redux user actions
export const EXPORT_DATABASE_ACTION = 'EXPORT_DATABASE_ACTION';
export const exportDatabase = () => createAction(EXPORT_DATABASE_ACTION, {});

export const IMPORT_DATABASE_ACTION = 'IMPORT_DATABASE_ACTION';
export const importDatabase = (jsonDump) =>
  createAction(IMPORT_DATABASE_ACTION, { jsonDump });

export const CREATE_OFFER_ACTION = 'CREATE_OFFER_ACTION';
export const createOffer = (open = false) =>
  createAction(CREATE_OFFER_ACTION, { open });

export const CREATE_INVOICE_ACTION = 'CREATE_INVOICE_ACTION';
export const createInvoice = (open = false) =>
  createAction(CREATE_INVOICE_ACTION, { open });

export const CREATE_INVOICE_FROM_OFFER_ACTION =
  'CREATE_INVOICE_FROM_OFFER_ACTION';
export const createInvoiceFromOffer = (open = false) =>
  createAction(CREATE_INVOICE_FROM_OFFER_ACTION, { open });

export const DELETE_DOCUMENT_ACTION = 'DELETE_DOCUMENT_ACTION';
export const deleteDocument = (navigateBack = false) =>
  createAction(DELETE_DOCUMENT_ACTION, { navigateBack });

export const DUPLICATE_DOCUMENT_ACTION = 'DUPLICATE_DOCUMENT_ACTION';
export const duplicateDocument = (open = false) =>
  createAction(DUPLICATE_DOCUMENT_ACTION, { open });

export const PRINT_DOCUMENT_ACTION = 'PRINT_DOCUMENT_ACTION';
export const printDocument = (loadBefore = false) =>
  createAction(PRINT_DOCUMENT_ACTION, { loadBefore });

export const OPEN_DOCUMENT_ACTION = 'OPEN_DOCUMENT_ACTION';
export const openDocument = () => createAction(OPEN_DOCUMENT_ACTION, {});

export const SAVE_DOCUMENT_ACTION = 'SAVE_DOCUMENT_ACTION';
export const saveDocument = () => createAction(SAVE_DOCUMENT_ACTION, {});

export const LOAD_DOCUMENTS_ACTION = 'LOAD_DOCUMENTS_ACTION';
export const loadDocuments = (searchParams = {}) =>
  createAction(LOAD_DOCUMENTS_ACTION, { searchParams });

export const LOAD_DOCUMENT_ACTION = 'LOAD_DOCUMENT_ACTION';
export const loadDocument = (id) => createAction(LOAD_DOCUMENT_ACTION, { id });

export const SET_SELECTED_DOCUMENT_ID = 'SET_SELECTED_DOCUMENT_ID';
export const setSelectedDocumentId = (documentId) =>
  createAction(SET_SELECTED_DOCUMENT_ID, { documentId });

export const SET_SELECTED_DOCUMENT_TYPE = 'SET_SELECTED_DOCUMENT_TYPE';
export const setSelectedDocumentType = (documentType) =>
  createAction(SET_SELECTED_DOCUMENT_TYPE, { documentType });

export const NAVIGATE_BACK_ACTION = 'NAVIGATE_BACK_ACTION';
export const navigateBack = () => createAction(NAVIGATE_BACK_ACTION, {});

export const RESET_ERROR_MESSAGE_ACTION = 'RESET_ERROR_MESSAGE_ACTION';
export const resetErrorMessage = () =>
  createAction(RESET_ERROR_MESSAGE_ACTION, {});

// saga request state actions
export const CREATE_DOCUMENT_ACTIONS = createRequestTypes(
  'CREATE_DOCUMENT_ACTIONS',
);
export const createDocumentActions = {
  request: () => createAction(CREATE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (createdDocument) =>
    createAction(CREATE_DOCUMENT_ACTIONS[SUCCESS], { createdDocument }),
  failure: (error) => createAction(CREATE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const SAVE_DOCUMENT_ACTIONS = createRequestTypes(
  'SAVE_DOCUMENT_ACTIONS',
);
export const saveDocumentActions = {
  request: () => createAction(SAVE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (savedDocument) =>
    createAction(SAVE_DOCUMENT_ACTIONS[SUCCESS], { savedDocument }),
  failure: (error) => createAction(SAVE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const DELETE_DOCUMENT_ACTIONS = createRequestTypes(
  'DELETE_DOCUMENT_ACTIONS',
);
export const deleteDocumentActions = {
  request: () => createAction(DELETE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (deletedDocument) =>
    createAction(DELETE_DOCUMENT_ACTIONS[SUCCESS], { deletedDocument }),
  failure: (error) => createAction(DELETE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const LOAD_DOCUMENTS_ACTIONS = createRequestTypes(
  'LOAD_DOCUMENTS_ACTIONS',
);
export const loadDocumentsActions = {
  request: () => createAction(LOAD_DOCUMENTS_ACTIONS[REQUEST], {}),
  success: (loadedDocuments) =>
    createAction(LOAD_DOCUMENTS_ACTIONS[SUCCESS], { loadedDocuments }),
  failure: (error) => createAction(LOAD_DOCUMENTS_ACTIONS[FAILURE], { error }),
};

export const LOAD_DOCUMENT_ACTIONS = createRequestTypes(
  'LOAD_DOCUMENT_ACTIONS',
);
export const loadDocumentActions = {
  request: () => createAction(LOAD_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (loadedDocument) =>
    createAction(LOAD_DOCUMENT_ACTIONS[SUCCESS], { loadedDocument }),
  failure: (error) => createAction(LOAD_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const CREATE_PDF_ACTIONS = createRequestTypes('CREATE_PDF_ACTIONS');
export const createPDFActions = {
  request: () => createAction(CREATE_PDF_ACTIONS[REQUEST], {}),
  success: () => createAction(CREATE_PDF_ACTIONS[SUCCESS], {}),
  failure: (error) => createAction(CREATE_PDF_ACTIONS[FAILURE], { error }),
};
