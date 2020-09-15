import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { selectDocumentId, setDocumentId } from '../redux/documentId';

import { selectDocumentType } from '../../DocumentType/redux/documentType';

import { getDocumentTypeName } from '../../../../utils/documentUtils';

const DocumentId = () => {
  const dispatch = useDispatch();
  const documentId = useSelector(selectDocumentId);
  const documentType = useSelector(selectDocumentType);

  const documentIdChanged = useCallback((e, v) => dispatch(setDocumentId(v)), [
    dispatch,
  ]);

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
