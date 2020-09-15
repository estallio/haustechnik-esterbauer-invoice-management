import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';

import { Stack } from '@fluentui/react/lib/Stack';

import CommandBar from '../../CommandBar';
import DocumentDirtyDialog from '../../DocumentDirtyDialog';
import WhitePageContainer from '../../WhitePageContainer';
import FullPageSpinner from '../../FullPageSpinner';

import { loadDocument } from '../../../../actions';

import { getIsDocumentReady } from '../redux/isDocumentReady';

import styles from './DocumentContainer.module.scss';

const DocumentContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadDocument(id));
  }, [id, dispatch]);

  const isDocumentReady = useSelector(getIsDocumentReady);

  if (!isDocumentReady) {
    return <FullPageSpinner />;
  }

  // TODO: WhitePageContainer does not provide a min-height so all
  //  elements are collected at the top and a white border is visible
  //  at the bottom - this should be fixed
  return (
    <Stack className={styles.fixed}>
      {/* TODO: clicking DocumentDirtyDialog causes rerender/redux actions */}
      <DocumentDirtyDialog />
      <CommandBar />
      <WhitePageContainer />
    </Stack>
  );
};

export default DocumentContainer;
