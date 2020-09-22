import React from 'react';

import 'moment/locale/de';

import { loadTheme, registerIcons } from '@fluentui/react';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faEdit,
  faFileInvoice,
  faFileInvoiceDollar,
  faCopy,
  faPrint,
  faTrashAlt,
  faChevronDown,
  faChevronRight,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faSave,
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
  faFileSignature,
  faFileContract,
  faArrowsAltV,
  faTimes,
  faDownload,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { initializeIcons } from '@fluentui/react/lib/Icons';

// library could be replaced by setting <FontAwesomeIcon icon={faEdit} />
// directly, but this is only advantageous if the icon is only configured
// in this file and in all other files the fluent-icon-component is used
// which is not clear until now, so the more boilerplate was being chosen
library.add(
  faPlus,
  faEdit,
  faFileInvoice,
  faFileInvoiceDollar,
  faCopy,
  faPrint,
  faTrashAlt,
  faChevronDown,
  faChevronRight,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faSave,
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
  faFileSignature,
  faFileContract,
  faArrowsAltV,
  faTimes,
  faDownload,
  faUpload,
);

// don't load the included icons as the license does not
// meet the requirements of this project
// initializeIcons();

registerIcons({
  icons: {
    Add: <FontAwesomeIcon icon="plus" />,
    Edit: <FontAwesomeIcon icon="edit" />,
    Offer: <FontAwesomeIcon icon="file-invoice" />,
    Invoice: <FontAwesomeIcon icon="file-invoice-dollar" />,
    Copy: <FontAwesomeIcon icon="copy" />,
    Print: <FontAwesomeIcon icon="print" />,
    Delete: <FontAwesomeIcon icon="trash-alt" />,
    ChevronDown: <FontAwesomeIcon icon="chevron-down" />,
    ChevronRight: <FontAwesomeIcon icon="chevron-right" />,
    Calendar: <FontAwesomeIcon icon="calendar-alt" />,
    Up: <FontAwesomeIcon icon="arrow-up" />,
    Down: <FontAwesomeIcon icon="arrow-down" />,
    Back: <FontAwesomeIcon icon="arrow-left" />,
    Save: <FontAwesomeIcon icon="save" />,
    More: <FontAwesomeIcon icon="ellipsis-h" />,
    Completed: <FontAwesomeIcon icon="check-circle" />,
    ErrorBadge: <FontAwesomeIcon icon="times-circle" />,
    FieldChanged: <FontAwesomeIcon icon="file-signature" />,
    FieldNotChanged: <FontAwesomeIcon icon="file-contract" />,
    DragObject: <FontAwesomeIcon icon="arrows-alt-v" />,
    Cancel: <FontAwesomeIcon icon="times" />,
    Download: <FontAwesomeIcon icon="download" />,
    Upload: <FontAwesomeIcon icon="upload" />,
  },
});

// load a different font as the default font does not
// meet the requirements of this project
loadTheme({
  defaultFontStyle: {
    fontFamily: "'Open Sans', sans-serif",
  },
});
