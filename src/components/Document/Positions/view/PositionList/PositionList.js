import React from 'react';

import { useSelector } from 'react-redux';

import { selectPositionIds } from '../../redux/positions';

import PositionListItem from '../PositionListItem';

const PositionList = () => {
  const positionIds = useSelector(selectPositionIds);

  return (
    <>
      {positionIds.map((positionId, index) => (
        <PositionListItem
          key={`positionListItem-${positionId}`}
          positionId={positionId}
          index={index}
        />
      ))}
    </>
  );
};

export default React.memo(PositionList);
