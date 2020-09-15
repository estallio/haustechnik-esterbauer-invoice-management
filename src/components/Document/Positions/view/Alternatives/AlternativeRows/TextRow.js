import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  selectAlternativeById,
  updateAlternative,
} from '../../../redux/alternatives';

const TextRow = ({ alternativeId }) => {
  const dispatch = useDispatch();

  const text = useSelector(
    (state) => selectAlternativeById(state, alternativeId).text,
  );

  const textChanged = useCallback(
    (e, value) => {
      dispatch(
        updateAlternative({ id: alternativeId, changes: { text: value } }),
      );
    },
    [dispatch],
  );

  return <TextField value={text} onChange={textChanged} />;
};

TextRow.propTypes = {
  alternativeId: PropTypes.string.isRequired,
};

export default React.memo(TextRow);
