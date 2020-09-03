import React from 'react';
import PropTypes from 'prop-types';

import { Stack, PrimaryButton, Text } from '@fluentui/react';

import styles from './NoPageFound.module.scss';

const verticalGapStackTokens = {
  childrenGap: 50,
  padding: 50,
};

const NoPageFound = ({ navigateTo, currentAddress }) => {
  return (
    <Stack disableShrink className={styles.root} horizontalAlign="center">
      <Stack
        className={styles.whitePageContainer}
        tokens={verticalGapStackTokens}
      >
        <Stack.Item align="stretch">
          <Text variant="large" block>
            Du solltest nicht auf dieser Seite sein. Wurdest du automatisch
            hierher weitergeleitet melde bitte den folgenden Pfad an die
            EntwicklerInnen der Applikation und beschreib durch welche Aktionen
            du auf diese Seite geleitet wurdest.
          </Text>
          <br />
          <Text variant="xLarge">Adresse: {currentAddress}</Text>
        </Stack.Item>
        <Stack.Item align="end">
          <PrimaryButton
            text="Zur Startseite"
            onClick={() => {
              navigateTo('/');
            }}
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

NoPageFound.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  currentAddress: PropTypes.string.isRequired,
};

export default NoPageFound;
