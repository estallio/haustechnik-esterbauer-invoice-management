import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { selectName, setName } from '../redux/name';

const Name = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  const nameChanged = useCallback((e, v) => dispatch(setName(v)), [dispatch]);

  return <TextField label="Name" value={name} onChange={nameChanged} />;
};

export default Name;