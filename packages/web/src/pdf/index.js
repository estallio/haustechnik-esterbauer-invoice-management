import pdfMake from 'pdfmake/build/pdfmake';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
import moment from 'moment';
import _ from 'lodash';

import pdfFonts from '../fonts/vfs_fonts';

import {
  BACKGROUND,
  DEFAULT_STYLE,
  FONTS,
  FOOTER,
  HEADER,
  IMAGES,
  PAGE_MARGINS,
  STYLES,
  FIRST_PAGE_MAX_HEIGHT,
  PAGE_MAX_HEIGHT,
  TABLE_HEADER,
} from './constants';
import {
  INVOICE,
  GROUP,
  POSITION,
  HOURS,
  LITRES,
  METERS,
  PIECES,
} from '../database/constants';

let pdfMakeReady = false;

let actualPagePosition = 0;
let compareHeight = FIRST_PAGE_MAX_HEIGHT;

const kit = new PDFDocument({ autoFirstPage: false });

const fonts = [];

export default async function createPDF(doc) {
  if (!pdfMakeReady) {
    initPDFMake();
  }

  const createdPdfDocument = pdfMake.createPdf({
    pageMargins: PAGE_MARGINS,
    defaultStyle: DEFAULT_STYLE,
    header: HEADER,
    footer: FOOTER,
    background: BACKGROUND,
    styles: STYLES,
    content: makePdfContent(doc),
    images: IMAGES,
    pageSize: 'A4',
  });

  if (process.env.USE_PDF_FILE_SYSTEM) {
    const fs = require('fs');
    const { app, BrowserWindow, getCurrentWindow } = require('electron').remote;

    let win;
    const windows = BrowserWindow.getAllWindows();

    if (windows.length <= 1) {
      win = new BrowserWindow({
        width: 1024,
        height: 768,
        title: 'Rechnungen',
      });
    } else {
      win = windows.filter((window) => window.id !== getCurrentWindow().id)[0];
    }

    createdPdfDocument.getBuffer((buffer) => {
      let pdfName = 'Angebot';
      if (doc.type === INVOICE) {
        pdfName = 'Rechnung';
      }
      const pdfFilePath = `${app.getPath('temp')}/${pdfName}_${
        doc.documentId
      }_${doc.customer.name}_${moment.unix(doc.date).format('DD.MM.YYYY')}.pdf`;
      fs.writeFileSync(pdfFilePath, buffer);
      win.loadURL(
        `file://${app.getAppPath()}/web/pdf/pdfjs/web/viewer.html?file=${pdfFilePath}`,
      );
      win.show();
      win.focus();
    });
  } else {
    createdPdfDocument.open();
  }
}

function initPDFMake() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = FONTS;

  // TODO: fonts can be reduced and served from another place, maybe self-hosted or Google? - no internet requirement
  fonts.openSansLight = Buffer.from(
    pdfFonts.pdfMake.vfs['OpenSans-Light.ttf'],
    'base64',
  );
  fonts.openSansRegular = Buffer.from(
    pdfFonts.pdfMake.vfs['OpenSans-Regular.ttf'],
    'base64',
  );
  fonts.openSansItalic = Buffer.from(
    pdfFonts.pdfMake.vfs['OpenSans-Italic.ttf'],
    'base64',
  );
  fonts.openSansSemibold = Buffer.from(
    pdfFonts.pdfMake.vfs['OpenSans-Semibold.ttf'],
    'base64',
  );
  fonts.openSansLightItalic = Buffer.from(
    pdfFonts.pdfMake.vfs['OpenSans-LightItalic.ttf'],
    'base64',
  );

  pdfMakeReady = true;
}

function makePdfContent(doc) {
  const content = [];

  content.push(getFormattedMetaData(doc));

  content.push(getFormattedHeadLine(doc));

  content.push(getFormattedHeaderText(doc));

  content.push(getFormattedDocument(doc));

  return content;
}

function getFormattedMetaData(doc) {
  const nameAndAddress = `${doc.customer.name}\n${
    doc.customer.address ? doc.customer.address : ''
  }`;
  const date = `${moment.unix(doc.date).format('DD.MM.YYYY')}`;
  const invoiceOrOffer =
    doc.type === INVOICE ? 'RechnungsNr.: ' : 'AngebotsNr.: ';
  const id = `${doc.documentId}`;

  return makeMetaDataTable(nameAndAddress, date, invoiceOrOffer, id);
}

