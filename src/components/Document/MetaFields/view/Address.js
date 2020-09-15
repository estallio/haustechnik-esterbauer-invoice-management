import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getAddress, setAddress } from '../redux/address';

import styles from './Address.module.scss';

const Address = () => {
  const dispatch = useDispatch();
  const address = useSelector(getAddress);

  const addressChanged = useCallback((e, v) => dispatch(setAddress(v)), [
    dispatch,
  ]);

  return (
    <TextField
      label="Anschrift"
      multiline
      rows={5}
      inputClassName={styles.addressTextArea}
      value={address}
      onChange={addressChanged}
    />
  );
};

export default Address;
