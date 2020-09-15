import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Stack } from '@fluentui/react/lib/Stack';
import { CommandBar as FabricCommandBar } from '@fluentui/react/lib/CommandBar';

import {
  navigateBack as navigateBackAction,
  printDocument as printDocumentAction,
  saveDocument as saveDocumentAction,
  duplicateDocument as duplicateDocumentAction,
  createInvoiceFromOffer as createInvoiceFromOfferAction,
  deleteDocument as deleteDocumentAction,
} from '../../../../actions';

import { getIsDocumentValid } from '../redux/isDocumentValid';
import { getIsDocumentDirty } from '../../DocumentDirtyDialog/redux/isDocumentDirty';

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

  useEffect(() => {
    setItems(
      generateItems({
        navigateBack,
        saveDocument,
        duplicateDocument,
        createInvoiceFromOffer,
        printDocument,
        deleteDocument,
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
    setFarItems(generateFarItems(isDocumentDirty, isDocumentValid));
  }, [isDocumentDirty, isDocumentValid]);

  return (
    <Stack className={styles.fixed}>
      <FabricCommandBar items={items} farItems={farItems} />
    </Stack>
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
  isDocumentValid: getIsDocumentValid(state),
  isDocumentDirty: getIsDocumentDirty(state),
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
