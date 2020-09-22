import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@fluentui/react/lib/Stack';

import classNames from 'classnames';

import styles from './WhitePageContainer.module.scss';

const WhitePageContainer = ({
  rootClassName,
  whitePageContainerClassName,
  disableShadow,
  whiteBackground,
  children,
}) => {
  return (
    <Stack
      disableShrink
      className={classNames(
        styles.root,
        { [styles.white]: whiteBackground },
        rootClassName,
      )}
      horizontalAlign="center"
    >
      <Stack
        className={classNames(
          styles.whitePageContainer,
          { [styles.withoutShadow]: disableShadow },
          whitePageContainerClassName,
        )}
      >
        {children}
      </Stack>
    </Stack>
  );
};

WhitePageContainer.propTypes = {
  children: PropTypes.node,
  rootClassName: PropTypes.string,
  whitePageContainerClassName: PropTypes.string,
  disableShadow: PropTypes.bool,
  whiteBackground: PropTypes.bool,
};

WhitePageContainer.defaultProps = {
  children: null,
  rootClassName: '',
  whitePageContainerClassName: '',
  disableShadow: false,
  whiteBackground: false,
};

export default WhitePageContainer;
