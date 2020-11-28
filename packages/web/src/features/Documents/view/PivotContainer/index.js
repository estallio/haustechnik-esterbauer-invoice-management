import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Stack } from '@fluentui/react/lib/Stack';

import { isCurrency, currencyToNumber } from '../../../../utils/numberUtils';

import SearchBar from '../Search';
import DocumentsCommandBar from '../CommandBar';
import ContextMenu from '../ContextMenu';
import DocumentsList from '../DocumentsList';

import WhitePageContainer from '../../../Shared/WhitePageContainer';

import { loadDocuments as loadDocumentsAction } from '../../../../actions';

import { selectSearchParams } from '../../redux/SearchBarData';

import { selectInvoices, selectOffers } from '../../redux/Documents';

import {
  setSelectedId as setSelectedIdAction,
  selectIsLoading,
} from '../../redux/ListData';

import styles from './styles.module.scss';

const offerPivotItemKey = 'offerPivotItemKey';
const invoicePivotItemKey = 'invoicePivotItemKey';

// TODO: maybe here is also some potential to enhance performance
const DocumentsContainer = ({
  isLoading,
  invoices,
  offers,
  loadDocuments,
  setSelectedDocumentId,
  searchParams,
}) => {
  const [selectedPivotItem, setSelectedPivotItem] = useState(offerPivotItemKey);
  const [contextMenuEvent, setContextMenuEvent] = useState(null);

  useEffect(() => {
    loadDocuments(searchParams);
  }, [searchParams]);

  const pivotItemSelectionChanged = (item) => {
    if (selectedPivotItem !== item.props.itemKey) {
      // reset document selection - this changes state and forces components to redraw
      // and the registered use-effect click events of the components will not fire
      setSelectedDocumentId(null);
      setSelectedPivotItem(item.props.itemKey);
    }
  };

  const showContextMenu = (item, index, event) => {
    setContextMenuEvent({
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const selectedInvoiceChanged = (invoice) => {
    if (selectedPivotItem !== offerPivotItemKey) {
      setSelectedDocumentId(invoice ? invoice.id : null);
    }
  };

  const selectedOfferChanged = (offer) => {
    if (selectedPivotItem === offerPivotItemKey) {
      setSelectedDocumentId(offer ? offer.id : null);
    }
  };

  return (
    <>
      <DocumentsCommandBar />
      <WhitePageContainer disableShadow whiteBackground>
        {/* TODO: check if stack item is needed because of grow */}
        <Stack.Item>
          <SearchBar />
        </Stack.Item>
        <Stack.Item grow>
          <ContextMenu contextMenuEvent={contextMenuEvent} />
          <Pivot
            onLinkClick={pivotItemSelectionChanged}
            defaultSelectedKey={invoicePivotItemKey}
          >
            {/* TODO: memory if invoices or offers are selected */}
            <PivotItem
              itemKey={offerPivotItemKey}
              headerText="Angebote"
              itemCount={offers.length}
              itemIcon="Offer"
              className={styles.paddingTopAndBottom20}
            >
              {/* TODO: memory selection and scroll-position or do it with pagination */}
              <DocumentsList
                selectedDocumentChanged={selectedOfferChanged}
                showContextMenu={showContextMenu}
                isLoading={isLoading}
                items={offers}
              />
            </PivotItem>
            <PivotItem
              itemKey={invoicePivotItemKey}
              headerText="Rechnungen"
              itemCount={invoices.length}
              itemIcon="Invoice"
              className={styles.paddingTopAndBottom20}
            >
              <DocumentsList
                selectedDocumentChanged={selectedInvoiceChanged}
                showContextMenu={showContextMenu}
                isLoading={isLoading}
                items={invoices}
              />
            </PivotItem>
          </Pivot>
        </Stack.Item>
      </WhitePageContainer>
    </>
  );
};

DocumentsContainer.propTypes = {
  isLoading: PropTypes.bool,
  invoices: PropTypes.array.isRequired,
  offers: PropTypes.array.isRequired,
  loadDocuments: PropTypes.func.isRequired,
  setSelectedDocumentId: PropTypes.func.isRequired,
  searchParams: PropTypes.object.isRequired,
};

DocumentsContainer.defaultProps = {
  isLoading: false,
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  invoices: selectInvoices(state),
  offers: selectOffers(state),
  searchParams: selectSearchParams(state),
});

export default connect(mapStateToProps, {
  loadDocuments: loadDocumentsAction,
  setSelectedDocumentId: setSelectedIdAction,
})(withRouter(DocumentsContainer));
