import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DatePicker, DayOfWeek } from '@fluentui/react/lib/DatePicker';

import { selectDate, setDate } from '../redux/date';

import { selectDocumentType } from '../../DocumentType/redux/documentType';

import {
  DayPickerStrings,
  formatDate,
  parseDateFromString,
} from '../../../../utils/timeUtils';
import { getDocumentTypeName } from '../../../../utils/documentUtils';

const Date = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const dateChanged = useCallback(
    (value) => dispatch(setDate(value ? formatDate(value) : '')),
    [dispatch],
  );

  const documentType = useSelector(selectDocumentType);

  return (
    <DatePicker
      firstDayOfWeek={DayOfWeek.Monday}
      strings={DayPickerStrings}
      showWeekNumbers
      firstWeekOfYear={1}
      showMonthPickerAsOverlay
      placeholder="Auswählen..."
      ariaLabel="Auswählen"
      // outputs a string, so reference === is not causing rerender
      label={`${getDocumentTypeName(documentType)}sdatum`}
      allowTextInput
      formatDate={formatDate}
      parseDateFromString={parseDateFromString}
      value={date ? parseDateFromString(date) : ''}
      onSelectDate={dateChanged}
    />
  );
};

export default Date;
