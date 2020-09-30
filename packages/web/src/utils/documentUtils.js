import _ from 'lodash';

import { GROUP, OFFER, UNITS } from '../database/constants';

import { formatDateUnix, parseUnixFromString } from './timeUtils';
import { textToNumber } from './numberUtils';

export const getDocumentTypeName = (documentType) => {
  return documentType === OFFER ? 'Angebot' : 'Rechnung';
};

export const normalizeDocument = (document) => {
  const alternatives = [];
  const positions = [];

  _.forEach(document.positions, (position) => {
    const tempAlternatives = _.map(position.alternatives, (alternative) => ({
      ...alternative,
      positionId: position.id,
    }));

    positions.push({
      ...position,
      alternatives: _.map(
        tempAlternatives,
        (tempAlternative) => tempAlternative.id,
      ),
    });

    alternatives.push(...tempAlternatives);
  });

  alternatives.sort((alternative1, alternative2) => {
    if (alternative1.positionId === alternative2.positionId) {
      return alternative1.pos - alternative2.pos;
    }

    return alternative1.positionId - alternative2.positionId;
  });

  return {
    id: document.id,
    name: document.customer.name,
    address: document.customer.address,
    subject: document.subject,
    type: document.type,
    date: formatDateUnix(document.date),
    documentId: document.documentId,
    headline: document.headline,
    headerText: document.headerText,
    positions,
    alternatives,
    footerText: document.footerText,
    amount: document.amount,
  };
};

export const denormalizeDocument = ({
  id,
  name,
  address,
  subject,
  date,
  type,
  documentId,
  headline,
  headerText,
  positions,
  alternatives,
  footerText,
}) => {
  const wrappedPositions = _.map(positions, (position) => {
    // GROUPs don't have extra/normalized properties
    if (position.type === GROUP) {
      return position;
    }

    const positionAlternatives = _.filter(
      alternatives,
      (alternative) => alternative.positionId === position.id,
    );

    const positionAlternativesWithoutAdditionalProps = _.map(
      positionAlternatives,
      (positionAlternative) => {
        return {
          ..._.omit(positionAlternative, ['positionId']),
          amount: textToNumber(positionAlternative.amount),
          price: textToNumber(positionAlternative.price),
        };
      },
    );

    return {
      ...position,
      amount: textToNumber(position.amount),
      price: textToNumber(position.price),
      alternatives: positionAlternativesWithoutAdditionalProps,
    };
  });

  return {
    id,
    customer: {
      name,
      address,
    },
    subject,
    type,
    date: parseUnixFromString(date),
    documentId,
    headline,
    headerText,
    positions: wrappedPositions,
    footerText,
  };
};

export const checkFirstPositionIdGroup = (positions) => {
  const errors = [];

  if (_.isUndefined(positions)) {
    errors.push('Positionen sind nicht definiert.');
  }
  const hasGroup =
    _.filter(positions, (position) => position.type === GROUP).length !== 0;

  if (hasGroup && positions[0].type !== GROUP) {
    errors.push('Erste Position muss eine Gruppe sein.');
  }

  return { isDocumentValid: errors.length === 0, errors };
};

export const checkIsDocumentValid = (document) => {
  const errors = [];

  const { positions, alternatives } = document;

  if (_.isUndefined(positions)) {
    errors.push('Positionen sind nicht definiert.');
  }
  const hasGroup =
    _.filter(positions, (position) => position.type === GROUP).length !== 0;

  if (hasGroup && positions[0].type !== GROUP) {
    errors.push('Erste Position muss eine Gruppe sein.');
  }

  if (_.isUndefined(alternatives)) {
    errors.push('Alternativen sind nicht definiert.');
  }

  _.forEach(positions, (position) => {
    if (_.isEmpty(position.title)) {
      errors.push(`Position ${position.pos}: Titel darf nicht leer sein.`);
    }

    if (position.type !== GROUP) {
      if (UNITS.indexOf(position.unit) === -1) {
        errors.push(`Position ${position.pos}: Einheit darf nicht leer sein.`);
      }

      const positionAlternatives = _.filter(
        alternatives,
        (alternative) => alternative.positionId === position.id,
      );

      _.forEach(positionAlternatives, (alternative) => {
        if (_.isEmpty(alternative.title)) {
          errors.push(
            `Position ${position.pos}, Alternative ${alternative.pos}: Titel darf nicht leer sein.`,
          );
        }

        if (UNITS.indexOf(position.unit) === -1) {
          errors.push(
            `Position ${position.pos}, Alternative ${alternative.pos}: Einheit darf nicht leer sein.`,
          );
        }
      });
    }
  });

  return { isDocumentValid: errors.length === 0, errors };
};

export const areDocumentsEqual = (doc1, doc2) => {
  return _.isEqual(doc1, doc2);
};
