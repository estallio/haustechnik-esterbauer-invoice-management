import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import { currencyFormat } from '../../../../../utils/numberUtils';

const Sum = ({ id, select, className }) => {
  const price = useSelector((state) => select(state, id).price);

  const amount = useSelector((state) => select(state, id).amount);

  return (
    <TextField
      value={currencyFormat(amount * price, false)}
      suffix="€"
      className={className}
      readOnly
    />
  );
};

Sum.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Sum.defaultProps = {
  className: '',
};

export default React.memo(Sum);
