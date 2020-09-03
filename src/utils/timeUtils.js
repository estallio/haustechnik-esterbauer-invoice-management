import moment from 'moment';

export const DayPickerStrings = {
  months: [
    'Jänner',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'März',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ],

  days: [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ],

  shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],

  goToToday: 'Heute',
  prevMonthAriaLabel: 'Vorheriges Monat',
  nextMonthAriaLabel: 'Nächstes Monat',
  prevYearAriaLabel: 'Vorheriges Jahr',
  nextYearAriaLabel: 'Nächstes Jahr',
  closeButtonAriaLabel: 'Schließen',
};

export const formatDate = (date) => {
  return moment(date).format('DD.MM.YYYY');
};

export const parseDateFromString = (value) => {
  return moment(value, 'L').toDate();
};
