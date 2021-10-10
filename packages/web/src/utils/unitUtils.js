import {
  HOURS,
  LITRES,
  METERS,
  PIECES,
  UNIT,
  TOTAL,
  FLAT_RATE,
  SET,
} from '../database/constants';

export const unitTranslationObjects = [
  { key: HOURS, text: 'Stunden', singleUnitText: 'Stunde' },
  { key: LITRES, text: 'Liter' },
  { key: METERS, text: 'Meter' },
  { key: PIECES, text: 'Stück' },
  { key: UNIT, text: 'Einheiten', singleUnitText: 'Einheit' },
  { key: TOTAL, text: 'Gesamt' },
  { key: FLAT_RATE, text: 'Pauschal' },
  { key: SET, text: 'Sets', singleUnitText: 'Set' },
];
