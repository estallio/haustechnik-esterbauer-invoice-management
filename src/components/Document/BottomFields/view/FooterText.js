import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { selectFooterText, setFooterText } from '../redux/footerText';

const FooterText = () => {
  const dispatch = useDispatch();
  const footerText = useSelector(selectFooterText);

  const footerTextChanged = useCallback((e, v) => dispatch(setFooterText(v)), [
    dispatch,
  ]);

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
