import React from 'react';

import FarItemComponent from '../view/FarItemComponent';

export const generateItems = ({
  navigateBack,
  saveDocument,
  duplicateDocument,
  printDocument,
  createInvoiceFromOffer,
  deleteDocument,
}) => {
  return [
    {
      key: 'back',
      name: 'Zurück',
      iconProps: {
        iconName: 'Back',
      },
      onClick: () => navigateBack(),
    },
    {
      key: 'save',
      name: 'Speichern',
      iconProps: {
        iconName: 'Save',
      },
      onClick: () => saveDocument(),
    },
    {
      key: 'duplicate',
      name: 'Duplizieren',
      iconProps: {
        iconName: 'Copy',
      },
      onClick: () => duplicateDocument(),
    },
    {
      key: 'print',
      name: 'Drucken',
      iconProps: {
        iconName: 'Print',
      },
      onClick: () => printDocument(false),
    },
    {
      key: 'makeInvoice',
      name: 'Rechnung erstellen',
      iconProps: {
        iconName: 'Invoice',
      },
      onClick: () => createInvoiceFromOffer(),
    },
    {
      key: 'delete',
      name: 'Löschen',
      iconProps: {
        iconName: 'Delete',
      },
      onClick: () => deleteDocument(),
    },
  ];
};

const createStatusComponent = (isDocumentValid) => {
  return (
    <FarItemComponent
      iconName={isDocumentValid ? 'Completed' : 'ErrorBadge'}
      text={isDocumentValid ? 'Dokument gültig' : 'Dokument ungültig'}
      isError={!isDocumentValid}
    />
  );
};

const createUnsavedComponent = (isDocumentDirty) => {
  return (
    <FarItemComponent
      iconName={isDocumentDirty ? 'FieldChanged' : 'FieldNotChanged'}
      text={
        isDocumentDirty
          ? 'Änderungen nicht gespeichert'
          : 'Änderungen gespeichert'
      }
      isError={isDocumentDirty}
    />
  );
};

export const generateFarItems = (isDocumentValid, isDocumentDirty) => {
  return [
    {
      key: 'status',
      name: 'Status',
      ariaLabel: 'Status',
      iconOnly: true,
      commandBarButtonAs: () => createStatusComponent(isDocumentValid),
    },
    {
      key: 'unsaved',
      name: 'Ungespeichert',
      ariaLabel: 'Ungespeichert',
      iconOnly: true,
      commandBarButtonAs: () => createUnsavedComponent(isDocumentDirty),
    },
  ];
};
