import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const Subject = () => {
  const dispatch = useDispatch();

  const subject = useSelector(
    (state) => selectDocumentData(state).subject || '',
  );

  const subjectChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('subject', v)),
    [dispatch],
  );

  return (
    <TextField label="Betreff" value={subject} onChange={subjectChanged} />
  );
};

export default Subject;
