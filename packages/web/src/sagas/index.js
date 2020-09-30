import {
  throttle,
  all,
  call,
  fork,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import { push, goBack } from 'connected-react-router';

import moment from 'moment';
import { saveAs } from 'file-saver';
import * as Actions from '../actions';

import {
  deleteDocument,
  loadDocuments,
  duplicateDocument,
  createInvoiceFromOffer,
  saveDocument,
  createOffer,
  createInvoice,
  loadDocument,
  exportDump,
  importDump,
} from '../database/documents';

import createPDF from '../pdf';

import {
  setIsDocumentReady,
  setIsDocumentDirty,
  setIsDocumentValid,
  setValidationErrors,
} from '../features/Document/redux/DocumentStatus';

import {
  selectDocumentData,
  setDocumentData,
} from '../features/Document/redux/DocumentData';

import {
  addPosition,
  removePosition,
  reorderPositions,
  selectAllPositions,
  setPositions,
} from '../features/Document/redux/Positions';

import {
  selectAllAlternatives,
  setAlternatives,
} from '../features/Document/redux/Alternatives';

import {
  checkFirstPositionIdGroup,
  denormalizeDocument,
  normalizeDocument,
} from '../utils/documentUtils';

import {
  selectSelectedId,
  setIsLoading,
  setSelectedId,
} from '../features/Documents/redux/ListData';
import {
  addDocument,
  removeDocument,
  setDocuments,
} from '../features/Documents/redux/Documents';

import { formatDate } from '../utils/timeUtils';

/**
 *  SUBROUTINES
 */

// TODO: only temporarily fixed: if a document is created in the context-menu,
//  the selection of the documents-list drops and causes a null-selection after
//  the document is created, so a openDocument action with documentId null is
//  triggered, fixed with introducing id as parameter
function* openDocumentSaga({ id }) {
  const documentId = id || (yield select(selectSelectedId));

  yield put(push(`/documents/${documentId}`));

  yield put(setIsDocumentReady(true));
}

function* navigateBackSaga() {
  yield put(goBack());
}

function* createOfferSaga({ open }) {
  // yield put(setIsLoading(true));

  yield put(Actions.createDocumentActions.request());
  const result = yield call(createOffer);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.createDocumentActions.success(resultDocument));

    yield put(addDocument(resultDocument));

    yield put(setSelectedId(resultDocument.id));

    if (open) {
      yield call(openDocumentSaga, { id: resultDocument.id });
    }
  } else {
    yield put(Actions.createDocumentActions.failure(result.error));
  }

  // yield put(setIsLoading(false));
}

function* saveDocumentSaga() {
  // TODO: as deleted documents were only marked as deleted,
  //  one could replace all creation/deletion functions with saveDocument
  //  which simply updates some state

  yield put(Actions.createDocumentActions.request());

  const documentData = yield select(selectDocumentData);

  const document = denormalizeDocument({
    ...documentData,
    positions: yield select(selectAllPositions),
    alternatives: yield select(selectAllAlternatives),
  });

  const result = yield call(saveDocument, document);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.createDocumentActions.success(resultDocument));

    yield put(setIsDocumentDirty(false));
  } else {
    yield put(Actions.createDocumentActions.failure(result.error));
  }
}

function* createInvoiceSaga({ open }) {
  // yield put(setIsLoading(true));

  yield put(Actions.createDocumentActions.request());

  const result = yield call(createInvoice);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.createDocumentActions.success(resultDocument));

    yield put(addDocument(resultDocument));

    yield put(setSelectedId(resultDocument.id));

    if (open) {
      yield call(openDocumentSaga, { id: resultDocument.id });
    }
  } else {
    yield put(Actions.createDocumentActions.failure(result.error));
  }

  // yield put(setIsLoading(false));
}

