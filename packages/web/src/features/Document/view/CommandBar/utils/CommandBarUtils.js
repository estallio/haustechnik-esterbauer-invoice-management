import React from 'react';

import FarItemComponent from '../view/FarItemComponent';

export const generateItems = ({
  navigateBackClicked,
  saveDocumentClicked,
  duplicateDocumentClicked,
  printDocumentClicked,
  createInvoiceFromOfferClicked,
  deleteDocumentClicked,
}) => {
  return [
    {
      key: 'back',
      name: 'Zurück',
      iconProps: {
        iconName: 'Back',
      },
      onClick: () => navigateBackClicked(),
    },
    {
      key: 'save',
      name: 'Speichern',
      iconProps: {
        iconName: 'Save',
      },
      onClick: () => saveDocumentClicked(),
    },
    {
      key: 'duplicate',
      name: 'Duplizieren',
      iconProps: {
        iconName: 'Copy',
      },
      onClick: () => duplicateDocumentClicked(),
    },
    {
      key: 'print',
      name: 'Drucken',
      iconProps: {
        iconName: 'Print',
      },
      onClick: () => printDocumentClicked(),
    },
    {
      key: 'makeInvoice',
      name: 'Rechnung erstellen',
      iconProps: {
        iconName: 'Invoice',
      },
      onClick: () => createInvoiceFromOfferClicked(),
    },
    {
      key: 'delete',
      name: 'Löschen',
      iconProps: {
        iconName: 'Delete',
      },
      onClick: () => deleteDocumentClicked(),
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
      iconOnly: true,
      commandBarButtonAs: () => createStatusComponent(isDocumentValid),
    },
    {
      key: 'unsaved',
      name: 'Speicherstatus',
      iconOnly: true,
      commandBarButtonAs: () => createUnsavedComponent(isDocumentDirty),
    },
  ];
};
