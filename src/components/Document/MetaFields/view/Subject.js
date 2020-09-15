import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getSubject, setSubject } from '../redux/subject';

const Subject = () => {
  const dispatch = useDispatch();
  const subject = useSelector(getSubject);

  const subjectChanged = useCallback((e, v) => dispatch(setSubject(v)), [
    dispatch,
  ]);

  return (
    <TextField label="Betreff" value={subject} onChange={subjectChanged} />
  );
};

export default Subject;
