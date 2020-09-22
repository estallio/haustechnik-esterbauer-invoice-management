import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Stack } from '@fluentui/react/lib/Stack';
import { CommandBar as FabricCommandBar } from '@fluentui/react/lib/CommandBar';

import ConfirmationModal from '../../../../Shared/ConfirmationModal';

import {
  navigateBack as navigateBackAction,
  printDocument as printDocumentAction,
  saveDocument as saveDocumentAction,
  duplicateDocument as duplicateDocumentAction,
  createInvoiceFromOffer as createInvoiceFromOfferAction,
  deleteDocument as deleteDocumentAction,
} from '../../../../../actions';

import {
  selectIsDocumentValid,
  selectIsDocumentDirty,
} from '../../../redux/DocumentStatus';

import { generateFarItems, generateItems } from '../utils/CommandBarUtils';

import styles from './CommandBar.module.scss';

const CommandBar = ({
  isDocumentDirty,
  isDocumentValid,
  navigateBack,
  printDocument,
  saveDocument,
  createInvoiceFromOffer,
  duplicateDocument,
  deleteDocument,
}) => {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideRemoveConfirmationModal = () => {
    setIsModalVisible(false);
  };

  const deleteDocumentConfirmed = () => {
    setIsModalVisible(false);
    deleteDocument(true);
  };

  useEffect(() => {
    setItems(
      generateItems({
        navigateBackClicked: navigateBack,
        saveDocumentClicked: saveDocument,
        duplicateDocumentClicked: () => duplicateDocument(true),
        createInvoiceFromOfferClicked: () => createInvoiceFromOffer(true),
        printDocumentClicked: () => printDocument(false),
        deleteDocumentClicked: showModal,
      }),
    );
  }, [
    navigateBack,
    printDocument,
    saveDocument,
    createInvoiceFromOffer,
    duplicateDocument,
    deleteDocument,
  ]);

  const [farItems, setFarItems] = useState([]);

  useEffect(() => {
    setFarItems(generateFarItems(isDocumentValid, isDocumentDirty));
  }, [isDocumentDirty, isDocumentValid]);

  return (
    <>
      <Stack className={styles.fixed}>
        <FabricCommandBar items={items} farItems={farItems} />
      </Stack>
      {isModalVisible && (
        <ConfirmationModal
          isVisible={isModalVisible}
          title="Bestätigung"
          text="Dokument wirklich löschen?"
          modalCancel={hideRemoveConfirmationModal}
          modalConfirm={deleteDocumentConfirmed}
        />
      )}
    </>
  );
};

CommandBar.propTypes = {
  isDocumentDirty: PropTypes.bool.isRequired,
  isDocumentValid: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  printDocument: PropTypes.func.isRequired,
  saveDocument: PropTypes.func.isRequired,
  duplicateDocument: PropTypes.func.isRequired,
  createInvoiceFromOffer: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDocumentValid: selectIsDocumentValid(state),
  isDocumentDirty: selectIsDocumentDirty(state),
});

const mapDispatchToProps = {
  navigateBack: navigateBackAction,
  printDocument: printDocumentAction,
  saveDocument: saveDocumentAction,
  duplicateDocument: duplicateDocumentAction,
  deleteDocument: deleteDocumentAction,
  createInvoiceFromOffer: createInvoiceFromOfferAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CommandBar));
