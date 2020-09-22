import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const FooterText = () => {
  const dispatch = useDispatch();

  const footerText = useSelector(
    (state) => selectDocumentData(state).footerText || '',
  );

  const footerTextChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('footerText', v)),
    [dispatch],
  );

  return (
    <TextField
      label="Fuß-Text"
      multiline
      autoAdjustHeight
      value={footerText}
      onChange={footerTextChanged}
    />
  );
};

export default FooterText;
