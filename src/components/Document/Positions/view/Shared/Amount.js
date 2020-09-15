import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

const Amount = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const amount = useSelector((state) => select(state, id).amount);

  const amountChanged = useCallback(
    (e, value) => {
      dispatch(update({ id, changes: { amount: value } }));
    },
    [dispatch],
  );

  return (
    <TextField
      value={amount}
      className={className}
      onChange={amountChanged}
      type="number"
    />
  );
};

Amount.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Amount.defaultProps = {
  className: '',
};

export default React.memo(Amount);
