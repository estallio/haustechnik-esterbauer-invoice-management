import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { ActionButton } from '@fluentui/react/lib/Button';

import { addAlternative } from '../../../../../redux/Alternatives';

import { PIECES } from '../../../../../../../database/constants';

const AddAlternative = ({ positionId }) => {
  const dispatch = useDispatch();

  const addAlternativeClicked = useCallback(() => {
    dispatch(
      addAlternative(positionId, {
        title: '',
        text: '',
        price: 0,
        amount: 0,
        unit: PIECES,
      }),
    );
  }, [dispatch]);

  return (
    <ActionButton
      iconProps={{ iconName: 'Add' }}
      onClick={addAlternativeClicked}
    >
      Alternative hinzufügen
    </ActionButton>
  );
};

AddAlternative.propTypes = {
  positionId: PropTypes.string.isRequired,
};

export default React.memo(AddAlternative);
