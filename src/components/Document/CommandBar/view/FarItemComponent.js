import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Stack } from '@fluentui/react/lib/Stack';

import { Icon } from '@fluentui/react/lib/Icon';
import { Text } from '@fluentui/react/lib/Text';

import styles from './FarItemComponent.module.scss';

const FarItemComponent = ({ text, iconName, isError }) => {
  return (
    <Stack
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
      className={styles.componentStyles}
    >
      <Icon
        className={classNames(
          styles.icon,
          isError ? styles.commandBarStatusError : styles.commandBarStatusValid,
        )}
        iconName={iconName}
      />
      <Text
        className={classNames(
          styles.text,
          isError ? styles.commandBarStatusError : styles.commandBarStatusValid,
        )}
      >
        {text}
      </Text>
    </Stack>
  );
};

FarItemComponent.propTypes = {
  text: PropTypes.string,
  iconName: PropTypes.string,
  isError: PropTypes.bool,
};

FarItemComponent.defaultProps = {
  text: '',
  iconName: null,
  isError: false,
};

export default FarItemComponent;
