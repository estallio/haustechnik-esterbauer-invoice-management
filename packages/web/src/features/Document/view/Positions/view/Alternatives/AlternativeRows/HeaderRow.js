import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Text } from '@fluentui/react/lib/Text';

import { selectAlternativeById } from '../../../../../redux/Alternatives';

const HeaderRow = ({ alternativeId }) => {
  const pos = useSelector(
    (state) => selectAlternativeById(state, alternativeId).pos,
  );

  return <Text variant="medium">Alternative {pos}</Text>;
};

HeaderRow.propTypes = {
  alternativeId: PropTypes.string.isRequired,
};

export default React.memo(HeaderRow);
