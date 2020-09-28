import backgroundImage from './images/background';
import logoImage from './images/logo';
import * as Footer from './texts/Footer';

export const FIRST_PAGE_MAX_HEIGHT = 412 + 29.238; // 29.238 is headline-height
export const PAGE_MAX_HEIGHT = 572;

export const PAGE_MARGINS = [40, 110, 40, 100];

export const IMAGES = {
  backgroundImage,
  logoImage,
};

export const HEADER = {
  image: 'logoImage',
  width: 240,
  margin: [0, 25, 20, 0],
  alignment: 'right',
};

export const BACKGROUND = {
  image: 'backgroundImage',
  width: 400,
  margin: [0, 454, 0, 0],
};

export const FOOTER = {
  columns: [
    {
      text: Footer.FIRST_COLUMN,
      width: 170,
      margin: [50, 0, 0, 0],
      style: 'footerColumn',
    },
    {
      text: Footer.SECOND_COLUMN,
      width: '*',
      margin: [20, 0, 0, 0],
      style: 'footerColumn',
    },
    {
      text: Footer.THIRD_COLUMN,
      width: 230,
      margin: [25, 0, 50, 0],
      style: 'footerColumn',
    },
  ],
};

export const FONTS = {
  exoLight: {
    normal: 'Exo-Light.ttf',
    bold: 'Exo-Light.ttf',
    italics: 'Exo-Light.ttf',
    bolditalics: 'Exo-Light.ttf',
  },
  exoMedium: {
    normal: 'Exo-Medium.ttf',
    bold: 'Exo-Medium.ttf',
    italics: 'Exo-Medium.ttf',
    bolditalics: 'Exo-Medium.ttf',
  },
  exoItalic: {
    normal: 'Exo-Italic.ttf',
    bold: 'Exo-Italic.ttf',
    italics: 'Exo-Italic.ttf',
    bolditalics: 'Exo-Italic.ttf',
  },
  exoMediumItalic: {
    normal: 'Exo-MediumItalic.ttf',
    bold: 'Exo-MediumItalic.ttf',
    italics: 'Exo-MediumItalic.ttf',
    bolditalics: 'Exo-MediumItalic.ttf',
  },
  openSansLight: {
    normal: 'OpenSans-Light.ttf',
    bold: 'OpenSans-Light.ttf',
    italics: 'OpenSans-Light.ttf',
    bolditalics: 'OpenSans-Light.ttf',
  },
  openSansRegular: {
    normal: 'OpenSans-Regular.ttf',
    bold: 'OpenSans-Regular.ttf',
    italics: 'OpenSans-Regular.ttf',
    bolditalics: 'OpenSans-Regular.ttf',
  },
  openSansItalic: {
    normal: 'OpenSans-Italic.ttf',
    bold: 'OpenSans-Italic.ttf',
    italics: 'OpenSans-Italic.ttf',
    bolditalics: 'OpenSans-Italic.ttf',
  },
  openSansSemibold: {
    normal: 'OpenSans-Semibold.ttf',
    bold: 'OpenSans-Semibold.ttf',
    italics: 'OpenSans-Semibold.ttf',
    bolditalics: 'OpenSans-Semibold.ttf',
  },
  openSansLightItalic: {
    normal: 'OpenSans-LightItalic.ttf',
    bold: 'OpenSans-LightItalic.ttf',
    italics: 'OpenSans-LightItalic.ttf',
    bolditalics: 'OpenSans-LightItalic.ttf',
  },
};

export const DEFAULT_STYLE = {
  font: 'openSansRegular',
  fontSize: 12,
};

export const STYLES = {
  tableHeader: {
    font: 'exoMedium',
    fillColor: '#2E91AD',
    color: '#FFFFFF',
  },
  footerColumn: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    font: 'exoMedium',
    fontSize: 22,
    margin: [0, 10, 0, 10],
  },
  right: {
    alignment: 'right',
  },
  unit: {
    margin: [0, 0, -30, 0],
  },
  group: {
    color: '#2E91AD',
    font: 'openSansSemibold',
  },
  positionTitle: {},
  positionText: {
    fontSize: 10,
    font: 'openSansLight',
  },
  alternativeText: {
    font: 'openSansItalic',
  },
  footerText: {},
  headerText: {},
};

export const TABLE_HEADER = {
  table: {
    widths: [30, '*', 52, 75, 75],
    body: [
      [
        {
          text: 'Pos.',
          style: 'tableHeader',
        },
        {
          text: 'Bezeichnung',
          style: 'tableHeader',
        },
        {
          text: 'Menge',
          style: 'tableHeader',
        },
        {
          text: 'Einzelpreis',
          style: ['tableHeader', 'right'],
        },
        {
          text: 'Gesamt',
          style: ['tableHeader', 'right'],
        },
      ],
    ],
  },
  layout: {
    hLineWidth: () => 0,
    vLineWidth: () => -0.15,
    vLineColor: () => '#2E91AD',
  },
};
