import { action } from '../utils/actionUtils';

// redux user actions
export const CREATE_OFFER = 'CREATE_OFFER';
export const createOffer = () => action(CREATE_OFFER, {});

export const CREATE_INVOICE = 'CREATE_INVOICE';
export const createInvoice = () => action(CREATE_INVOICE, {});

export const CREATE_INVOICE_FROM_OFFER = 'CREATE_INVOICE_FROM_OFFER';
export const createInvoiceFromOffer = () =>
  action(CREATE_INVOICE_FROM_OFFER, {});

export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const deleteDocument = () => action(DELETE_DOCUMENT, {});

export const DUPLICATE_DOCUMENT = 'DUPLICATE_DOCUMENT';
export const duplicateDocument = () => action(DUPLICATE_DOCUMENT, {});

export const PRINT_DOCUMENT = 'PRINT_DOCUMENT';
export const printDocument = () => action(PRINT_DOCUMENT, {});

export const OPEN_DOCUMENT = 'OPEN_DOCUMENT';
export const openDocument = () => action(OPEN_DOCUMENT, {});

export const SAVE_DOCUMENT = 'SAVE_DOCUMENT';
export const saveDocument = () => action(SAVE_DOCUMENT, {});

export const LOAD_DOCUMENTS = 'LOAD_DOCUMENTS';
export const loadDocuments = (searchParams = {}) =>
  action(LOAD_DOCUMENTS, { searchParams });

export const LOAD_DOCUMENT = 'LOAD_DOCUMENT';
export const loadDocument = (id) => action(LOAD_DOCUMENT, { id });

export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const selectDocument = (document) =>
  action(SELECT_DOCUMENT, { document });

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE, {});

// a request can be in three different states
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// helper to create the respective states
const createRequestTypes = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

// saga request state actions
export const CREATE_DOCUMENT_ACTIONS = createRequestTypes(
  'CREATE_DOCUMENT_ACTIONS',
);
export const createDocumentActions = {
  request: () => action(CREATE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (createdDocument) =>
    action(CREATE_DOCUMENT_ACTIONS[SUCCESS], { createdDocument }),
  failure: (error) => action(CREATE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const SAVE_DOCUMENT_ACTIONS = createRequestTypes(
  'SAVE_DOCUMENT_ACTIONS',
);
export const saveDocumentActions = {
  request: () => action(SAVE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (savedDocument) =>
    action(SAVE_DOCUMENT_ACTIONS[SUCCESS], { savedDocument }),
  failure: (error) => action(SAVE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const DELETE_DOCUMENT_ACTIONS = createRequestTypes(
  'DELETE_DOCUMENT_ACTIONS',
);
export const deleteDocumentActions = {
  request: () => action(DELETE_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (deletedDocument) =>
    action(DELETE_DOCUMENT_ACTIONS[SUCCESS], { deletedDocument }),
  failure: (error) => action(DELETE_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const LOAD_DOCUMENTS_ACTIONS = createRequestTypes(
  'LOAD_DOCUMENTS_ACTIONS',
);
export const loadDocumentsActions = {
  request: () => action(LOAD_DOCUMENTS_ACTIONS[REQUEST], {}),
  success: (loadedDocuments) =>
    action(LOAD_DOCUMENTS_ACTIONS[SUCCESS], { loadedDocuments }),
  failure: (error) => action(LOAD_DOCUMENTS_ACTIONS[FAILURE], { error }),
};

export const LOAD_DOCUMENT_ACTIONS = createRequestTypes(
  'LOAD_DOCUMENT_ACTIONS',
);
export const loadDocumentActions = {
  request: () => action(LOAD_DOCUMENT_ACTIONS[REQUEST], {}),
  success: (loadedDocument) =>
    action(LOAD_DOCUMENT_ACTIONS[SUCCESS], { loadedDocument }),
  failure: (error) => action(LOAD_DOCUMENT_ACTIONS[FAILURE], { error }),
};

export const CREATE_PDF_ACTIONS = createRequestTypes('CREATE_PDF_ACTIONS');
export const createPDFActions = {
  request: () => action(CREATE_PDF_ACTIONS[REQUEST], {}),
  success: () => action(CREATE_PDF_ACTIONS[SUCCESS], {}),
  failure: (error) => action(CREATE_PDF_ACTIONS[FAILURE], { error }),
};
