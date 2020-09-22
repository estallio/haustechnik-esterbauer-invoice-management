import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';
import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const HeaderText = () => {
  const dispatch = useDispatch();

  const headerText = useSelector(
    (state) => selectDocumentData(state).headerText || '',
  );

  const headerTextChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('headerText', v)),
    [dispatch],
  );

  return (
    <TextField
      label="Kopf-Text"
      multiline
      autoAdjustHeight
      value={headerText}
      onChange={headerTextChanged}
    />
  );
};

export default HeaderText;
