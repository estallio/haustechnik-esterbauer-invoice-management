import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { getNumberErrorMessage } from '../../../../../../utils/numberUtils';

const Price = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const price = useSelector((state) => select(state, id).price);

  const priceChanged = useCallback(
    (e, value) => {
      dispatch(update({ id, changes: { price: value } }));
    },
    [dispatch],
  );

  return (
    <TextField
      onGetErrorMessage={getNumberErrorMessage}
      className={className}
      value={price}
      onChange={priceChanged}
      suffix="€"
    />
  );
};

Price.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Price.defaultProps = {
  className: '',
};

export default React.memo(Price);