function* createInvoiceFromOfferSaga({ open }) {
  // yield put(setIsLoading(true));

  const id = yield select(selectSelectedId);

  yield put(Actions.createDocumentActions.request());
  const result = yield call(createInvoiceFromOffer, id);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.createDocumentActions.success(resultDocument));

    yield put(addDocument(resultDocument));

    yield put(setSelectedId(resultDocument.id));

    if (open) {
      yield call(openDocumentSaga, { id: resultDocument.id });
    }
  } else {
    yield put(Actions.createDocumentActions.failure(result.error));
  }

  // yield put(setIsLoading(false));
}

function* loadDocumentsSaga({ searchParams }) {
  yield put(setIsLoading(true));

  yield put(Actions.loadDocumentsActions.request());

  const result = yield call(loadDocuments, searchParams);

  if (result && result.response) {
    const resultDocuments = result.response.documents.map((doc) =>
      normalizeDocument(doc),
    );

    yield put(setDocuments(resultDocuments));

    yield put(Actions.loadDocumentsActions.success(resultDocuments));
  } else {
    yield put(Actions.loadDocumentsActions.failure(result.error));
  }

  yield put(setIsLoading(false));
}

function* loadDocumentSaga({ id }) {
  yield put(setIsDocumentReady(false));

  yield put(Actions.loadDocumentActions.request());
  const result = yield call(loadDocument, id);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.loadDocumentActions.success(resultDocument));

    // TODO: resultDocument contains also positions and alternatives - don't do this
    yield put(setDocumentData(resultDocument));
    yield put(setPositions(resultDocument.positions));
    yield put(setAlternatives(resultDocument.alternatives));

    // after loading, document is never dirty
    yield put(setIsDocumentDirty(false));

    // document is ready now
    yield put(setIsDocumentReady(true));
  } else {
    yield put(Actions.loadDocumentActions.failure(result.error));
  }
}

function* duplicateDocumentSaga({ open }) {
  // yield put(setIsLoading(true));

  const id = yield select(selectSelectedId);

  yield put(Actions.createDocumentActions.request());
  const result = yield call(duplicateDocument, id);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.createDocumentActions.success(resultDocument));

    yield put(addDocument(resultDocument));

    yield put(setSelectedId(resultDocument.id));

    if (open) {
      yield call(openDocumentSaga, { id: resultDocument.id });
    }
  } else {
    yield put(Actions.createDocumentActions.failure(result.error));
  }

  // yield put(setIsLoading(false));
}

function* deleteDocumentSaga({ navigateBack }) {
  // yield put(setIsLoading(true));

  const id = yield select(selectSelectedId);

  yield put(Actions.deleteDocumentActions.request());

  const result = yield call(deleteDocument, id);

  if (result && result.response) {
    const resultDocument = normalizeDocument(result.response.document);

    yield put(Actions.deleteDocumentActions.success(resultDocument));

    yield put(removeDocument(resultDocument.id));

    if (navigateBack) {
      yield call(navigateBackSaga);
    }
  } else {
    yield put(Actions.deleteDocumentActions.failure(result.error));
  }

  // yield put(setIsLoading(false));
}

function* exportDatabaseSaga() {
  yield put(setIsLoading(true));

  const resultJson = yield call(exportDump);

  const blob = new Blob([JSON.stringify(resultJson)], {
    type: 'application/json',
  });

  saveAs(blob, `Rechnungs-Programm-Export-${formatDate(moment())}.json`);

  yield put(setIsLoading(false));
}

function* importDatabaseSaga({ jsonDump }) {
  yield put(setIsLoading(true));

  yield call(importDump, jsonDump);

  location.reload();
}

function* positionOrderingChanged() {
  const positions = yield select(selectAllPositions);

  const { isDocumentValid, errors } = checkFirstPositionIdGroup(positions);
  yield put(setIsDocumentValid(isDocumentValid));
  yield put(setValidationErrors(errors));
}

