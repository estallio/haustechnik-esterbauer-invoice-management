import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';

import classNames from 'classnames';

import styles from './Pos.module.scss';

const Pos = ({ id, select, iconClassName, textClassName }) => {
  const pos = useSelector((state) => select(state, id).pos);

  return (
    <>
      <Icon
        className={classNames(
          styles.iconContainer,
          'icon-visible-hover',
          iconClassName,
        )}
        iconName="DragObject"
      />
      <Text className={classNames('text-hidden-hover', textClassName)} block>
        {pos}
      </Text>
    </>
  );
};

Pos.propTypes = {
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
};

Pos.defaultProps = {
  iconClassName: '',
  textClassName: '',
};

export default React.memo(Pos);
