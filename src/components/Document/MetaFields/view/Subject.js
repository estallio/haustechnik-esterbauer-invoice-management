import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { selectSubject, setSubject } from '../redux/subject';

const Subject = () => {
  const dispatch = useDispatch();
  const subject = useSelector(selectSubject);

  const subjectChanged = useCallback((e, v) => dispatch(setSubject(v)), [
    dispatch,
  ]);

  return (
    <TextField label="Betreff" value={subject} onChange={subjectChanged} />
  );
};

export default Subject;
