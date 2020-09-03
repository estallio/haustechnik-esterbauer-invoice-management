import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import NoPageFound from '../../../components/NoPageFound';

const NoPageFoundPage = ({ history, location }) => (
  <div>
    <NoPageFound
      currentAddress={location.pathname + location.search}
      navigateTo={history.push}
    />
  </div>
);

NoPageFoundPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(NoPageFoundPage);