function* printDocumentSaga({ loadBefore }) {
  let id = yield select(selectDocumentData).id;

  // TODO: error handling and faster generation
  yield put(Actions.createPDFActions.request());

  // TODO: fix this handling with loadBefore as here two different id selection is happening
  if (loadBefore) {
    id = yield select(selectSelectedId);
    yield call(loadDocumentSaga, { id });
  }

  const documentData = yield select(selectDocumentData);

  const document = denormalizeDocument({
    ...documentData,
    positions: yield select(selectAllPositions),
    alternatives: yield select(selectAllAlternatives),
  });

  const renderResult = yield call(createPDF, document);

  if (renderResult && renderResult.error) {
    yield put(Actions.createPDFActions.failure(renderResult.error));
  } else {
    yield put(Actions.createPDFActions.success());
  }
}

/**
 *  WATCHERS
 */

function* watchCreateOfferSaga() {
  yield takeLatest(Actions.CREATE_OFFER_ACTION, createOfferSaga);
}

function* watchSaveDocumentSaga() {
  yield takeLatest(Actions.SAVE_DOCUMENT_ACTION, saveDocumentSaga);
}

function* watchCreateInvoiceSaga() {
  yield takeLatest(Actions.CREATE_INVOICE_ACTION, createInvoiceSaga);
}

function* watchCreateInvoiceFromOfferSaga() {
  yield takeLatest(
    Actions.CREATE_INVOICE_FROM_OFFER_ACTION,
    createInvoiceFromOfferSaga,
  );
}

function* watchLoadDocumentsSaga() {
  yield takeLatest(Actions.LOAD_DOCUMENTS_ACTION, loadDocumentsSaga);
}

function* watchLoadDocumentSaga() {
  yield takeLatest(Actions.LOAD_DOCUMENT_ACTION, loadDocumentSaga);
}

function* watchDuplicateDocumentSaga() {
  yield takeLatest(Actions.DUPLICATE_DOCUMENT_ACTION, duplicateDocumentSaga);
}

function* watchDeleteDocumentSaga() {
  yield takeLatest(Actions.DELETE_DOCUMENT_ACTION, deleteDocumentSaga);
}

function* watchOpenDocumentSaga() {
  yield takeLatest(Actions.OPEN_DOCUMENT_ACTION, openDocumentSaga);
}

function* watchPrintDocumentSaga() {
  yield takeLatest(Actions.PRINT_DOCUMENT_ACTION, printDocumentSaga);
}

function* watchNavigateBackSaga() {
  yield takeLatest(Actions.NAVIGATE_BACK_ACTION, navigateBackSaga);
}

function* watchExportDatabaseSaga() {
  yield takeLatest(Actions.EXPORT_DATABASE_ACTION, exportDatabaseSaga);
}

function* watchImportDatabaseSaga() {
  yield takeLatest(Actions.IMPORT_DATABASE_ACTION, importDatabaseSaga);
}

function* watchPositionOrderingChangedSaga() {
  yield throttle(
    500,
    [
      setPositions.type,
      addPosition.type,
      removePosition.type,
      reorderPositions.type,
    ],
    positionOrderingChanged,
  );
}

/**
 *  EXPORTS
 */

export default function* rootSaga() {
  yield all([
    fork(watchLoadDocumentSaga),
    fork(watchLoadDocumentsSaga),

    fork(watchNavigateBackSaga),

    fork(watchOpenDocumentSaga),
    fork(watchSaveDocumentSaga),
    fork(watchDeleteDocumentSaga),
    fork(watchPrintDocumentSaga),

    fork(watchCreateOfferSaga),
    fork(watchCreateInvoiceSaga),
    fork(watchCreateInvoiceFromOfferSaga),
    fork(watchDuplicateDocumentSaga),

    fork(watchImportDatabaseSaga),
    fork(watchExportDatabaseSaga),

    fork(watchPositionOrderingChangedSaga),
  ]);
}
