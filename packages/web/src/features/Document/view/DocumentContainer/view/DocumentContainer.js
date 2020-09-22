import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';

import { Stack } from '@fluentui/react/lib/Stack';

import WhitePageContainer from '../../../../Shared/WhitePageContainer';

import CommandBar from '../../CommandBar';

import DocumentDirtyDialog from '../../DocumentDirtyDialog';

import FullPageSpinner from '../../FullPageSpinner';

import { loadDocument } from '../../../../../actions';

import { selectIsDocumentReady } from '../../../redux/DocumentStatus';

import Id from '../../Id';
import DocumentType from '../../DocumentType';
import MetaFields from '../../MetaFields';
import Headings from '../../Headings';
import PositionListContainer from '../../Positions';
import BottomFields from '../../BottomFields';
import SaveButton from '../../SaveButton';

import styles from './DocumentContainer.module.scss';

const DocumentContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadDocument(id));
  }, [id, dispatch]);

  const isDocumentReady = useSelector(selectIsDocumentReady);

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
      <WhitePageContainer>
        <Stack.Item>
          <Stack horizontal>
            <Stack.Item grow>
              <DocumentType />
            </Stack.Item>
            <Stack.Item>
              <Id />
            </Stack.Item>
          </Stack>
        </Stack.Item>

        <Stack.Item>
          <MetaFields />
        </Stack.Item>

        <Stack.Item>
          <Headings />
        </Stack.Item>

        <Stack.Item grow>
          <PositionListContainer />
        </Stack.Item>

        <Stack.Item>
          <BottomFields />
        </Stack.Item>

        <Stack.Item>
          <SaveButton />
        </Stack.Item>
      </WhitePageContainer>
    </Stack>
  );
};

export default DocumentContainer;