function makeMetaDataTable(nameAndAddress, date, invoiceOrOffer, id) {
  return {
    table: {
      headerRows: 0,
      widths: ['*', 80, 65],
      body: [
        [
          {
            text: nameAndAddress,
            rowSpan: 2,
          },
          {
            text: 'Datum: ',
          },
          {
            text: date,
            style: 'right',
          },
        ],
        [
          '',
          {
            text: invoiceOrOffer,
          },
          {
            text: id,
            style: 'right',
          },
        ],
      ],
    },
    margin: [-2, 30, -2, 55],
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    },
  };
}

function getFormattedHeadLine(doc) {
  return {
    text: doc.headline,
    style: 'header',
  };
}

function getFormattedHeaderText(doc) {
  const additionalHeightNeeded =
    20 +
    measureTextHeight(
      STYLES.headerText.font,
      STYLES.headerText.fontSize,
      doc.headerText,
      515,
    );

  compareHeight -= additionalHeightNeeded;

  return {
    text: doc.headerText,
    margin: [0, 0, 0, 20],
  };
}

function getFormattedDocument(doc) {
  let entries = [];
  let resultingTable = [];

  let groups = _.filter(doc.positions, (position) => position.type === GROUP);
  const containsGroup = groups.length > 0;
  const hierarchy = containsGroup ? 'GROUPS' : 'POSITIONS';
  let positions = [];

  if (containsGroup) {
    groups = [];

    for (let i = 0; i < doc.positions.length; i++) {
      if (doc.positions[i].type === GROUP) {
        if (groups.length > 0) {
          groups[groups.length - 1].positions = positions;
        }

        groups.push({
          pos: doc.positions[i].pos,
          name: doc.positions[i].title,
        });

        positions = [];
      } else {
        positions.push(doc.positions[i]);
      }
    }

    if (groups.length > 0) {
      groups[groups.length - 1].positions = positions;
    }
  } else {
    positions = [];

    for (let i = 0; i < doc.positions.length; i++) {
      positions.push(doc.positions[i]);
    }
  }

  const mappedDoc = {
    ...doc,
    positions: {
      hierarchy,
      positions,
      groups,
    },
  };

  if (mappedDoc.positions.hierarchy === 'POSITIONS') {
    if (!_.isEmpty(mappedDoc.positions.positions)) {
      entries = formatEntries(flatPositions(mappedDoc.positions.positions));
      resultingTable = getFormattedPositionResultingTable(mappedDoc);
    }
  } else if (!_.isEmpty(mappedDoc.positions.groups)) {
    entries = formatEntries(flatGroups(mappedDoc.positions.groups));
    resultingTable = getFormattedGroupsResultingTable(mappedDoc);
  }

  return [...entries, ...resultingTable];
}

function flatGroups(groups) {
  const filledGroups = groups.map((group) => {
    return [
      {
        type: GROUP,
        ...group,
        height: measureGroupHeight(group),
      },
      ...flatPositions(group.positions),
    ];
  });

  return _.flatten(filledGroups);
}

function flatPositions(positions) {
  const filledPositions = positions.map((position) => {
    return [
      {
        type: POSITION,
        ...position,
        height: measurePositionHeight(position),
      },
    ];
  });

  return _.flatten(filledPositions);
}

function measureGroupHeight(group) {
  if (!group) {
    return 0;
  }

  return (
    measureTextHeight(STYLES.group.font, STYLES.group.fontSize, group.name) +
    1.5 +
    1.5
  );
}

function measurePositionHeight(position) {
  if (!position) {
    return 0;
  }

  let height =
    measureTextHeight(
      STYLES.positionTitle.font,
      STYLES.positionTitle.fontSize,
      position.title,
    ) +
    1 +
    (position.text ? 0 : 1) +
    measureTextHeight(
      STYLES.positionText.font,
      STYLES.positionText.fontSize,
      position.text,
    ) +
    (position.text ? 1 : 0);

  _.forEach(position.alternatives, (alternative) => {
    height +=
      measureTextHeight(
        STYLES.positionTitle.font,
        STYLES.positionTitle.fontSize,
        alternative.title,
      ) +
      1 +
      (alternative.text ? 0 : 1) +
      measureTextHeight(
        STYLES.positionText.font,
        STYLES.positionText.fontSize,
        alternative.text,
      ) +
      (alternative.text ? 1 : 0);

    height +=
      measureTextHeight(
        STYLES.alternativeText.font,
        STYLES.alternativeText.fontSize,
        'Alternativ zur vorherstehenden Position',
      ) +
      3 +
      3;
  });

  return height;
}

