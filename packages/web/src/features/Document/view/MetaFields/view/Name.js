import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const Name = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => selectDocumentData(state).name || '');

  const nameChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('name', v)),
    [dispatch],
  );

  return <TextField label="Name" value={name} onChange={nameChanged} />;
};

export default Name;
