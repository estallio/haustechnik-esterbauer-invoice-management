import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect, useSelector } from 'react-redux';

import _ from 'lodash';
import { nanoid } from 'nanoid';

import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { Stack } from '@fluentui/react/lib/Stack';
import { IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { SelectionMode, Selection } from '@fluentui/react/lib/Selection';

import { currencyFormat } from '../../../../utils/numberUtils';

import {
  openDocument as openDocumentAction,
  printDocument as printDocumentAction,
} from '../../../../actions';

import { selectSelectedId } from '../../redux/ListData';

import styles from './styles.module.scss';

const colWidth = 168;
const columns = [
  {
    key: 'documentId',
    name: 'Nummer',
    fieldName: 'documentId',
    minWidth: colWidth - 40,
    maxWidth: colWidth - 40,
    isResizable: false,
  },
  {
    key: 'subject',
    name: 'Betreff',
    fieldName: 'subject',
    minWidth: colWidth + 30,
    maxWidth: colWidth + 30,
    isResizable: false,
  },
  {
    key: 'customerName',
    name: 'Kunde',
    fieldName: 'customerName',
    minWidth: colWidth + 30,
    maxWidth: colWidth + 30,
    isResizable: false,
  },
  {
    key: 'date',
    name: 'Datum',
    fieldName: 'date',
    minWidth: colWidth - 30,
    maxWidth: colWidth - 30,
    isResizable: false,
  },
  {
    key: 'amount',
    name: 'Netto',
    fieldName: 'amount',
    minWidth: colWidth - 80,
    maxWidth: colWidth - 80,
    isResizable: false,
  },
];

const wrapInHeight100PercentStack = (items) => {
  return (
    <Stack
      horizontal
      className={styles.height100Percent}
      verticalAlign="center"
    >
      {items}
    </Stack>
  );
};

const renderItemColumn = (item, index, column, openDocument, printDocument) => {
  const { key, fieldName } = column;

  switch (key) {
    case 'customerName':
      return wrapInHeight100PercentStack(
        <Text className={styles.width175}>{String(_.get(item, 'name'))}</Text>,
      );
    case 'date':
      return wrapInHeight100PercentStack(
        <Text className={styles.width175}>{_.get(item, 'date')}</Text>,
      );
    case 'amount':
      return (
        <Stack
          horizontal
          verticalAlign="center"
          className={styles.height100Percent}
          disableShrink
          horizontalAlign="end"
        >
          <Stack.Item>
            <Text className={styles.paddingRight40}>
              {String(currencyFormat(_.get(item, 'amount')))}
            </Text>
          </Stack.Item>

          <Stack.Item>
            <IconButton
              title="Öffnen"
              menuIconProps={{ iconName: 'Edit' }}
              className={styles.fontSize16}
              onClick={() => openDocument()}
            />
            <IconButton
              title="Drucken"
              menuIconProps={{ iconName: 'Print' }}
              className={styles.fontSize16}
              onClick={() => printDocument(true)}
            />
          </Stack.Item>
        </Stack>
      );
    default:
      return wrapInHeight100PercentStack(
        <Text className={styles.width175}>
          {String(_.get(item, fieldName))}
        </Text>,
      );
  }
};

// TODO: transform this to class and prevent renderItemRow from being an arrow function which forces a rerender every time
//  better approach: fixed items and fixed render-method etc. so the list is not re-rendered each time
// TODO: somehow there exists a selection bug after the list-view was open for a few minutes
// TODO: double click on text-element should not bubble up double click and open, so one can mark e.g. a name or number and the listview with a double click
const DocumentsList = ({
  key,
  isLoading,
  items,
  showContextMenu,
  selectedDocumentChanged,
  openDocument,
  printDocument,
}) => {
  const selectedDocumentId = useSelector(selectSelectedId);

  const [selection] = useState(
    new Selection({
      getKey: (item) => (!item ? null : `${key}${item.id}`),
      onSelectionChanged: () => {
        const currentSelectedItems = selection.getSelection();
        let selectedItem = null;

        if (!_.isEmpty(currentSelectedItems)) {
          selectedItem = _.first(currentSelectedItems);
        }

        // this action is called 3 times when selection is changed
        // by an external action - see useEffect below
        // call-order of onSelectionChanged: first actual selection,
        // the second setAllSelected-call and the third setKeySelected call
        selectedDocumentChanged(selectedItem);
      },
    }),
    [selectedDocumentChanged],
  );

  useEffect(() => {
    // if selectedDocumentId is already selected -> do nothing
    if (
      selectedDocumentId &&
      selection.isKeySelected(`${key}${selectedDocumentId}`)
    ) {
      return;
    }

    // if any other document or none should be selected -> clear all
    if (selection.getSelectedCount() > 0) {
      selection.setAllSelected(false);
    }

    // select document if present
    if (selectedDocumentId) {
      selection.setKeySelected(`${key}${selectedDocumentId}`, true);
    }
  }, [selectedDocumentId]);

  return (
    <Stack className={styles.paddingLeftAndRight10}>
      <ShimmeredDetailsList
        // TODO: maybe better keyhandling possible
        setKey={key}
        getKey={(item) => (!item ? null : `${key}${item.id}`)}
        enableShimmer={isLoading}
        items={items}
        columns={columns}
        // TODO: don't use openDocument that way, pass an id and dont'rely on selectedDocumentId
        //  rather use selectedDocumentId only for deciding the CommandBar - symbols
        onItemInvoked={() => openDocument()}
        // TODO: maybe this anonymous function can be replaced
        onRenderItemColumn={(item, index, column) =>
          renderItemColumn(item, index, column, openDocument, printDocument)
        }
        selectionMode={SelectionMode.single}
        selection={selection}
        checkboxVisibility={CheckboxVisibility.hidden}
        onItemContextMenu={showContextMenu}
        // TODO: List Virtualization is causing issues with scrolling in the List View and causes some weired rendering issues resulting in not rendering items
        // A temporary solution is to set onShouldVirtualize to false - if there are performance issues rendering all the rows, maybe a virtualized List View with a fixed height is another solution to this problem
        // --> currently, the outer wrapper is assigned with fixed dimensions and overflow: auto and it solved the issue for now
        // related issues:
        // https://github.com/microsoft/fluentui/issues/10267
        // https://github.com/microsoft/fluentui/issues/4204
        // onShouldVirtualize={() => false}
      />
    </Stack>
  );
};

DocumentsList.propTypes = {
  key: PropTypes.string,
  isLoading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  showContextMenu: PropTypes.func.isRequired,
  openDocument: PropTypes.func.isRequired,
  printDocument: PropTypes.func.isRequired,
  selectedDocumentChanged: PropTypes.func.isRequired,
};

DocumentsList.defaultProps = {
  key: nanoid(),
  isLoading: false,
};

const mapDispatchToProps = {
  openDocument: openDocumentAction,
  printDocument: printDocumentAction,
};

export default connect(null, mapDispatchToProps)(DocumentsList);
