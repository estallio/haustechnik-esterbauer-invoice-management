import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { IconButton } from '@fluentui/react/lib/Button';

const Delete = ({ id, remove, className }) => {
  const dispatch = useDispatch();

  const removeClicked = useCallback(
    (e) => {
      const keyboardfocusableElements = [
        ...document.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute('disabled'));

      const index = keyboardfocusableElements.indexOf(e.currentTarget);

      keyboardfocusableElements[index + 2].focus();

      dispatch(remove(id));
    },
    [dispatch],
  );

  return (
    <IconButton
      iconProps={{ iconName: 'Delete' }}
      title="Löschen"
      onClick={removeClicked}
      className={className}
    />
  );
};

Delete.propTypes = {
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Delete.defaultProps = {
  className: '',
};

export default React.memo(Delete);
