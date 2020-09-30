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
  setIsDocumentDirty as setIsDocumentDirtyAction,
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
  setIsDocumentDirty,
  deleteDocument,
}) => {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalState, setModalState] = useState(null);

  const showModal = (state) => {
    setIsModalVisible(true);
    setModalState(state);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const modalConfirmed = () => {
    setIsModalVisible(false);

    switch (modalState) {
      case 'duplicateDocument':
        setIsDocumentDirty(false);
        duplicateDocument(true);
        break;
      case 'createInvoiceFromOffer':
        setIsDocumentDirty(false);
        createInvoiceFromOffer(true);
        break;
      case 'deleteDocument':
        setIsDocumentDirty(false);
        deleteDocument(true);
        break;
      default:
    }

    setModalState(null);
  };

  useEffect(() => {
    setItems(
      generateItems({
        navigateBackClicked: navigateBack,
        saveDocumentClicked: saveDocument,
        duplicateDocumentClicked: () =>
          isDocumentDirty
            ? showModal('duplicateDocument')
            : duplicateDocument(true),
        createInvoiceFromOfferClicked: () =>
          isDocumentDirty
            ? showModal('createInvoiceFromOffer')
            : createInvoiceFromOffer(true),
        printDocumentClicked: () => printDocument(false),
        deleteDocumentClicked: () => showModal('deleteDocument'),
      }),
    );
  }, [
    navigateBack,
    printDocument,
    saveDocument,
    createInvoiceFromOffer,
    duplicateDocument,
    deleteDocument,
    isDocumentDirty,
  ]);

  const [farItems, setFarItems] = useState([]);

  useEffect(() => {
    setFarItems(generateFarItems(isDocumentValid, isDocumentDirty));
  }, [isDocumentDirty, isDocumentValid]);

  const getModalText = (state) => {
    switch (state) {
      case 'duplicateDocument':
        return 'Es gibt ungespeicherte Änderungen. Wirklich fortfahren?';
      case 'createInvoiceFromOffer':
        return 'Es gibt ungespeicherte Änderungen. Wirklich fortfahren?';
      case 'deleteDocument':
        return 'Dokument wirklich löschen?';
      default:
        return 'Wirklich forfahren?';
    }
  };

  return (
    <>
      <Stack className={styles.fixed}>
        <FabricCommandBar items={items} farItems={farItems} />
      </Stack>
      {isModalVisible && (
        <ConfirmationModal
          isVisible={isModalVisible}
          title="Bestätigung"
          text={getModalText(modalState)}
          modalCancel={hideModal}
          modalConfirm={modalConfirmed}
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
  setIsDocumentDirty: PropTypes.func.isRequired,
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
  setIsDocumentDirty: setIsDocumentDirtyAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CommandBar));
