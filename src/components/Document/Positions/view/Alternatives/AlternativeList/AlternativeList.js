import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectAlternativeIdsByPositionId } from '../../../redux/alternatives';

import AlternativeListItem from '../AlternativeListItem';

const AlternativeList = ({ positionId }) => {
  const alternativeIds = useSelector((state) =>
    selectAlternativeIdsByPositionId(state, positionId),
  );

  return (
    <>
      {alternativeIds.map((alternativeId) => (
        <AlternativeListItem
          key={`alternativeListItem-${alternativeId}`}
          alternativeId={alternativeId}
        />
      ))}
    </>
  );
};

AlternativeList.propTypes = {
  positionId: PropTypes.string.isRequired,
};

export default React.memo(AlternativeList);
