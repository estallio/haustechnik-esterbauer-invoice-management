import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getDocumentTypeName } from '../../../../../utils/documentUtils';
import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const DocumentId = () => {
  const dispatch = useDispatch();

  const documentId = useSelector(
    (state) => selectDocumentData(state).documentId || '',
  );
  const documentType = useSelector(
    (state) => selectDocumentData(state).type || '',
  );

  const documentIdChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('documentId', v)),
    [dispatch],
  );

  return (
    <TextField
      // outputs a string, so reference === is not causing rerender
      label={`${getDocumentTypeName(documentType)}snummer`}
      value={documentId}
      onChange={documentIdChanged}
    />
  );
};

export default DocumentId;
