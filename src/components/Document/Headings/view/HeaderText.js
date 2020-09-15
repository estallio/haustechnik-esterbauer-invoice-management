import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getHeaderText, setHeaderText } from '../redux/headerText';

const HeaderText = () => {
  const dispatch = useDispatch();
  const headerText = useSelector(getHeaderText);

  const headerTextChanged = useCallback((e, v) => dispatch(setHeaderText(v)), [
    dispatch,
  ]);

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
