import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

import {
  currencyFormat,
  textToNumber,
} from '../../../../../../utils/numberUtils';

const Sum = ({ id, select, className }) => {
  const price = useSelector((state) => select(state, id).price);

  const amount = useSelector((state) => select(state, id).amount);

  return (
    <TextField
      value={currencyFormat(
        textToNumber(price || 0) * textToNumber(amount || 0),
        false,
      )}
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
