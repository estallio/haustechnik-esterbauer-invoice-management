import React from 'react';

import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import PropTypes from 'prop-types';

const ConfirmationModal = ({
  isVisible,
  title,
  text,
  modalConfirm,
  modalCancel,
}) => {
  const dialogContentProps = {
    type: DialogType.normal,
    title,
    subText: text,
  };

  const modalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: 450 } },
  };

  return (
    <Dialog
      hidden={!isVisible}
      onDismiss={() => modalCancel()}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    >
      <DialogFooter>
        <DefaultButton onClick={() => modalConfirm()} text="Ja" />
        <PrimaryButton onClick={() => modalCancel()} text="Nein" />
      </DialogFooter>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  modalConfirm: PropTypes.func.isRequired,
  modalCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