function measureTextHeight(font, size, text, width = 213) {
  if (!text) {
    return 0;
  }

  const tFont = font || DEFAULT_STYLE.font;
  const tSize = size || DEFAULT_STYLE.fontSize;

  kit.font(fonts[tFont], tSize);

  const lineHeight = kit.currentLineHeight();
  const lines = text.split(/\r\n|\r|\n/);

  let counter = 0;

  for (let j = 0; j < lines.length; j += 1) {
    const height = kit.heightOfString(lines[j], { width });

    counter += height === 0 ? 1 : height / lineHeight;
  }

  return counter * lineHeight;
}

function formatEntries(entries) {
  let formattedEntries = insertMinHeightNeeded(entries);

  formattedEntries = insertPageBreaks(formattedEntries);

  formattedEntries = insertPageHeaders(formattedEntries);

  formattedEntries = formattedEntries.map((entry) => formatEntry(entry));

  // _.last(_.last(formattedEntries)).layout.hLineWidth = (i, node) => i === node.table.body.length ? 0.25 : 0;

  return formattedEntries;
}

function insertMinHeightNeeded(entries) {
  const formattedEntries = [];

  for (let i = 0; i < entries.length; i += 1) {
    switch (entries[i].type) {
      case GROUP:
        formattedEntries.push({
          ...entries[i],
          minHeightNeeded:
            entries[i].height +
            (entries[i].positions.length ? entries[i + 1].height : 0),
        });
        break;
      case POSITION:
        formattedEntries.push({
          ...entries[i],
          minHeightNeeded: entries[i].height,
        });
        break;
      default:
        formattedEntries.push({ ...entries[i] });
        break;
    }
  }

  return formattedEntries;
}

function insertPageBreaks(entries) {
  const formattedEntries = [];

  let firstOnPage = false;

  actualPagePosition = 0;

  // this is done somewhere else
  // compareHeight = FIRST_PAGE_MAX_HEIGHT;

  for (let i = 0; i < entries.length - 1; i += 1) {
    actualPagePosition += entries[i].height;

    if (actualPagePosition + entries[i + 1].minHeightNeeded > compareHeight) {
      actualPagePosition = 0;
      compareHeight = PAGE_MAX_HEIGHT;

      formattedEntries.push({
        ...entries[i],
        pageBreakAfter: true,
        firstOnPage,
      });
      firstOnPage = true;
    } else {
      formattedEntries.push({
        ...entries[i],
        pageBreakAfter: false,
        firstOnPage,
      });
      firstOnPage = false;
    }
  }

  actualPagePosition += _.last(entries).height;

  formattedEntries.push({
    ..._.last(entries),
    pageBreakAfter: false,
    firstOnPage,
  });

  return formattedEntries;
}

function insertPageHeaders(entries) {
  const formattedEntries = [];

  formattedEntries.push(generateTableHeader());

  _.forEach(entries, (entry) => {
    formattedEntries.push({ ...entry });

    if (entry.pageBreakAfter) {
      formattedEntries.push(generateTableHeader());
    }
  });

  return formattedEntries;
}

function formatEntry(entry) {
  switch (entry.type) {
    case GROUP:
      return formatGroup(entry);
    case POSITION:
      return formatPosition(entry);
    default:
      return { ...entry };
  }
}

function formatGroup(group) {
  let pageBreakAfter = [];
  if (group.pageBreakAfter) {
    pageBreakAfter = [
      {
        text: '',
        pageBreak: 'after',
      },
    ];
  }

  const groupHeader = {
    table: {
      widths: [30, 213, 40, 40, 75, 75],
      body: [
        [
          { text: group.pos, style: ['group', 'right'] },
          { text: group.name, style: 'group' },
          { text: '' },
          { text: '' },
          { text: '' },
          { text: '' },
        ],
      ],
    },
    layout: {
      hLineWidth: (i) => (i === 0 ? 0 : 0.5),
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingRight: (i) => (i === 2 ? 0.75 : 4),
      paddingLeft: (i) => (i === 3 ? 0.75 : 4),
      paddingTop: () => 1.5,
      paddingBottom: () => 1.5,
    },
  };

  return [groupHeader, ...pageBreakAfter];
}

