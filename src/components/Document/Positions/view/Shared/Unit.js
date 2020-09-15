import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { ComboBox } from '@fluentui/react/lib/ComboBox';

import { unitTranslationObjects } from '../../../../../utils/unitUtils';

const Unit = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const unit = useSelector((state) => select(state, id).unit);

  const unitChanged = useCallback(
    (e, value) => {
      dispatch(update({ id, changes: { unit: value.key } }));
    },
    [dispatch],
  );

  return (
    <ComboBox
      options={unitTranslationObjects}
      selectedKey={unit}
      onChange={unitChanged}
      className={className}
      useComboBoxAsMenuWidth
    />
  );
};

Unit.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Unit.defaultProps = {
  className: '',
};

export default React.memo(Unit);
