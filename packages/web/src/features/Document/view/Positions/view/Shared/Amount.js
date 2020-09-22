import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getNumberErrorMessage } from '../../../../../../utils/numberUtils';

const Amount = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const amount = useSelector((state) => select(state, id).amount);

  const amountChanged = useCallback(
    (e, value) => {
      const changes = { id, changes: { amount: value } };
      dispatch(update(changes));
    },
    [dispatch],
  );

  return (
    <TextField
      onGetErrorMessage={getNumberErrorMessage}
      value={amount}
      className={className}
      onChange={amountChanged}
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
