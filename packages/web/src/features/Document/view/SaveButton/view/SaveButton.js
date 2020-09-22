import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Stack } from '@fluentui/react/lib/Stack';

import { PrimaryButton } from '@fluentui/react/lib/Button';

import { saveDocument } from '../../../../../actions';

import { selectDocumentStatus } from '../../../redux/DocumentStatus';

import styles from './SaveButton.module.scss';

const SaveButton = () => {
  const dispatch = useDispatch();

  const saveButtonClicked = useCallback(() => {
    dispatch(saveDocument());
  }, [dispatch]);

  const isDocumentDirty = useSelector(
    (state) => selectDocumentStatus(state).isDocumentDirty,
  );

  return (
    <Stack className={styles.wrapper}>
      <Stack.Item align="end">
        <PrimaryButton
          disabled={!isDocumentDirty}
          onClick={saveButtonClicked}
          text="Speichern"
        />
      </Stack.Item>
    </Stack>
  );
};

export default SaveButton;
