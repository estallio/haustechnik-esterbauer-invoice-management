import _ from 'lodash';

export const roundWithTwoDigits = (num) => {
  return +`${Math.round(`${num}e+2`)}e-2`;
};

export const currencyFormat = (num, withCurrencySign) => {
  return `${String(roundWithTwoDigits(num).toFixed(2))
    // replace decimal point character with colon character
    .replace('.', ',')
    // insert a point every 3 digits and add an € sign afterwards
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}${withCurrencySign ? ' €' : ''}`;
};

export const currencyToNumber = (num) => {
  return parseFloat(
    num
      // remove whitespaces
      .replace(/ /g, '')
      // remove € sign
      .replace(/€/g, '')
      // remove all points
      .replace(/\./g, '')
      // replace the comma with a real point
      .replace(',', '.'),
  );
};

export const isCurrency = (text) => {
  // e.g. 10.000.000 € or 10000€
  return /^-?\d{1,3}((?:\.\d{3})*|(?:\d)*)(?:,\d{1,2})?( ?€)?$/.test(
    `${text}`.trim(),
  );
};

export const isNumber = (text) => {
  return /^-?\d+((\.|,)\d+)?$/.test(`${text}`.trim());
};

export const textToNumber = (text) => {
  return parseFloat(
    `${text}`
      // remove whitespaces
      .replace(/ /g, '')
      // replace the comma with a real point
      .replace(',', '.'),
  );
};

export const numberToText = (number) => {
  return `${number}`.replace('.', ',');
};

export const isNumberOrEmpty = (value) => _.isEmpty(value) || isNumber(value);

export const getNumberErrorMessage = (value) =>
  isNumber(value) ? '' : 'Keine Zahl';

export const getNumberOrEmptyErrorMessage = (value) =>
  isNumberOrEmpty(value) ? '' : 'Keine Zahl';
