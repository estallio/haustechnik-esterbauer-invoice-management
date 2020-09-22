import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, connect } from 'react-redux';

import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { Stack } from '@fluentui/react/lib/Stack';

import ConfirmationModal from '../../../Shared/ConfirmationModal';

import { createMenuItems } from '../MenuItems';

import {
  createOffer as createOfferAction,
  createInvoice as createInvoiceAction,
  createInvoiceFromOffer as createInvoiceFromOfferAction,
  duplicateDocument as duplicateDocumentAction,
  printDocument as printDocumentAction,
  deleteDocument as deleteDocumentAction,
  exportDatabase as exportDatabaseAction,
  importDatabase as importDatabaseAction,
} from '../../../../actions';

import { selectSelectedDocumentType } from '../../redux/Documents';

import styles from './styles.module.scss';

const DocumentsCommandBar = ({
  createOffer,
  createInvoice,
  createInvoiceFromOffer,
  duplicateDocument,
  printDocument,
  deleteDocument,
  exportDatabase,
  importDatabase,
}) => {
  const selectedDocumentType = useSelector(selectSelectedDocumentType);

  const [menuItems, setMenuItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideRemoveConfirmationModal = () => {
    setIsModalVisible(false);
  };

  const deleteDocumentConfirmed = () => {
    setIsModalVisible(false);
    deleteDocument(false);
  };

  useEffect(() => {
    setMenuItems(
      createMenuItems({
        selectedDocumentType,
        createOfferClicked: () => createOffer(true),
        createInvoiceClicked: () => createInvoice(true),
        createInvoiceFromOfferClicked: () => createInvoiceFromOffer(true),
        duplicateDocumentClicked: () => duplicateDocument(true),
        printDocumentClicked: () => printDocument(true),
        deleteDocumentClicked: showModal,
      }),
    );
  }, [selectedDocumentType]);

  const getFile = (contentType, multiple) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      input.accept = contentType;

      input.onchange = () => {
        const files = Array.from(input.files);
        if (multiple) resolve(files);
        else resolve(files[0]);
      };

      input.click();
    });
  };

  const showFileDialog = () => {
    getFile('application/JSON', false).then((file) => {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result; // this is the content!
        importDatabase(JSON.parse(content));
      };
    });
  };

  const [farItems, setFarItems] = useState([]);

  useEffect(() => {
    setFarItems([
      {
        key: 'import',
        name: 'Importieren',
        iconProps: {
          iconName: 'Upload',
        },
        onClick: () => showFileDialog(),
      },
      {
        key: 'export',
        name: 'Exportieren',
        iconProps: {
          iconName: 'Download',
        },
        onClick: () => exportDatabase(),
      },
    ]);
  }, []);

  return (
    <>
      <Stack className={styles.fixedTopCommandBar}>
        <CommandBar items={menuItems} farItems={farItems} />
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

DocumentsCommandBar.propTypes = {
  createOffer: PropTypes.func.isRequired,
  createInvoice: PropTypes.func.isRequired,
  createInvoiceFromOffer: PropTypes.func.isRequired,
  duplicateDocument: PropTypes.func.isRequired,
  printDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  exportDatabase: PropTypes.func.isRequired,
  importDatabase: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createOffer: createOfferAction,
  createInvoice: createInvoiceAction,
  createInvoiceFromOffer: createInvoiceFromOfferAction,
  duplicateDocument: duplicateDocumentAction,
  printDocument: printDocumentAction,
  deleteDocument: deleteDocumentAction,
  exportDatabase: exportDatabaseAction,
  importDatabase: importDatabaseAction,
};

export default connect(null, mapDispatchToProps)(DocumentsCommandBar);
