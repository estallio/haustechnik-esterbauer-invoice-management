import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { selectHeadline, setHeadline } from '../redux/headline';

const Headline = () => {
  const dispatch = useDispatch();
  const headline = useSelector(selectHeadline);

  const headlineChanged = useCallback((e, v) => dispatch(setHeadline(v)), [
    dispatch,
  ]);

  return (
    <TextField
      label="Überschrift"
      value={headline}
      onChange={headlineChanged}
    />
  );
};

export default Headline;
