import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { connect } from 'react-redux';

import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';

import ConfirmationModal from '../../../Shared/ConfirmationModal';

import { createMenuItems } from '../MenuItems';

import {
  createInvoice as createInvoiceAction,
  createInvoiceFromOffer as createInvoiceFromOfferAction,
  createOffer as createOfferAction,
  deleteDocument as deleteDocumentAction,
  duplicateDocument as duplicateDocumentAction,
  printDocument as printDocumentAction,
} from '../../../../actions';

import { selectSelectedDocumentType } from '../../redux/Documents';

const listContextMenuId = 'listContextMenuId';
const listContextMenuAddButtonId = 'listContextMenuAddButtonId';

class ContextMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      isContextMenuVisible: false,
      contextMenuTarget: null,
      isModalVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  hideRemoveConfirmationModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  deleteDocumentConfirmed = () => {
    this.hideRemoveConfirmationModal();
    this.props.deleteDocument(false);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const stateUpdate = {};

    if (prevProps.selectedDocumentType !== this.props.selectedDocumentType) {
      if (_.isEmpty(this.props.selectedDocumentType)) {
        stateUpdate.isContextMenuVisible = false;
      } else {
        stateUpdate.menuItems = createMenuItems({
          selectedDocumentType: this.props.selectedDocumentType,
          createOfferClicked: () => this.props.createOffer(true),
          createInvoiceClicked: () => this.props.createInvoice(true),
          createInvoiceFromOfferClicked: () =>
            this.props.createInvoiceFromOffer(true),
          duplicateDocumentClicked: () => this.props.duplicateDocument(true),
          printDocumentClicked: () => this.props.printDocument(true),
          deleteDocumentClicked: this.showModal,
        });

        stateUpdate.menuItems[0].id = listContextMenuAddButtonId;
      }
    }

    if (
      prevProps.contextMenuEvent !== this.props.contextMenuEvent &&
      !_.isEmpty(this.props.contextMenuEvent)
    ) {
      stateUpdate.isContextMenuVisible = true;
      stateUpdate.contextMenuTarget = {
        x: this.props.contextMenuEvent.clientX,
        y: this.props.contextMenuEvent.clientY,
      };

      document.addEventListener('scroll', this.handleScroll);
      document.addEventListener('click', this.handleClick);
    }

    if (!_.isEmpty(stateUpdate)) {
      this.setState(stateUpdate);
    }
  }

  handleContextMenu = (event) => {
    // don't bubble up right clicks to native browser in production
    // if is encapsulated in useEffect for linting-errors
    if (process.env.NODE_ENV === 'production') {
      event.preventDefault();
    }
  };

  handleScroll = () => {
    // TODO: maybe change this to block scrolling for the whole window
    //  when context menu is open like it is default for most native operating systems
    this.hideContextMenu();
  };

  hideContextMenu = () => {
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClick);

    this.setState({
      isContextMenuVisible: false,
    });
  };

  handleClick = (event) => {
    let wasOutside = true;

    const contextMenuDomElement = document.getElementById(
      listContextMenuAddButtonId,
    );

    // maybe this check is not required as in the docs it was working
    // however, i was not able to reproduce this so this workaround for
    // the submenu was necessary
    if (contextMenuDomElement && contextMenuDomElement.contains(event.target)) {
      wasOutside = false;
    }

    // contextMenuVisible is checked to not reset the state and minimize redraw if nothing changed
    if (wasOutside) {
      this.hideContextMenu();
    }
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClick);
  }

  render() {
    return (
      <>
        {this.state.isContextMenuVisible && (
          <ContextualMenu
            id={listContextMenuId}
            useTargetPoint="true"
            target={this.state.contextMenuTarget}
            items={this.state.menuItems}
          />
        )}
        {this.state.isModalVisible && (
          <ConfirmationModal
            isVisible={this.state.isModalVisible}
            title="Bestätigung"
            text="Dokument wirklich löschen?"
            modalCancel={this.hideRemoveConfirmationModal}
            modalConfirm={this.deleteDocumentConfirmed}
          />
        )}
      </>
    );
  }
}

ContextMenu.propTypes = {
  contextMenuEvent: PropTypes.object,
  selectedDocumentType: PropTypes.string,
  createOffer: PropTypes.func.isRequired,
  createInvoice: PropTypes.func.isRequired,
  createInvoiceFromOffer: PropTypes.func.isRequired,
  duplicateDocument: PropTypes.func.isRequired,
  printDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

ContextMenu.defaultProps = {
  contextMenuEvent: null,
  selectedDocumentType: null,
};

const mapStateToProps = (state) => ({
  selectedDocumentType: selectSelectedDocumentType(state),
});

const mapDispatchToProps = {
  createOffer: createOfferAction,
  createInvoice: createInvoiceAction,
  createInvoiceFromOffer: createInvoiceFromOfferAction,
  duplicateDocument: duplicateDocumentAction,
  printDocument: printDocumentAction,
  deleteDocument: deleteDocumentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
