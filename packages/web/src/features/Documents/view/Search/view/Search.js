import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ActionButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';

import classNames from 'classnames';

import SearchBarBody from './SearchForm';

import {
  toggleIsCollapsed,
  selectIsCollapsed,
} from '../../../redux/SearchBarData';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(selectIsCollapsed);

  const toggleCollapsedClicked = useCallback(
    () => dispatch(toggleIsCollapsed()),
    [dispatch],
  );

  return (
    <Stack>
      <ActionButton
        iconProps={{
          iconName: isCollapsed ? 'ChevronRight' : 'ChevronDown',
        }}
        onClick={toggleCollapsedClicked}
        className={classNames({
          [styles.paddingBottom30AndPaddingTop20]: isCollapsed,
        })}
      >
        Suche
      </ActionButton>
      {!isCollapsed && <SearchBarBody />}
    </Stack>
  );
};

export default React.memo(Search);