function formatPosition(position) {
  let pageBreakAfter = [];
  if (position.pageBreakAfter) {
    pageBreakAfter = [
      {
        text: '',
        pageBreak: 'after',
      },
    ];
  }

  const positionRows = formatPositionRows(position);

  const alternativeRows = _.flatten(
    position.alternatives.map((alternative) =>
      formatAlternativeRows({ ...alternative, isAlternative: true }),
    ),
  );

  const elements = [...positionRows, ...alternativeRows];

  _.last(elements).layout.hLineWidth = (i, node) =>
    i === node.table.body.length ? 0.5 : 0;

  return [...elements, ...pageBreakAfter];
}

function formatPositionRows(position) {
  const positionTextRow = position.text
    ? [formatPositionTextRow(position.text)]
    : [];

  return [formatPositionTitleRow(position), ...positionTextRow];
}

function formatAlternativeRows(alternative) {
  // required, as documents have 'pos', but it is too much on the on the printed sheet
  alternative.pos = '';

  return [getPositionAlternativeTextRow(), ...formatPositionRows(alternative)];
}

function getPositionAlternativeTextRow() {
  return {
    table: {
      widths: [30, 213, 40, 40, 75, 75],
      body: [
        [
          { text: '' },
          {
            text: 'Alternativ zur vorherstehenden Position',
            style: 'alternativeText',
          },
          { text: '' },
          { text: '' },
          { text: '' },
          { text: '' },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingRight: (i) => (i === 2 ? 0.75 : 4),
      paddingLeft: (i) => (i === 3 ? 0.75 : 4),
      paddingTop: () => 3,
      paddingBottom: () => 2.5,
    },
  };
}

const unitToText = (unit) => {
  const unitMap = [
    { key: HOURS, text: 'Stunden' },
    { key: LITRES, text: 'Liter' },
    { key: METERS, text: 'Meter' },
    { key: PIECES, text: 'Stück' },
  ];

  return _.first(unitMap.filter((u) => u.key === unit)).text;
};

function formatPositionTitleRow(position) {
  return {
    table: {
      widths: [30, 213, 40, 40, 75, 75],
      body: [
        [
          { text: position.pos, style: 'right' },
          { text: position.title, style: 'positionTitle' },
          {
            text: Number(position.amount).toLocaleString('de-DE'),
            style: 'right',
          },
          { text: unitToText(position.unit), style: 'unit' },
          {
            text: Number(position.price).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }),
            style: 'right',
          },
          {
            text: position.isAlternative
              ? ''
              : Number(position.price * position.amount).toLocaleString(
                  'de-DE',
                  { style: 'currency', currency: 'EUR' },
                ),
            style: 'right',
          },
        ],
      ],
    },
    layout: {
      hLineWidth: (i) => /* i === 0 && !position.isAlternative ? 0 : */ 0,
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingRight: (i) => (i === 2 ? 3 : 4),
      paddingLeft: (i) => (i === 5 ? 1.75 : i === 3 ? 0.75 : 4),
      paddingTop: () => 1,
      paddingBottom: () => (position.text ? 0 : 1),
    },
  };
}

