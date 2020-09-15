import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ActionButton } from '@fluentui/react/lib/Button';

import { addPosition } from '../../../redux/positions';

import { GROUP } from '../../../../../../database/constants';

const AddGroupButton = () => {
  const dispatch = useDispatch();

  const addGroupClicked = useCallback(() => {
    dispatch(
      addPosition({
        title: '',
        type: GROUP,
      }),
    );
  }, [dispatch]);

  return (
    <ActionButton iconProps={{ iconName: 'Add' }} onClick={addGroupClicked}>
      Weitere Gruppe
    </ActionButton>
  );
};

export default React.memo(AddGroupButton);
