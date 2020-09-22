import { OFFER } from '../../../../database/constants';

export const createMenuItems = ({
  selectedDocumentType,
  createOfferClicked,
  createInvoiceClicked,
  createInvoiceFromOfferClicked,
  duplicateDocumentClicked,
  printDocumentClicked,
  deleteDocumentClicked,
}) => {
  const menuItems = [
    {
      key: 'new',
      name: 'Neu',
      iconProps: {
        iconName: 'Add',
      },
      subMenuProps: {
        items: [
          {
            key: 'offer',
            name: 'Angebot',
            iconProps: {
              iconName: 'Offer',
            },
            onClick: () => createOfferClicked(),
          },
          {
            key: 'invoice',
            name: 'Rechnung',
            iconProps: {
              iconName: 'Invoice',
            },
            onClick: () => createInvoiceClicked(),
          },
        ],
      },
    },
  ];

  if (selectedDocumentType) {
    menuItems.push({
      key: 'duplicate',
      name: 'Duplizieren',
      iconProps: {
        iconName: 'Copy',
      },
      onClick: () => duplicateDocumentClicked(),
    });

    menuItems.push({
      key: 'print',
      name: 'Drucken',
      iconProps: {
        iconName: 'Print',
      },
      onClick: () => printDocumentClicked(),
    });

    if (selectedDocumentType === OFFER) {
      menuItems.push({
        key: 'makeInvoice',
        name: 'Rechnung erstellen',
        iconProps: {
          iconName: 'Invoice',
        },
        onClick: () => createInvoiceFromOfferClicked(),
      });
    }

    menuItems.push({
      key: 'delete',
      name: 'Löschen',
      iconProps: {
        iconName: 'Delete',
      },
      onClick: () => deleteDocumentClicked(),
    });
  }

  return menuItems;
};
