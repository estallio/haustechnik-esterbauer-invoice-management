import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import WhitePageContainer from '../Shared/WhitePageContainer/WhitePageContainer';

const NoPageFound = ({ navigateTo, currentAddress }) => {
  return (
    <WhitePageContainer>
      <Stack.Item align="stretch">
        <Text variant="large" block>
          Du solltest nicht auf dieser Seite sein. Wurdest du automatisch
          hierher weitergeleitet melde bitte den folgenden Pfad an die
          EntwicklerInnen der Applikation und beschreib durch welche Aktionen du
          auf diese Seite geleitet wurdest.
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
    </WhitePageContainer>
  );
};

NoPageFound.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  currentAddress: PropTypes.string.isRequired,
};

export default NoPageFound;
