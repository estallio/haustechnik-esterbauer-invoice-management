import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@fluentui/react/lib/TextField';

const Title = ({ id, select, update, className }) => {
  const dispatch = useDispatch();

  const title = useSelector((state) => select(state, id).title);

  const titleChanged = useCallback(
    (e, value) => {
      dispatch(update({ id, changes: { title: value } }));
    },
    [dispatch],
  );

  return (
    <TextField value={title} className={className} onChange={titleChanged} />
  );
};

Title.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Title.defaultProps = {
  className: '',
};

export default React.memo(Title);
