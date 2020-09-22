import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const Headline = () => {
  const dispatch = useDispatch();

  const headline = useSelector(
    (state) => selectDocumentData(state).headline || '',
  );

  const headlineChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('headline', v)),
    [dispatch],
  );

  return (
    <TextField
      label="Überschrift"
      value={headline}
      onChange={headlineChanged}
    />
  );
};

export default Headline;
