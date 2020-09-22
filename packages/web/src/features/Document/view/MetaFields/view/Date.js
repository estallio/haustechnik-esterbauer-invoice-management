import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DatePicker, DayOfWeek } from '@fluentui/react/lib/DatePicker';

import {
  DayPickerStrings,
  formatDate,
  parseDateFromString,
} from '../../../../../utils/timeUtils';

import { getDocumentTypeName } from '../../../../../utils/documentUtils';

import {
  selectDocumentData,
  setDocumentDataByKey,
} from '../../../redux/DocumentData';

const Date = () => {
  const dispatch = useDispatch();

  const date = useSelector((state) => selectDocumentData(state).date || '');

  const dateChanged = useCallback(
    (v) => dispatch(setDocumentDataByKey('date', v ? formatDate(v) : '')),
    [dispatch],
  );

  const documentType = useSelector((state) => selectDocumentData(state).type);

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
