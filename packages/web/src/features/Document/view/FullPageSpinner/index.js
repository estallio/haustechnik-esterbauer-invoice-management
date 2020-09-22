import React from 'react';

import {
  Spinner as FabricSpinner,
  SpinnerSize,
} from '@fluentui/react/lib/Spinner';

import styles from './styles.module.scss';

const FullPageSpinner = () => {
  return (
    <div className={styles.wrapper}>
      <FabricSpinner size={SpinnerSize.large} />
    </div>
  );
};

export default FullPageSpinner;
