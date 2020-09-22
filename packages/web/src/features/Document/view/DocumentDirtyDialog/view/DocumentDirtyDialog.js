import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Prompt, withRouter } from 'react-router-dom';

import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

import { selectIsDocumentDirty } from '../../../redux/DocumentStatus';

// if errors occur check this: https://medium.com/@michaelchan_13570/using-react-router-v4-prompt-with-custom-modal-component-ca839f5faf39

const unsavedChangesText = 'Änderungen nicht gespeichert, trotzdem forfahren?';

class DocumentDirtyDialog extends Component {
  dialogContentProps = {
    type: DialogType.normal,
    title: 'Achtung',
    subText: unsavedChangesText,
  };

  modalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      lastLocation: null,
      confirmedNavigation: false,
    };
  }

  componentWillUnmount = () => {
    window.onbeforeunload = null;
  };

  showModal = (location) =>
    this.setState({
      isModalVisible: true,
      lastLocation: location,
    });

  closeModal = () =>
    this.setState({
      isModalVisible: false,
    });

  handleBlockedNavigation = (nextLocation) => {
    const { confirmedNavigation } = this.state;

    if (!confirmedNavigation) {
      this.showModal(nextLocation);
      return false;
    }

    return true;
  };

  handleConfirmNavigationClick = () => {
    this.closeModal();

    const { lastLocation } = this.state;
    const { history } = this.props;

    if (lastLocation) {
      this.setState(
        {
          confirmedNavigation: true,
        },
        () => {
          // Navigate to the previous blocked location with your navigate function
          history.push(lastLocation.pathname);
        },
      );
    }
  };

  render() {
    const { isDocumentDirty } = this.props;
    const { isModalVisible } = this.state;

    if (isDocumentDirty) {
      window.onbeforeunload = () => unsavedChangesText;
    } else {
      window.onbeforeunload = () => null;
    }

    return (
      <>
        <Prompt when={isDocumentDirty} message={this.handleBlockedNavigation} />
        <Dialog
          hidden={!isModalVisible}
          onDismiss={this.closeModal}
          dialogContentProps={this.dialogContentProps}
          modalProps={this.modalProps}
        >
          <DialogFooter>
            <DefaultButton
              onClick={this.handleConfirmNavigationClick}
              text="Ja"
            />
            <PrimaryButton onClick={this.closeModal} text="Nein" />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}

DocumentDirtyDialog.propTypes = {
  isDocumentDirty: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isDocumentDirty: selectIsDocumentDirty(state),
});

export default connect(mapStateToProps, null)(withRouter(DocumentDirtyDialog));