function formatPositionTextRow(positionText) {
  return {
    table: {
      widths: [30, 213, 40, 40, 75, 75],
      body: [
        [
          { text: '' },
          { text: positionText, style: 'positionText' },
          { text: '' },
          { text: '' },
          { text: '' },
          { text: '' },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingRight: (i) => (i === 2 ? 0.75 : 4),
      paddingLeft: (i) => (i === 3 ? 0.75 : 4),
      paddingTop: () => 0,
      paddingBottom: () => 1,
    },
  };
}

function getFormattedPositionResultingTable(doc) {
  const { positions } = doc.positions;

  let nettoTotal = 0;

  for (let i = 0; i < positions.length; i += 1) {
    nettoTotal += positions[i].price * positions[i].amount;
  }

  let additionalHeightNeeded =
    3 *
    (measureTextHeight(
      STYLES.positionTitle.font,
      STYLES.positionTitle.fontSize,
      'test',
    ) +
      2);
  additionalHeightNeeded +=
    20 +
    measureTextHeight(
      STYLES.footerText.font,
      STYLES.footerText.fontSize,
      doc.footerText,
      515,
    );

  let pageBreak = [];

  actualPagePosition += additionalHeightNeeded;

  if (actualPagePosition > compareHeight) {
    pageBreak = [
      {
        text: '',
        pageBreak: 'after',
      },
      generateTableHeader(),
    ];

    actualPagePosition = additionalHeightNeeded;
  }

  return [
    ...pageBreak,
    getFormattedSumTable(nettoTotal),
    getFormattedFooterText(doc),
  ];
}

function getFormattedFooterText(doc) {
  return {
    text: doc.footerText,
    margin: [0, 20, 0, 0],
  };
}

function getFormattedSumTable(nettoTotal) {
  const mwSt = nettoTotal * 0.2;
  const bruttoTotal = nettoTotal + mwSt;

  return {
    table: {
      headerRows: 0,
      widths: [315.5, 100, 75],
      body: [
        [
          {
            text: '',
          },
          {
            text: 'Nettobetrag',
            style: 'right',
          },
          {
            text: Number(nettoTotal).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }),
            style: 'right',
          },
        ],
        [
          {
            text: '',
          },
          {
            text: '20% MwSt.',
            style: 'right',
          },
          {
            text: Number(mwSt).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }),
            style: 'right',
          },
        ],
        [
          {
            text: '',
          },
          {
            text: 'Gesamtbetrag',
            style: 'right',
          },
          {
            text: Number(bruttoTotal).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }),
            style: 'right',
          },
        ],
      ],
    },
    layout: {
      hLineWidth: (i) => (i === 2 || i === 3 ? 0.5 : 0),
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingTop: () => 1,
      paddingBottom: () => 1,
    },
  };
}

function getFormattedGroupsResultingTable(doc) {
  const { groups } = doc.positions;

  let nettoTotal = 0;
  const resultingTable = [];

  let additionalHeightNeeded =
    3 *
    (measureTextHeight(
      STYLES.positionTitle.font,
      STYLES.positionTitle.fontSize,
      'test',
    ) +
      2);
  additionalHeightNeeded +=
    20 +
    measureTextHeight(
      STYLES.footerText.font,
      STYLES.footerText.fontSize,
      doc.footerText,
      515,
    );

  resultingTable.push(formatGroup({ pos: '', name: 'Zusammenfassung' }));
  additionalHeightNeeded +=
    measureTextHeight(
      STYLES.group.font,
      STYLES.group.fontSize,
      'Zusammenfassung',
    ) +
    1.5 +
    1.5 +
    0.5;

  _.forEach(groups, (group) => {
    let groupNetto = 0;

    for (let i = 0; i < group.positions.length; i += 1) {
      groupNetto += group.positions[i].price * group.positions[i].amount;
    }

    resultingTable.push(renderGroupResultingRow(group, groupNetto));

    additionalHeightNeeded +=
      measureTextHeight(
        STYLES.positionTitle.font,
        STYLES.positionTitle.fontSize,
        group.name,
      ) +
      2 +
      0.5;

    nettoTotal += groupNetto;
  });

  _.last(resultingTable).layout.hLineWidth = (i, node) =>
    i === node.table.body.length ? 0.5 : 0;

  actualPagePosition += additionalHeightNeeded;

  let pageBreak = [];
  if (actualPagePosition > compareHeight) {
    pageBreak = [
      {
        text: '',
        pageBreak: 'after',
      },
      generateTableHeader(),
    ];

    actualPagePosition = additionalHeightNeeded;
  }

  return [
    ...pageBreak,
    ...resultingTable,
    getFormattedSumTable(nettoTotal),
    getFormattedFooterText(doc),
  ];
}

function renderGroupResultingRow(group, netto) {
  return {
    table: {
      headerRows: 0,
      widths: [30, 213, 40, 40, 151.5],
      body: [
        [
          {
            text: '',
          },
          {
            text: group.name,
            style: 'positionTitle',
          },
          {
            text: '',
          },
          {
            text: '',
          },
          {
            text: Number(netto).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }),
            style: 'right',
          },
        ],
      ],
    },
    layout: {
      hLineWidth: (i, node) => (i === node.table.body.length ? 0.5 : 0),
      vLineWidth: (i, node) =>
        i === 0 || i === node.table.widths.length ? 0.5 : 0,
      hLineColor: () => '#AAAAAA',
      vLineColor: () => '#AAAAAA',
      paddingTop: () => 1,
      paddingBottom: () => 1,
    },
  };
}

function generateTableHeader() {
  return _.cloneDeep(TABLE_HEADER);
}
