import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import styles from './Address.module.scss';
import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const Address = () => {
  const dispatch = useDispatch();

  const address = useSelector(
    (state) => selectDocumentData(state).address || '',
  );

  const addressChanged = useCallback(
    (e, v) => dispatch(setDocumentDataByKey('address', v)),
    [dispatch],
  );

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
