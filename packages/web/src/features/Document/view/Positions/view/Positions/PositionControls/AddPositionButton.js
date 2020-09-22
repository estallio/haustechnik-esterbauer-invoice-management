import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ActionButton } from '@fluentui/react/lib/Button';

import { addPosition } from '../../../../../redux/Positions';

import { PIECES, POSITION } from '../../../../../../../database/constants';

const AddPositionButton = () => {
  const dispatch = useDispatch();

  const addPositionClicked = useCallback(() => {
    dispatch(
      addPosition({
        title: '',
        text: '',
        price: 0,
        amount: 0,
        unit: PIECES,
        type: POSITION,
      }),
    );
  }, [dispatch]);

  return (
    <ActionButton iconProps={{ iconName: 'Add' }} onClick={addPositionClicked}>
      Weitere Position
    </ActionButton>
  );
};

export default React.memo(AddPositionButton);
