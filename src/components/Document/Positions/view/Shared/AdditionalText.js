import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

const AdditionalText = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const text = useSelector((state) => select(state, id).text);

  const textChanged = useCallback(
    (e, value) => {
      dispatch(update({ id, changes: { text: value } }));
    },
    [dispatch],
  );

  return (
    <TextField value={text} className={className} onChange={textChanged} />
  );
};

AdditionalText.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AdditionalText.defaultProps = {
  className: '',
};

export default React.memo(AdditionalText);
